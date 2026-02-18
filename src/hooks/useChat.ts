import { useState, useCallback, useRef } from 'react'
import type { ChatMessage, ToolCall, AdkEvent, SourceItem } from '@/lib/adk'
import { ADK_BASE_URL } from '@/lib/adk'

interface UseChatOptions {
  sessionId: string
  appName?: string
  userId?: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  isStreaming: boolean
  error: string | null
  draftResponse: string
  sources: SourceItem[]
  sendMessage: (text: string) => void
  resumeRun: (invocationId: string) => void
}

/**
 * React hook for managing chat state and SSE streaming with ADK.
 *
 * Connects directly to ADK's /run_sse endpoint from the browser.
 * In development, ADK runs at localhost:8000.
 */
export function useChat({
  sessionId,
  appName = 'agent',
  userId = 'anonymous',
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draftResponse, setDraftResponse] = useState('')
  const [sources, setSources] = useState<SourceItem[]>([])
  const abortRef = useRef<AbortController | null>(null)
  const messageIdCounter = useRef(0)

  const genId = () => `msg-${++messageIdCounter.current}-${Date.now()}`

  /**
   * Process a single ADK SSE event and route it to the appropriate UI state.
   */
  const processEvent = useCallback(
    (event: AdkEvent) => {
      // Skip events without content
      if (!event.content?.parts) return

      const text = event.content.parts
        .map((p) => p.text ?? '')
        .filter(Boolean)
        .join('')

      const toolCalls: ToolCall[] = event.content.parts
        .filter((p) => p.functionCall)
        .map((p) => ({
          name: p.functionCall!.name,
          args: p.functionCall!.args,
        }))

      // Route writer agent partial text to the draft response editor
      if (event.author === 'writer' && text && event.partial) {
        setDraftResponse((prev) => prev + text)
        return
      }

      // If it's a user message (replay from history), add it
      if (event.content.role === 'user' && text) {
        setMessages((prev) => {
          // Avoid duplicates
          const exists = prev.some(
            (m) => m.role === 'user' && m.text === text,
          )
          if (exists) return prev
          return [
            ...prev,
            { id: genId(), role: 'user', text, timestamp: new Date() },
          ]
        })
        return
      }

      // Handle tool call events (function_call)
      if (toolCalls.length > 0) {
        setMessages((prev) => {
          // Find the last agent message and append tool calls
          const last = prev[prev.length - 1]
          if (last && last.role === 'agent' && last.isStreaming) {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                toolCalls: [...(last.toolCalls ?? []), ...toolCalls],
              },
            ]
          }
          // Or create a new agent message with tool calls
          return [
            ...prev,
            {
              id: genId(),
              role: 'agent',
              author: event.author ?? 'writer',
              text: '',
              toolCalls,
              isStreaming: true,
              timestamp: new Date(),
            },
          ]
        })
        return
      }

      // Handle agent text content
      if (text && event.content.role === 'model') {
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          // Append to existing streaming message from same author
          if (
            last &&
            last.role === 'agent' &&
            last.isStreaming &&
            (last.author ?? 'writer') === (event.author ?? 'writer')
          ) {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                text: event.partial ? last.text + text : last.text + text,
                isStreaming: event.partial !== false,
              },
            ]
          }
          // New agent message
          return [
            ...prev,
            {
              id: genId(),
              role: 'agent',
              author: event.author ?? 'writer',
              text,
              isStreaming: event.partial !== false,
              timestamp: new Date(),
            },
          ]
        })
      }

      // Extract sources from grounding metadata
      if (event.grounding_metadata?.grounding_chunks) {
        const newSources: SourceItem[] =
          event.grounding_metadata.grounding_chunks
            .filter((c) => c.web?.uri)
            .map((c) => {
              const url = c.web!.uri!
              let domain = ''
              try {
                domain = new URL(url).hostname
              } catch {
                domain = url
              }
              return {
                url,
                title: c.web!.title ?? 'Unknown Source',
                domain,
                snippet: '',
                adopted: false,
              }
            })

        if (newSources.length > 0) {
          setSources((prev) => {
            const existingUrls = new Set(prev.map((s) => s.url))
            const unique = newSources.filter(
              (s) => !existingUrls.has(s.url),
            )
            return [...prev, ...unique]
          })
        }
      }
    },
    [],
  )

  /**
   * Start an SSE stream to ADK's /run_sse endpoint.
   */
  const startStream = useCallback(
    async (payload: {
      new_message?: { role: string; parts: Array<{ text: string }> }
      invocation_id?: string
    }) => {
      // Abort any existing stream
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setIsStreaming(true)
      setError(null)

      // Add a placeholder streaming agent message
      const streamingMsgId = genId()
      setMessages((prev) => [
        ...prev,
        {
          id: streamingMsgId,
          role: 'agent' as const,
          author: 'writer',
          text: '',
          isStreaming: true,
          timestamp: new Date(),
        },
      ])

      try {
        const body = {
          app_name: appName,
          user_id: userId,
          session_id: sessionId,
          streaming: true,
          ...payload,
        }

        const response = await fetch(`${ADK_BASE_URL}/run_sse`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`ADK returned ${response.status}: ${response.statusText}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error('No response body')

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // Split by double newline (SSE event separator)
          const parts = buffer.split('\n\n')
          buffer = parts.pop() ?? ''

          for (const part of parts) {
            const lines = part.split('\n')
            let data = ''
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                data += line.slice(6)
              }
            }
            if (data) {
              try {
                const event = JSON.parse(data) as AdkEvent
                processEvent(event)
              } catch {
                // Skip unparseable events
              }
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Expected when switching sessions
          return
        }
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error('SSE stream error:', err)
      } finally {
        // Mark all streaming messages as complete
        setMessages((prev) =>
          prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)),
        )
        setIsStreaming(false)
      }
    },
    [sessionId, appName, userId, processEvent],
  )

  /**
   * Send a new user message and start the SSE stream.
   */
  const sendMessage = useCallback(
    (text: string) => {
      // Add user message to state
      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          role: 'user',
          text,
          timestamp: new Date(),
        },
      ])

      startStream({
        new_message: {
          role: 'user',
          parts: [{ text }],
        },
      })
    },
    [startStream],
  )

  /**
   * Resume an interrupted run by invocation ID.
   */
  const resumeRun = useCallback(
    (invocationId: string) => {
      startStream({ invocation_id: invocationId })
    },
    [startStream],
  )

  return {
    messages,
    isStreaming,
    error,
    draftResponse,
    sources,
    sendMessage,
    resumeRun,
  }
}

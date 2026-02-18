import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { ChatArea } from '@/components/ChatArea'
import { useChat } from '@/hooks/useChat'

// Define the route state type for passing initial message
interface SessionRouteState {
  initialMessage?: string
}

export const Route = createFileRoute('/_app/session/$sessionId')({
  component: SessionPage,
})

function SessionPage() {
  const { sessionId } = useParams({ from: '/_app/session/$sessionId' })
  const initialMessageSent = useRef(false)

  const {
    messages,
    isStreaming,
    error,
    sendMessage,
  } = useChat({ sessionId })

  // Send initial message from router state (when navigating from landing page)
  useEffect(() => {
    if (initialMessageSent.current) return

    // Access the router state that was passed during navigation
    const state = (window.history.state?.usr ?? {}) as SessionRouteState
    if (state.initialMessage) {
      initialMessageSent.current = true
      sendMessage(state.initialMessage)
    }
  }, [sendMessage])

  return (
    <>
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-sm text-red-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>連線錯誤: {error}</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-auto text-xs text-red-600 hover:text-red-800 underline"
          >
            重新整理
          </button>
        </div>
      )}
      <ChatArea
        messages={messages}
        isStreaming={isStreaming}
        onSendMessage={sendMessage}
      />
    </>
  )
}

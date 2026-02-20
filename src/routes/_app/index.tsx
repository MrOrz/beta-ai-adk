import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { sendChatMessage } from '@/lib/chatCache'

export const Route = createFileRoute('/_app/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message.trim() || isLoading) return

      setIsLoading(true)

      // Generate a new session ID
      const sessionId = crypto.randomUUID()

      // 1. Instantly seed the cache and start the background stream fetch
      sendChatMessage(queryClient, sessionId, message.trim())

      // 2. Navigate to the session page.
      // The session page will simply subscribe to the cache, watching the letters stream in.
      navigate({
        to: '/session/$sessionId',
        params: { sessionId },
      })
    },
    [message, isLoading, navigate, queryClient],
  )

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      {/* Welcome */}
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg">
          C
        </div>
        <h1 className="text-2xl font-bold text-text-main">
          歡迎使用 Cofacts.ai
        </h1>
        <p className="text-text-muted leading-relaxed">
          貼上可疑訊息或 Cofacts 文章連結，AI 協助您進行查核、撰寫回應。
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="max-w-2xl w-full mt-8">
        <div className="relative rounded-xl shadow-sm border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 p-4 pr-14 min-h-[100px] max-h-48 resize-none text-sm rounded-xl"
            placeholder="貼上想查核的訊息，或輸入 Cofacts 文章連結 (https://cofacts.tw/article/...)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 bg-primary text-black rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
        <div className="text-center mt-3">
          <span className="text-[10px] text-gray-400">
            AI 可能會犯錯，請務必查核事實。
          </span>
        </div>
      </form>
    </div>
  )
}

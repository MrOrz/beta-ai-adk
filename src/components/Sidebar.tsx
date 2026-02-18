import { Link, useParams } from '@tanstack/react-router'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Placeholder session data — will be replaced by real ADK session queries
interface SessionItem {
  id: string
  title: string
  subtitle: string
  active?: boolean
}

const placeholderSessions: { label: string; items: SessionItem[] }[] = [
  {
    label: '進行中',
    items: [
      {
        id: 'demo-1',
        title: 'Line: 免費 iPhone 詐騙',
        subtitle: '剛剛編輯 • 協作中',
        active: true,
      },
      {
        id: 'demo-2',
        title: '謠言：選舉日期變更',
        subtitle: '2 小時前',
      },
    ],
  },
  {
    label: '近期紀錄',
    items: [
      {
        id: 'demo-3',
        title: '健康：檸檬水療法',
        subtitle: '昨天',
      },
    ],
  },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const params = useParams({ strict: false })
  const currentSessionId = (params as Record<string, string | undefined>)
    .sessionId

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-white border-r border-border-subtle flex flex-col shrink-0 z-50
          fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* New session button */}
        <div className="p-4">
          <Link
            to="/"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-primary font-medium py-2.5 px-4 rounded-lg transition-colors border border-primary"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>新查核任務</span>
          </Link>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {placeholderSessions.map((group) => (
            <div key={group.label}>
              <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
                {group.label}
              </div>
              {group.items.map((session) => {
                const isActive = currentSessionId === session.id
                return (
                  <Link
                    key={session.id}
                    to="/session/$sessionId"
                    params={{ sessionId: session.id }}
                    onClick={onClose}
                    className={`
                      flex flex-col p-3 rounded-lg group transition-colors
                      ${isActive ? 'bg-primary/10 text-text-main' : 'hover:bg-gray-50 text-text-muted'}
                    `}
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate text-left ${!isActive ? 'group-hover:text-text-main' : ''}`}
                      >
                        {session.title}
                      </div>
                      <div className="text-xs text-text-muted truncate mt-0.5 text-left">
                        {session.subtitle}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle bg-gray-50">
          <div className="flex items-center gap-3 text-sm text-text-muted hover:text-text-main cursor-pointer">
            <span className="material-symbols-outlined">help</span>
            <span>使用教學與支援</span>
          </div>
        </div>
      </aside>
    </>
  )
}

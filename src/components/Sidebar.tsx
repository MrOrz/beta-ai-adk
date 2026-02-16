"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 768 // Only on mobile/tablet
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:relative top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-full
          w-64 bg-surface-light dark:bg-surface-dark border-r border-border-subtle
          flex flex-col shrink-0 z-30 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* New Task Button */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-surface-light hover:bg-orange-50 dark:bg-surface-dark dark:hover:bg-gray-800 text-primary font-medium py-2.5 px-4 rounded-lg transition-colors border border-primary">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>新查核任務</span>
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {/* Active Section */}
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
            進行中
          </div>

          <Link href="#" className="flex flex-col p-3 bg-primary/10 rounded-lg text-text-main dark:text-gray-100 group border-l-4 border-primary">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-left">
                Line: 免費 iPhone 詐騙
              </div>
              <div className="text-xs text-text-muted truncate mt-0.5 text-left flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                剛剛編輯 • 協作中
              </div>
            </div>
          </Link>

          <Link href="#" className="flex flex-col p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-muted dark:text-gray-400 group transition-colors">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate group-hover:text-text-main dark:group-hover:text-gray-200 text-left">
                謠言：選舉日期變更
              </div>
              <div className="text-xs text-text-muted truncate mt-0.5 text-left">
                2 小時前
              </div>
            </div>
          </Link>

          {/* Recent Section */}
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-6">
            近期紀錄
          </div>

          <Link href="#" className="flex flex-col p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-muted dark:text-gray-400 group transition-colors">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate group-hover:text-text-main dark:group-hover:text-gray-200 text-left">
                健康：檸檬水療法
              </div>
              <div className="text-xs text-text-muted truncate mt-0.5 text-left">
                昨天
              </div>
            </div>
          </Link>

          <Link href="#" className="flex flex-col p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-muted dark:text-gray-400 group transition-colors">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate group-hover:text-text-main dark:group-hover:text-gray-200 text-left">
                影片：曼谷治安事件
              </div>
              <div className="text-xs text-text-muted truncate mt-0.5 text-left">
                3 天前
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle bg-gray-50 dark:bg-gray-900/50">
          <Link href="#" className="flex items-center gap-3 text-sm text-text-muted hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>使用教學與支援</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

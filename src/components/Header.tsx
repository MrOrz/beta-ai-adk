"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-border-subtle flex items-center justify-between px-4 shrink-0 z-30 relative shadow-sm">
      {/* Left: Logo & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-text-muted hover:text-text-main md:hidden"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-text-main dark:text-gray-100">
            Cofacts
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted ml-6">
          <Link href="#" className="hover:text-primary transition-colors">
            查核資料庫
          </Link>
          <Link href="#" className="text-primary font-bold">
            協作區
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            關於
          </Link>
        </nav>
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="flex-1 max-w-xl mx-8 hidden lg:block">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
            search
          </span>
          <input
            type="text"
            placeholder="搜尋可疑訊息或查核報告..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-text-muted relative transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300 dark:border-gray-600 cursor-pointer">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPje9tDSyqBEU2sHNHMhR9ugPFlFkmuKyd9tsW_BoXpmhdN9it-v-AzhSYYN-Fe_4UuUZCuhyEzq6lWS2FVdhLFlWf55KqSsYWowAFvNeRR3-alYFoa80i3Gclrnqd9_xYSqNHChppnvA84sPcnOahOuNaPJ7H_ezlTQREicFqRVUCEt63fl54GY7BOuFvfHjJuXHjH0ciZks5f60cRGs2wCm1A5Rggp5dXNhnUURPdNY31wCItSoZmZqJ9PjU2OQnBNgtvz95PJE"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

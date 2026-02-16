"use client";

import { useState } from "react";
import ResponseEditor from "./ResponseEditor";
import SourceLinkage from "./SourceLinkage";

type Tab = "editor" | "linkage";

export default function RightDrawer() {
  const [activeTab, setActiveTab] = useState<Tab>("editor");

  return (
    <aside className="w-[380px] bg-white dark:bg-surface-dark border-l border-border-subtle hidden lg:flex flex-col shrink-0 shadow-lg z-10 h-full">
      {/* Tab Switcher */}
      <div className="flex border-b border-border-subtle bg-white dark:bg-surface-dark">
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "editor"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-text-muted hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          回應編輯器
        </button>
        <button
          onClick={() => setActiveTab("linkage")}
          className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "linkage"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-text-muted hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          資料關聯
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "editor" ? <ResponseEditor /> : <SourceLinkage />}
      </div>
    </aside>
  );
}

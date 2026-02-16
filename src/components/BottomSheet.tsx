"use client";

import { useState, useRef, useEffect } from "react";
import ResponseEditor from "./ResponseEditor";
import SourceLinkage from "./SourceLinkage";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "editor" | "linkage";

export default function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const [activeTab, setActiveTab] = useState<Tab>("editor");
  const [height, setHeight] = useState<"half" | "full">("half");
  const sheetRef = useRef<HTMLDivElement>(null);

  // Simple drag logic could be added here, but for now we'll toggle height on drag handle click
  const toggleHeight = () => {
    setHeight(height === "half" ? "full" : "half");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 md:hidden animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 w-full z-50 flex flex-col bg-sheet-bg dark:bg-gray-900 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out transform translate-y-0 md:hidden
          ${height === "full" ? "h-[90vh]" : "h-[50vh]"}
        `}
      >
        {/* Drag Handle */}
        <div
          className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
          onClick={toggleHeight}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Tab Switcher */}
        <div className="flex w-full border-b border-gray-200 dark:border-gray-800 bg-sheet-bg dark:bg-gray-900 rounded-t-2xl shrink-0">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex-1 py-4 text-center font-bold relative transition-colors ${activeTab === "editor" ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
              }`}
          >
            回應編輯器
            {activeTab === "editor" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-primary rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("linkage")}
            className={`flex-1 py-4 text-center font-bold relative transition-colors ${activeTab === "linkage" ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
              }`}
          >
            資料關聯
            {activeTab === "linkage" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-primary rounded-t-full"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative bg-background-light dark:bg-background-dark">
          {activeTab === "editor" ? <ResponseEditor /> : <SourceLinkage />}
        </div>
      </div>
    </>
  );
}

"use client";

import { CopilotChat } from "@copilotkit/react-ui";

interface ChatAreaProps {
  onOpenBottomSheet: () => void;
}

export default function ChatArea({ onOpenBottomSheet }: ChatAreaProps) {
  return (
    <section className="flex-1 flex flex-col bg-white dark:bg-gray-900 relative overflow-hidden min-w-0">
      <div className="flex-1 h-full w-full">
        <CopilotChat
          className="h-full w-full chat-container"
          instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          labels={{
            title: "Cofacts AI Agent",
            initial: "您好，感謝您的提問。關於這則訊息，其中混合了部分真實政策與常見的詐騙手法，極有可能是釣魚訊息。真實的狀況是，經濟部確實有電動機車補助計畫，但金額依縣市與車型而異，且官方申請絕不會透過 Line 連結進行。為了進一步查證，我將先搜尋目前的官方補助公告，並檢查該連結是否為已知的惡意網域。",
          }}
        />
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <button
          onClick={onOpenBottomSheet}
          className="bg-primary text-black font-medium py-3 px-6 rounded-full shadow-lg hover:bg-primary-hover transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">edit_note</span>
          <span>編輯回應草稿</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}

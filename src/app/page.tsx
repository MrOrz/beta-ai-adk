"use client";

import {
  useCoAgent,
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

export default function CopilotKitPage() {
  useCoAgent({
    name: "my_agent",
  });

  return (
    <main>
      <CopilotSidebar
        disableSystemMessage={true}
        clickOutsideToClose={false}
        defaultOpen={true}
        labels={{
          title: "Cofacts AI",
          initial:
            "👋 你好！我是 Cofacts AI 事實查核助手。\n\n請提供一則 Cofacts 可疑訊息的網址（例如 https://cofacts.tw/article/<articleId>）來開始查核流程。",
        }}
        suggestions={[
          {
            title: "開始查核",
            message:
              "我想查核這則訊息：https://cofacts.tw/article/",
          },
          {
            title: "搜尋 Cofacts",
            message: "幫我搜尋 Cofacts 資料庫中關於「疫苗」的可疑訊息",
          },
          {
            title: "熱門待查核",
            message: "有哪些最近熱門、需要查核的訊息？",
          },
        ]}
      >
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
          <div className="text-center text-white/80 max-w-md px-6">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Cofacts AI
            </h1>
            <p className="text-lg text-white/60">
              事實查核助手 — 在右側聊天欄開始對話
            </p>
          </div>
        </div>
      </CopilotSidebar>
    </main>
  );
}

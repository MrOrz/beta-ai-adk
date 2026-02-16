"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import RightDrawer from "@/components/RightDrawer";
import BottomSheet from "@/components/BottomSheet";
import { useCoAgent } from "@copilotkit/react-core";

export default function Home() {
  // Agent connection (headless, just ensuring connection)
  useCoAgent({
    name: "my_agent",
  });

  // Mobile State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">

      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 flex overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <ChatArea
          onOpenBottomSheet={() => setIsBottomSheetOpen(true)}
        />

        <RightDrawer />

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      </main>
    </div>
  );
}

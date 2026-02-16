"use client";

export default function ResponseEditor() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Top Controls: Version & Status */}
        <div className="flex items-center justify-between mb-2">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors">
              <span>版本 8 (目前)</span>
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </button>
            {/* Dropdown (Simulation) */}
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-50">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 font-medium">版本 8 (目前) - 10:24</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">版本 7 - 10:22</a>
                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">捨棄草稿</a>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">cloud_done</span> 已儲存
          </span>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-row gap-2 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg w-full overflow-x-auto no-scrollbar">
          <button className="flex-1 min-w-[80px] py-2 text-[10px] font-bold text-center rounded text-gray-500 hover:bg-white/80 dark:hover:bg-gray-700 transition-all flex flex-col items-center justify-center gap-0.5">
            <span className="material-symbols-outlined text-yellow-500 text-[16px]">warning</span>
            <span>不在查證範圍</span>
          </button>
          <button className="flex-1 min-w-[80px] py-2 text-[10px] font-bold text-center rounded bg-white dark:bg-gray-800 shadow-sm text-red-600 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-0.5">
            <span className="material-symbols-outlined text-[16px]">cancel</span>
            <span>含有不實訊息</span>
          </button>
          <button className="flex-1 min-w-[80px] py-2 text-[10px] font-bold text-center rounded text-gray-500 hover:bg-white/80 dark:hover:bg-gray-700 transition-all flex flex-col items-center justify-center gap-0.5">
            <span className="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
            <span>含有正確訊息</span>
          </button>
          <button className="flex-1 min-w-[80px] py-2 text-[10px] font-bold text-center rounded text-gray-500 hover:bg-white/80 dark:hover:bg-gray-700 transition-all flex flex-col items-center justify-center gap-0.5">
            <span className="material-symbols-outlined text-blue-500 text-[16px]">comment</span>
            <span>含有個人意見</span>
          </button>
        </div>

        {/* Response Content */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">回應內容</label>
            <button className="text-xs text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> AI 修飾
            </button>
          </div>
          <textarea
            className="w-full h-44 p-3 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none leading-relaxed"
            placeholder="在此撰寫您的查核回應..."
            defaultValue={`🚫 含有不實訊息
關於「政府補助電動機車2萬元」的訊息，部分內容有誤且連結可疑。
1. 【補助金額不符】經濟部工業局的補助金額並非齊頭式2萬元，需依據車型與縣市加碼而定。
2. 【釣魚連結警示】政府申請平台網址通常為 .gov.tw 結尾。訊息中的 Line 連結並非官方管道，請勿點擊以免個資外洩。`}
          ></textarea>
          <div className="text-right">
            <span className="text-xs text-gray-400">126 字</span>
          </div>
        </div>

        {/* Reference Links */}
        <div className="space-y-2 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">link</span>
              佐證資料
            </label>
            <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">從對話匯入</button>
          </div>
          <div className="relative flex-1">
            <textarea
              className="w-full h-32 p-3 text-sm font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              placeholder="在此貼上連結或筆記..."
              defaultValue={`[1] 官方補助專區
https://www.lev.org.tw/subsidy/default.aspx
[2] 查核報告 - 類似詐騙手法
https://www.mygopen.com/2023/12/scam-link.html`}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="p-4 bg-surface-light dark:bg-surface-dark border-t border-border-subtle shrink-0">
        <button className="w-full py-3 px-4 bg-primary text-black font-bold text-base rounded-lg hover:bg-primary-hover shadow-md transition-colors flex justify-center items-center gap-2">
          <span className="material-symbols-outlined">send</span>
          送進 Cofacts
        </button>
      </div>
    </div>
  );
}

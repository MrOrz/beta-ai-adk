"use client";

interface SourceCardProps {
  domain: string;
  favicon: string;
  title: string;
  snippet: string;
  thumbnail?: string;
  icon?: string;
  iconColor?: string;
  adopted?: boolean;
}

function SourceCard({ domain, favicon, title, snippet, thumbnail, icon, iconColor, adopted }: SourceCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative border-none">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <img src={favicon} alt="Favicon" className="w-4 h-4 rounded-sm" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide truncate">{domain}</span>
          </div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-[13px] mb-2 leading-snug">{title}</h4>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{snippet}</p>
        </div>

        {thumbnail ? (
          <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600">
            <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
          </div>
        ) : icon ? (
          <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-100 dark:border-gray-600">
            <span className={`material-symbols-outlined ${iconColor || 'text-gray-400'}`}>{icon}</span>
          </div>
        ) : null}
      </div>

      {adopted && (
        <div className="mt-4 flex items-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-900/40">
            <span className="material-symbols-outlined text-[12px] mr-1">check_circle</span>
            已採用
          </span>
        </div>
      )}
    </div>
  );
}

export default function SourceLinkage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-light dark:bg-background-dark h-full">
      <div className="flex justify-between items-center mb-1 px-1">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">相關來源 (4)</h3>
        <button className="text-[11px] text-primary hover:text-[#E6A400] font-bold tracking-tight transition-colors">重新搜尋</button>
      </div>

      <SourceCard
        domain="tfc-taiwan.org.tw"
        favicon="https://lh3.googleusercontent.com/aida-public/AB6AXuDDsHe2RmfCXulHH_lAf9nQsKD79cBbHY7pkLX56ymgUpdd1W0TannfV2mLLYPpSFLh-SXushDxZPGNgepcskPfonYe8uCbNGJ32SiNXuzX6DYGqEFvm43OncuYmerCkbNtqovKAtfTBMguGu_JZteB3IfEy1mIj6nAOg27yY-l4MNgXlwcQxw9PNPrwVYFzE7DP9u0IdtGbIjUjoDfvqxqjH-thgrO16PJ3l-KJRqEEjFHOAXpBvbwbFw2aHiNcQuejw6JRLE4Ti8"
        title="【錯誤】網傳政府補助電動機車2萬元？"
        snippet="經查核，網傳訊息引用的數據過時，且混淆了地方政府與中央單位的補助方案。目前並無單筆2萬元的現金..."
        thumbnail="https://lh3.googleusercontent.com/aida-public/AB6AXuCs4eQIGJTfwkAqMld9vmbasQXZZt77dBzr06Vt6HuVH95rhiU5WPkNC7WiI8kTu_Ajgfuv7pyse3biTrqThRfXgzqV0EY2hXCztP4BWQwLEZn1YNnbj7BJqG8S2MnZASV1XwDrZxapF2Hh0Vh_Wskbny2hFgZr1Bar3Ayz2HA7iaoHvrK_QxxKI-YsFL2pQujck1VpNdjsabeSI4tXMZDO9KPT8rmR0odZkuHx0rx6qBKm-hzMWzmISIig7J3rK8z1RDRloPyJTvI"
        adopted={true}
      />

      <SourceCard
        domain="mygopen.com"
        favicon="https://lh3.googleusercontent.com/aida-public/AB6AXuBq8LCRdVsZ8Pke-4M--rX6ur3PG0wIoo5JByhBzk34ndEQPZhlOFN7yx6VL-jErd6ciZR_MaF4ef5lgj29bQNPmWCIKYsm5q6eWWhqj8VvuthQ4XhuP1r2e9aIQw04WH7_AaW-DMgfZWXYgHeJ5ziYVwcuGC5tqG5Z02hpNdC0-Bf25bZPRZhKQsPXUZbXAq5Brv-J9dEAHrNMT1ciV7o8eofAlJ7N83VipxzuqcjBXmQAf3WT7-11X_3SPc2m294MeV-WhEQEDdw"
        title="【詐騙】LINE 轉傳補助連結？小心個資外流"
        snippet="近期詐騙集團利用補助名義發送釣魚簡訊與LINE訊息，連結網址並非政府gov.tw結尾，請民眾務必..."
        icon="warning"
        iconColor="text-orange-300"
      />

      <SourceCard
        domain="ida.gov.tw"
        favicon="https://lh3.googleusercontent.com/aida-public/AB6AXuDXpTg3moza2sFD4cWsZK3BjgGgopWuZXu1GmQwXajvI6tk0RsE1gkrnPtBJ2yk6XH3jYyw3IjH4jOpKqPxPwrGqJo332j9Y-3Waaq7y_wKzSoCW9z726reANIbii-cCQg0LzQbYpfTKnN_RI-cr78H1_d3Q_C_-2ieO5fYQQSgpkaPdTvk3epz9NaJ-fl6_gx5SFAVSh-qgtNudXJupW_NThwWhD1OpYLHl3RcVvg0tUbQ4j0EhdNZnq0GsiuTCn5Ys-WcoTiG28w"
        title="經濟部工業局電動機車補助說明"
        snippet="112年度電動機車產業補助實施要點公告，針對重型、輕型等級不同，補助金額分別為7000元..."
        thumbnail="https://lh3.googleusercontent.com/aida-public/AB6AXuBZNhPXf_W3Nj0jfkmkCEKBjm1-_vCiVtlgkJLBWXYm--Q4mya6QhDk_MnC15fIMpvXq57ezhDHyA4KaMcQ4QKLPjhvMiZu0R6cJTWj1zjo9qs7jvgokEUZraHbWf1DLfOCYW1VSPOxxC3TMnUQj1xKKyqLjcMRtFiu81luD_qlGATF-1MSAGdqSRaK6GQu-BkpBXuSbSPbbA_i-8OnmLAIMc-ttwzecWYMH2v0eGoYd5dCBhZpc_x4uxsSO_Tzfp7GFs1cw7hybOU"
        adopted={true}
      />

      <SourceCard
        domain="news.com.tw"
        favicon="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZTZWc6u0IV3XXoOcx2i8zBryTDVO-mS4-ZaSbL0xl3IjlcnICPC1iCt-MVSjVOyVo0uBT0b9gTBjAFmbhzapWeZYDOkrZQcIbin9fauH_2s-0Wi7kbfdeX_vq7DxYPUEZI8RDz0IhxjsX7DN7oiMpKGlNzV4zB7PYK-1osyJq692uKHUff5hCUpywSyxVVjaLIyES6SgSBPv3QkTa903UDUovYsHDuHg_a_RtnAD1FOU8qFPqxIJSmKeDWTXdjv9O7wNDdMushE"
        title="最新補助政策報導：今年度申請人數創新高"
        snippet="記者張小明／台北報導。隨環保意識抬頭，今年度電動機車申請補助案件數已突破..."
        icon="newspaper"
        iconColor="text-blue-300"
      />
    </div>
  );
}

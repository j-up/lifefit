"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import {
  ArrowLeft,
  PiggyBank,
  TrendingUp,
  Banknote,
  Percent,
  Info,
  ChevronDown,
  Search,
} from "lucide-react";

interface ParkingProduct {
  id: string;
  bank: string;
  productName: string;
  baseRate: number;
  maxRate: number;
  features: string[];
  tag?: string;
  color: string;
}

const PRODUCTS: ParkingProduct[] = [
  {
    id: "ok-jjantech",
    bank: "OK저축은행",
    productName: "OK짠테크통장",
    baseRate: 3.5,
    maxRate: 7.0,
    features: ["50만원 이하 연 7.0%", "50만원 초과분 연 3.5%", "예금자보호 5천만원"],
    tag: "최고금리",
    color: "#ff5e00",
  },
  {
    id: "daol-ficonnect",
    bank: "다올저축은행",
    productName: "Fi커넥트통장",
    baseRate: 2.8,
    maxRate: 3.8,
    features: ["오픈뱅킹 등록시 +1.0%p", "조건 없는 고금리", "예금자보호 5천만원"],
    tag: "추천",
    color: "#00b050",
  },
  {
    id: "acuon-plus",
    bank: "애큐온저축은행",
    productName: "플러스자유예금",
    baseRate: 3.2,
    maxRate: 3.7,
    features: ["마케팅동의 우대", "최대 2천만원 한도", "예금자보호 5천만원"],
    color: "#e62e2d",
  },
  {
    id: "kbank-life",
    bank: "케이뱅크",
    productName: "생활통장",
    baseRate: 2.0,
    maxRate: 3.0,
    features: ["300만원 이하 연 3.0%", "1금융권 안정성", "이체 수수료 무료"],
    tag: "1금융권",
    color: "#00205b",
  },
  {
    id: "toss",
    bank: "토스뱅크",
    productName: "토스뱅크 통장",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["조건 없이 연 2.0% 무제한", "매일 이자 받기(일복리)", "ATM/이체 수수료 무료"],
    tag: "인기",
    color: "#0064ff",
  },
  {
    id: "kakao",
    bank: "카카오뱅크",
    productName: "세이프박스",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["하루만 맡겨도 연 2.0%", "계좌 속 금고 보관", "카카오톡 간편 연동"],
    tag: "인기",
    color: "#fee500",
  },
  {
    id: "kbank-emergency",
    bank: "케이뱅크",
    productName: "비상금통장(플러스박스)",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["최대 3억원 한도", "조건 없는 연 2.0%", "예금자보호 5천만원"],
    color: "#ff8700",
  },
  {
    id: "nh",
    bank: "NH농협은행",
    productName: "올원e예금",
    baseRate: 1.5,
    maxRate: 2.1,
    features: ["농협 ATM 수수료 무료", "농협카드 연계 우대", "비대면 가입 가능"],
    color: "#006241",
  },
  {
    id: "shinhan",
    bank: "신한은행",
    productName: "쏠편한 입출금통장",
    baseRate: 1.0,
    maxRate: 1.6,
    features: ["주거래 우대", "신한카드 연계", "비대면 가입"],
    color: "#0046ff",
  },
];

type SortKey = "maxDesc" | "baseDesc" | "nameAsc";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

function calcMonthlyInterest(principal: number, rate: number, id: string): number {
  if (id === "ok-jjantech") {
    // 50만 원 이하 연 7.0%, 초과 연 3.5%
    const limit = 500_000;
    if (principal <= limit) {
      return (principal * 7.0) / 100 / 12;
    } else {
      const lowPart = (limit * 7.0) / 100 / 12;
      const highPart = ((principal - limit) * 3.5) / 100 / 12;
      return lowPart + highPart;
    }
  }
  return (principal * rate) / 100 / 12;
}

function calcYearlyInterest(principal: number, rate: number, id: string): number {
  if (id === "ok-jjantech") {
    const limit = 500_000;
    if (principal <= limit) {
      return (principal * 7.0) / 100;
    } else {
      const lowPart = (limit * 7.0) / 100;
      const highPart = ((principal - limit) * 3.5) / 100;
      return lowPart + highPart;
    }
  }
  return (principal * rate) / 100;
}

export default function ParkingPage() {
  const [amountStr, setAmountStr] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("maxDesc");
  const [search, setSearch] = useState<string>("");
  const [simProductId, setSimProductId] = useState<string>("toss");

  const amount = amountStr === "" ? 0 : parseInt(amountStr, 10) * 10_000;

  const sortedProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.bank.toLowerCase().includes(q) ||
          p.productName.toLowerCase().includes(q)
      );
    }
    switch (sortKey) {
      case "maxDesc":
        list.sort((a, b) => b.maxRate - a.maxRate);
        break;
      case "baseDesc":
        list.sort((a, b) => b.baseRate - a.baseRate);
        break;
      case "nameAsc":
        list.sort((a, b) => a.bank.localeCompare(b.bank, "ko"));
        break;
    }
    return list;
  }, [sortKey, search]);

  const maxMonthly = useMemo(() => {
    if (amount <= 0) return 0;
    return Math.max(...sortedProducts.map((p) => calcMonthlyInterest(amount, p.maxRate, p.id)));
  }, [amount, sortedProducts]);

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 고금리 파킹통장 금리 비교",
            url: "https://lifefit.kr/tools/parking",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "주요 시중은행 및 저축은행, 인터넷은행(토스, 카카오, 케이뱅크)의 고금리 파킹통장 금리와 예상 이자를 한눈에 비교하는 도구",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://lifefit.kr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "파킹통장 비교",
                item: "https://lifefit.kr/tools/parking",
              },
            ],
          }),
        }}
      />
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors"
            >
              ← 메인으로 돌아가기
            </Link>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00c471] text-white mb-3 shadow-lg shadow-green-200">
              <PiggyBank size={24} />
            </div>
            <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
              고금리 파킹통장 비교
            </h1>
            <p className="text-sm text-[#8b95a1] mt-1">
              잠깐 쉬는 돈도 놓치지 마세요. 금리와 이자를 한눈에 비교하세요.
            </p>
          </div>
        </div>

        {/* Amount Input Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)] mb-4">
          <h2 className="text-sm font-bold text-[#4e5968] mb-3 flex items-center gap-1.5">
            <Banknote size={16} className="text-[#3182f6]" />
            모을 금액 입력
          </h2>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              value={amountStr}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^[0-9]+$/.test(val)) {
                  setAmountStr(val);
                }
              }}
              placeholder="예: 500"
              className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-[#3182f6] transition-shadow"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
              만원
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {[100, 300, 500, 1000, 2000, 3000].map((val) => (
              <button
                key={val}
                onClick={() => setAmountStr(String(val))}
                className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] font-medium hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
              >
                {val >= 10000 ? val / 10000 + "억" : val + "만"}
              </button>
            ))}
          </div>
          {amount > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-[#f8f9fa] flex items-center justify-between">
              <span className="text-sm text-[#8b95a1]">입력한 금액</span>
              <span className="text-base font-bold text-[#191f28]">
                {formatCurrency(amount)}원
              </span>
            </div>
          )}
        </div>

        {/* Daily Compound Interest Simulator */}
        {amount > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)] mb-4">
            <h2 className="text-sm font-bold text-[#191f28] mb-3 flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              매일 이자 &amp; 일복리 시뮬레이터
            </h2>
            <p className="text-xs text-[#8b95a1] mb-4">
              매일 이자를 즉시 받아(일복리) 재투자할 때의 이자 상승 효과를 시뮬레이션합니다.
            </p>

            {/* Product Select Dropdown */}
            <div className="relative mb-4">
              <select
                value={simProductId}
                onChange={(e) => setSimProductId(e.target.value)}
                className="w-full h-12 pl-4 pr-10 rounded-2xl bg-[#f2f4f6] text-xs font-bold text-[#191f28] outline-none focus:ring-2 focus:ring-[#3182f6] appearance-none cursor-pointer"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.bank}] {p.productName} (최고 연 {p.maxRate.toFixed(1)}%)
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] pointer-events-none"
              />
            </div>

            {/* Selected Product Rate Info */}
            {(() => {
              const p = PRODUCTS.find((prod) => prod.id === simProductId) || PRODUCTS[4]; // default to Toss
              const baseYearly = calcYearlyInterest(amount, p.maxRate, p.id);
              const dailyBeforeTax = baseYearly / 365;
              const dailyAfterTax = dailyBeforeTax * (1 - 0.154);

              // Calculate compound vs simple for 30, 90, 180, 365 days
              const getSimStats = (days: number) => {
                const netDailyRate = (p.maxRate / 100 / 365) * (1 - 0.154);
                let netDailyInterestTossComp = 0;
                let netDailyInterestSimple = 0;
                
                if (p.id === "ok-jjantech") {
                  const limit = 500000;
                  if (amount <= limit) {
                    const r = (7.0 / 100 / 365) * (1 - 0.154);
                    netDailyInterestTossComp = amount * (Math.pow(1 + r, days) - 1);
                    netDailyInterestSimple = amount * r * days;
                  } else {
                    const r1 = (7.0 / 100 / 365) * (1 - 0.154);
                    const r2 = (3.5 / 100 / 365) * (1 - 0.154);
                    const lowPartComp = limit * (Math.pow(1 + r1, days) - 1);
                    const highPartComp = (amount - limit) * (Math.pow(1 + r2, days) - 1);
                    netDailyInterestTossComp = lowPartComp + highPartComp;
                    netDailyInterestSimple = (limit * r1 + (amount - limit) * r2) * days;
                  }
                } else {
                  netDailyInterestTossComp = amount * (Math.pow(1 + netDailyRate, days) - 1);
                  netDailyInterestSimple = amount * netDailyRate * days;
                }

                return {
                  comp: Math.round(netDailyInterestTossComp),
                  simp: Math.round(netDailyInterestSimple),
                  diff: Math.round(netDailyInterestTossComp - netDailyInterestSimple),
                };
              };

              const stats30 = getSimStats(30);
              const stats90 = getSimStats(90);
              const stats180 = getSimStats(180);
              const stats365 = getSimStats(365);

              return (
                <div className="space-y-4">
                  {/* Daily Earning Card */}
                  <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#4e5968]">{p.bank} {p.productName}</p>
                      <p className="text-[10px] text-[#8b95a1] mt-0.5">최고 금리 연 {p.maxRate.toFixed(1)}% 기준</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#191f28]">하루 이자 +{formatCurrency(dailyAfterTax)}원</p>
                      <p className="text-[10px] text-[#8b95a1]">세후 (세전 {formatCurrency(dailyBeforeTax)}원)</p>
                    </div>
                  </div>

                  {/* Compounding Comparison Table */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-[#4e5968]">일복리 효과 비교</h3>
                    <div className="rounded-2xl border border-gray-100 p-3.5 space-y-3 bg-gray-50/50">
                      {[
                        { label: "30일 후 (1달)", stats: stats30 },
                        { label: "90일 후 (3달)", stats: stats90 },
                        { label: "180일 후 (6달)", stats: stats180 },
                        { label: "365일 후 (1년)", stats: stats365 },
                      ].map((row, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-[#4e5968]">{row.label}</span>
                          <div className="text-right">
                            <span className="font-bold text-[#191f28]">세후 {formatCurrency(row.stats.comp)}원</span>
                            <span className="text-[10px] text-green-600 ml-1.5 font-bold">
                              {row.stats.diff > 0 ? `(+${formatCurrency(row.stats.diff)}원)` : "(복리 효과)"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px] text-blue-600 leading-relaxed font-semibold">
                    💡 **팁**: 토스뱅크 등에서 "매일 이자 받기"를 실행하여 예치 원금에 이자가 더해지면(일복리), 일반 예금 단리 상품보다 이자가 추가로 더 많이 붙게 됩니다. 예치 원금이 클수록, 기간이 길수록 복리 효과는 극대화됩니다.
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[rgba(0,27,55,0.05)] mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b8c1]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="은행 또는 상품명 검색"
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#f2f4f6] text-sm text-[#191f28] placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-[#3182f6] transition-shadow"
            />
          </div>
          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="h-10 pl-3 pr-8 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] font-medium outline-none focus:ring-2 focus:ring-[#3182f6] appearance-none cursor-pointer"
            >
              <option value="maxDesc">최고금리 높은순</option>
              <option value="baseDesc">기본금리 높은순</option>
              <option value="nameAsc">은행명 가나다순</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b95a1] pointer-events-none"
            />
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3 mb-6">
          {sortedProducts.map((product) => {
            const monthly = calcMonthlyInterest(amount, product.maxRate, product.id);
            const yearly = calcYearlyInterest(amount, product.maxRate, product.id);
            const isBest = amount > 0 && monthly === maxMonthly && maxMonthly > 0;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-3xl p-5 shadow-sm border transition-all ${
                  isBest
                    ? "border-[#00c471] ring-1 ring-[#00c471]"
                    : "border-[rgba(0,27,55,0.05)]"
                }`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.bank.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#191f28] text-sm">
                          {product.bank}
                        </span>
                        {product.tag && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#e8f3ff] text-[#3182f6] text-[10px] font-bold">
                            {product.tag}
                          </span>
                        )}
                        {isBest && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#e6f9f1] text-[#00c471] text-[10px] font-bold">
                            최고이자
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8b95a1]">
                        {product.productName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-0.5">
                      <span className="text-2xl font-extrabold text-[#191f28]">
                        {product.maxRate.toFixed(1)}
                      </span>
                      <span className="text-sm font-bold text-[#4e5968]">%</span>
                    </div>
                    <p className="text-[10px] text-[#8b95a1]">최고금리 (연)</p>
                  </div>
                </div>

                {/* Rate Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min((product.maxRate / 7.0) * 100, 100)}%`,
                        backgroundColor: product.color,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8b95a1] font-medium">
                    기본 {product.baseRate.toFixed(1)}%
                  </span>
                </div>

                {/* Interest Preview */}
                {amount > 0 && (
                  <div className="mb-3 p-3 rounded-xl bg-[#f8f9fa] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#4e5968]">
                      <TrendingUp size={14} className="text-[#00c471]" />
                      예상 이자 (세전)
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#191f28]">
                        월 {formatCurrency(monthly)}원
                      </p>
                      <p className="text-[10px] text-[#8b95a1]">
                        연 {formatCurrency(yearly)}원
                      </p>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-1 rounded-lg bg-[#f2f4f6] text-[11px] text-[#4e5968]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Search size={32} className="mx-auto mb-3 text-[#d1d6db]" />
              <p className="text-sm text-[#8b95a1]">
                검색 결과가 없어요.
                <br />
                다른 키워드로 검색해 보세요.
              </p>
            </div>
          )}
        </div>

        {/* Summary Card */}
        {amount > 0 && sortedProducts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)] mb-6">
            <h3 className="text-sm font-bold text-[#4e5968] mb-4 flex items-center gap-1.5">
              <Percent size={16} className="text-[#3182f6]" />
              {formatCurrency(amount)}원 기준 이자 비교
            </h3>
            <div className="space-y-3">
              {sortedProducts.slice(0, 5).map((p) => {
                const y = calcYearlyInterest(amount, p.maxRate, p.id);
                const m = calcMonthlyInterest(amount, p.maxRate, p.id);
                return (
                  <div key={p.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="text-xs text-[#4e5968] font-medium">
                        {p.bank} {p.productName}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#8b95a1]">
                        월 {formatCurrency(m)}원
                      </span>
                      <span className="text-xs font-bold text-[#191f28] w-16 text-right">
                        {p.maxRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl bg-[#fff8db] p-4 text-xs text-[#8b6a00] leading-relaxed">
          <p className="font-bold mb-1 flex items-center gap-1">
            <Info size={14} />
            참고 사항
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>표시된 금리는 2026년 6월 기준 대표 금리이며, 은행 정책에 따라 변동될 수 있습니다.</li>
            <li>최고금리는 우대조건(예: 마케팅 동의, 오픈뱅킹 연동 등)을 만족하는 경우의 최대 금리입니다.</li>
            <li>OK저축은행 OK짠테크통장은 50만 원 이하 소액 분에 대해서만 우대 이율(7.0%)이 적용되는 한도 분할 상품입니다.</li>
            <li>예상 이자는 세금(이자소득세 15.4%) 공제 전 금액입니다.</li>
            <li>실제 가입 전 해당 금융기관 공식 채널에서 최신 금리와 약관을 반드시 확인하시기 바랍니다.</li>
          </ul>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-[#b0b8c1] mt-6 leading-relaxed">
          본 페이지는 정보 제공을 목적으로 하며, 특정 금융상품의 가입을 권유하지 않습니다.
          <br />
          정확한 내용은 금융기관 공식 홈페이지를 통해 확인해 주시기 바랍니다.
        </p>
      </div>
      <Footer />
    </main>
  );
}

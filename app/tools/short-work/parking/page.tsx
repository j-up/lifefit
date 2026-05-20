"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
    id: "toss",
    bank: "토스뱅크",
    productName: "파킹통장",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["전액 자유입출금", "수시입출금 가능", "ATM 수수료 무료", "이체 수수료 무료"],
    tag: "인기",
    color: "#0064ff",
  },
  {
    id: "kakao",
    bank: "카카오뱅크",
    productName: "세이프박스",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["별도 계좌 관리", "즉시 이체 가능", "ATM 수수료 무료", "카카오톡 연동"],
    tag: "인기",
    color: "#fee500",
  },
  {
    id: "kbank",
    bank: "케이뱅크",
    productName: "비상금통장",
    baseRate: 2.0,
    maxRate: 2.0,
    features: ["1만원부터 가입", "자유로운 입출금", "ATM 수수료 무료", "이체 수수료 무료"],
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
    id: "ibk",
    bank: "IBK기업은행",
    productName: "i-ONE뱅크통장",
    baseRate: 1.5,
    maxRate: 2.0,
    features: ["비대면 전용", "ATM 수수료 무료", "기업은행 카드 연계"],
    color: "#0055a2",
  },
  {
    id: "hana",
    bank: "하나은행",
    productName: "하나원큐통장",
    baseRate: 1.0,
    maxRate: 1.8,
    features: ["주거래 우대 금리", "하나카드 연계", "비대면 가입"],
    color: "#008375",
  },
  {
    id: "woori",
    bank: "우리은행",
    productName: "우리-first입출금통장",
    baseRate: 1.0,
    maxRate: 1.7,
    features: ["주거래 우대", "우리카드 연계", "비대면 가입"],
    color: "#0067b3",
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

function calcMonthlyInterest(principal: number, rate: number): number {
  return (principal * rate) / 100 / 12;
}

function calcYearlyInterest(principal: number, rate: number): number {
  return (principal * rate) / 100;
}

export default function ParkingPage() {
  const [amountStr, setAmountStr] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("maxDesc");
  const [search, setSearch] = useState<string>("");

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
        list.sort((a, b) => a.baseRate - b.baseRate);
        break;
      case "nameAsc":
        list.sort((a, b) => a.bank.localeCompare(b.bank, "ko"));
        break;
    }
    return list;
  }, [sortKey, search]);

  const maxMonthly = useMemo(() => {
    if (amount <= 0) return 0;
    return Math.max(...sortedProducts.map((p) => calcMonthlyInterest(amount, p.maxRate)));
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
            url: "https://lifefit.kr/tools/short-work/parking",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "주요 시중은행 및 인터넷은행(토스, 카카오, 케이뱅크)의 파킹통장 금리와 예상 이자를 한눈에 비교하는 도구",
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
                name: "육아기 단축근무 계산기",
                item: "https://lifefit.kr/tools/short-work",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "파킹통장 비교",
                item: "https://lifefit.kr/tools/short-work/parking",
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
              ← 메인으로
            </Link>
            <Link
              href="/tools/short-work"
              className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors"
            >
              <ArrowLeft size={16} />
              계산기로
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
            const monthly = calcMonthlyInterest(amount, product.maxRate);
            const yearly = calcYearlyInterest(amount, product.maxRate);
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
                        width: `${Math.min((product.maxRate / 2.5) * 100, 100)}%`,
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
                const y = calcYearlyInterest(amount, p.maxRate);
                const m = calcMonthlyInterest(amount, p.maxRate);
                return (
                  <div key={p.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="text-xs text-[#4e5968] font-medium">
                        {p.bank}
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
            <li>표시된 금리는 2026년 5월 기준 대표 금리이며, 은행 정책에 따라 변동될 수 있습니다.</li>
            <li>최고금리는 주거래·카드 연계 등 우대조건을 충족했을 때 적용되는 금리입니다.</li>
            <li>예상 이자는 세금(이자소득세 15.4%) 공제 전 금액입니다.</li>
            <li>실제 가입 전 해당 은행 홈페이지나 앱에서 최신 금리와 조건을 반드시 확인하세요.</li>
          </ul>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#b0b8c1] mt-6 leading-relaxed">
          본 페이지는 정보 제공을 목적으로 하며, 투자 권유가 아닙니다.
          <br />
          상품 가입 전 반드시 해당 금융기관의 공식 채널을 통해 확인하시기 바랍니다.
        </p>
      </div>
    </main>
  );
}

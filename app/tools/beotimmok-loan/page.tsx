"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Share2,
  Info,
  Calculator,
  Coins,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export default function BeotimmokLoanPage() {
  // Inputs
  const [depositStr, setDepositStr] = useState<string>("15000"); // 1.5억 (만원 단위)
  const [incomeStr, setIncomeStr] = useState<string>("3500"); // 3500만 (만원 단위)
  const [familyType, setFamilyType] = useState<"single" | "newlywed" | "general_couple">("single");
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isElectronicContract, setIsElectronicContract] = useState<boolean>(false);
  const [isYoungPreferential, setIsYoungPreferential] = useState<boolean>(false);

  // States for UI
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const deposit = depositStr === "" ? 0 : parseInt(depositStr, 10);
  const income = incomeStr === "" ? 0 : parseInt(incomeStr, 10);

  // Auto set young preferential condition based on age or income
  // (Preferential rate -0.3%p: 만 25세 미만, 연소득 2천만 원 이하, 임차보증금 5천만 원 이하, 대출금 5천만 원 이하)
  useEffect(() => {
    if (income <= 2000 && deposit <= 5000) {
      setIsYoungPreferential(true);
    } else {
      setIsYoungPreferential(false);
    }
  }, [income, deposit]);

  // Handle Toast
  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Calculations
  const analysis = useMemo(() => {
    // 1. 적격 여부 판단
    let isEligible = true;
    const reasons: string[] = [];

    // 보증금 한도: 3억 원 이하 (수도권/지방 모두 청년 전용 버팀목은 3억 원 이하만 지원)
    if (deposit > 30000) {
      isEligible = false;
      reasons.push("임차보증금이 3억 원을 초과하여 대출 대상에서 제외됩니다. (청년 버팀목 한도: 보증금 3억 원 이하)");
    }

    // 소득 한도
    // - 미혼/일반부부: 5천만 원 이하
    // - 신혼가구: 7.5천만 원 이하
    // - 다자녀/2자녀 이상 가구: 6천만 원 이하
    let maxIncomeLimit = 5000;
    if (familyType === "newlywed") {
      maxIncomeLimit = 7500;
    } else if (childrenCount >= 2) {
      maxIncomeLimit = 6000;
    }

    if (income > maxIncomeLimit) {
      isEligible = false;
      reasons.push(
        `연소득 기준(${formatCurrency(maxIncomeLimit)}만 원 이하)을 초과했습니다. 귀하의 연소득은 ${formatCurrency(
          income
        )}만 원입니다.`
      );
    }

    // 2. 대출 한도 계산
    // - 보증금의 최대 80% 이내
    // - 최대 절대 금액 한도: 신혼가구는 3억 원, 그 외 가구는 2억 원
    const maxPercentLimit = Math.floor(deposit * 0.8);
    const maxAbsoluteLimit = familyType === "newlywed" ? 30000 : 20000;
    const loanLimit = isEligible ? Math.min(maxPercentLimit, maxAbsoluteLimit) : 0;

    // 3. 기본 금리 매칭
    let baseRate = 2.1;
    if (familyType === "newlywed") {
      // 신혼부부 전용 금리
      if (income <= 2000) baseRate = 1.5;
      else if (income <= 4000) baseRate = 1.8;
      else if (income <= 6000) baseRate = 2.1;
      else baseRate = 2.4;
    } else {
      // 청년/일반 전용 금리
      if (income <= 2000) baseRate = 1.8;
      else if (income <= 4000) baseRate = 2.1;
      else baseRate = 2.4; // 4000만 초과
    }

    // 4. 우대 금리 계산
    let preferentialRate = 0;
    if (isElectronicContract) preferentialRate += 0.1;
    if (isYoungPreferential && familyType !== "newlywed") preferentialRate += 0.3;

    // 자녀 우대
    if (childrenCount === 1) preferentialRate += 0.3;
    else if (childrenCount === 2) preferentialRate += 0.5;
    else if (childrenCount >= 3) preferentialRate += 0.7;

    // 최종 금리 (하한선 1.0%)
    const finalRate = Math.max(1.0, baseRate - preferentialRate);

    // 5. 월 이자 계산
    const monthlyInterest = Math.round(((loanLimit * 10000 * finalRate) / 100 / 12));
    const yearlyInterest = Math.round(((loanLimit * 10000 * finalRate) / 100));

    return {
      isEligible,
      reasons,
      loanLimit,
      baseRate,
      preferentialRate,
      finalRate,
      monthlyInterest,
      yearlyInterest,
      maxAbsoluteLimit,
    };
  }, [deposit, income, familyType, childrenCount, isElectronicContract, isYoungPreferential]);

  // Share Parameters
  const shareUrl = `https://lifefit.kr/tools/beotimmok-loan?deposit=${depositStr}&income=${incomeStr}&family=${familyType}&children=${childrenCount}`;
  const resultText = `[LifeFit] 2026 청년 버팀목 전세대출 판별 결과 💰\n✅ 예상 최대 한도: ${formatCurrency(
    analysis.loanLimit
  )}만 원\n✅ 최종 적용 금리: 연 ${analysis.finalRate.toFixed(2)}%\n✅ 예상 월 이자액: 월 ${formatCurrency(
    analysis.monthlyInterest
  )}원`;
  const fullText = `${resultText}\n\n👉 내 한도와 이자 무료 계산하기:\n${shareUrl}`;

  const handleShare = async () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 청년 버팀목 전세대출 계산기 💰",
          text: resultText,
          url: shareUrl,
        });
        showToastNotification("공유하기가 완료되었습니다!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Web Share API error:", err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("결과 링크가 복사되었습니다!");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToastNotification("링크 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `청년 버팀목 전세대출 계산기 결과 💰`,
      description: `예상 대출한도 ${formatCurrency(analysis.loanLimit)}만원 (연 ${analysis.finalRate.toFixed(
        2
      )}%, 월 이자 ${formatCurrency(analysis.monthlyInterest)}원). 1분 만에 내 조건의 한도와 이자를 진단해 보세요!`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 대출한도 계산하기",
      url: shareUrl,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f2f4f6] px-4 py-8 sm:py-12">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 청년 버팀목 전세대출 한도 & 이자 계산기",
            url: "https://lifefit.kr/tools/beotimmok-loan",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "청년 버팀목 전세자금대출 한도와 금리, 월별 실제 지불하는 대출 이자를 빠르게 연소득과 보증금을 기준으로 모의 계산해 드립니다.",
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
                name: "청년 버팀목 전세대출 계산기",
                item: "https://lifefit.kr/tools/beotimmok-loan",
              },
            ],
          }),
        }}
      />

      <div className="w-full max-w-[500px]">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors mb-4"
        >
          ← 메인으로 돌아가기
        </Link>

        {/* 타이틀 헤더 */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-200 text-xl font-bold">
            💰
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight sm:text-2xl">
            청년 버팀목 전세대출 계산기
          </h1>
          <p className="mt-1 text-xs text-[#8b95a1] sm:text-sm">
            내 소득과 임차 보증금을 바탕으로 예상 한도와 실제 이자를 모의 계산합니다.
          </p>
        </div>

        {/* 메인 폼 카드 */}
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          
          {/* 가구 형태 선택 */}
          <div>
            <label className="text-xs font-bold text-[#4e5968] block mb-2">가구 구분</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "single", label: "미혼/단독" },
                { id: "general_couple", label: "일반 부부" },
                { id: "newlywed", label: "신혼 가구" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFamilyType(item.id as any)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    familyType === item.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-[#f2f4f6] text-[#4e5968] border-transparent hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#8b95a1] mt-1">
              * 신혼가구: 혼인기간 7년 이내 또는 3개월 이내 결혼 예정 가구 (소득 기준 최대 7,500만 원 완화)
            </p>
          </div>

          {/* 자녀 수 선택 */}
          <div>
            <label className="text-xs font-bold text-[#4e5968] block mb-2">자녀 수</label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setChildrenCount(count)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    childrenCount === count
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-[#f2f4f6] text-[#4e5968] border-transparent hover:bg-gray-200"
                  }`}
                >
                  {count === 3 ? "3명 이상" : `${count}명`}
                </button>
              ))}
            </div>
          </div>

          {/* 임차보증금 입력 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#4e5968]">임차보증금 (전세가)</label>
              <span className="text-sm font-bold text-blue-600">
                {deposit >= 10000
                  ? `${(deposit / 10000).toFixed(1)}억 원`
                  : `${formatCurrency(deposit)}만 원`}
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                type="number"
                value={depositStr}
                onChange={(e) => setDepositStr(e.target.value)}
                className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-[#191f28] text-sm font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="예: 15000"
              />
              <span className="absolute right-4 text-xs font-medium text-[#8b95a1]">만원</span>
            </div>
            <input
              type="range"
              min="1000"
              max="40000"
              step="500"
              value={deposit}
              onChange={(e) => setDepositStr(e.target.value)}
              className="w-full mt-2 h-1.5 bg-[#e8f3ff] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-[#8b95a1]">
              <span>1,000만 원</span>
              <span>1.5억</span>
              <span>3억 (한도)</span>
              <span>4억</span>
            </div>
          </div>

          {/* 연소득 입력 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#4e5968]">부부합산 연소득</label>
              <span className="text-sm font-bold text-blue-600">
                {formatCurrency(income)}만 원
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                type="number"
                value={incomeStr}
                onChange={(e) => setIncomeStr(e.target.value)}
                className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-[#191f28] text-sm font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="예: 3500"
              />
              <span className="absolute right-4 text-xs font-medium text-[#8b95a1]">만원</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={income}
              onChange={(e) => setIncomeStr(e.target.value)}
              className="w-full mt-2 h-1.5 bg-[#e8f3ff] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-[#8b95a1]">
              <span>0원</span>
              <span>3,000만</span>
              <span>5,000만 (일반한도)</span>
              <span>7,500만 (신혼한도)</span>
              <span>1억</span>
            </div>
          </div>

          {/* 추가 우대사항 체크박스 */}
          <div className="pt-2 border-t border-gray-100 space-y-2.5">
            <label className="text-xs font-bold text-[#4e5968] block">금리 우대 조건</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsElectronicContract(!isElectronicContract)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium text-left flex justify-between items-center transition-all ${
                  isElectronicContract
                    ? "bg-[#e8f3ff] text-blue-600 border-blue-200"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                <span>부동산 전자계약 체결</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1 rounded">-0.1%</span>
              </button>

              <button
                type="button"
                onClick={() => setIsYoungPreferential(!isYoungPreferential)}
                disabled={familyType === "newlywed"}
                className={`py-2 px-3 rounded-xl border text-xs font-medium text-left flex justify-between items-center transition-all ${
                  familyType === "newlywed"
                    ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400"
                    : isYoungPreferential
                      ? "bg-[#e8f3ff] text-blue-600 border-blue-200"
                      : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                <span>소액 청년 우대 (자동판정)</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1 rounded">-0.3%</span>
              </button>
            </div>
            {isYoungPreferential && (
              <p className="text-[10px] text-green-600 font-semibold">
                ✓ 임차 5천 이하, 대출 5천 이하, 연소득 2천 이하 조건을 충족하여 0.3%p 소액 청년 우대금리가 적용됩니다.
              </p>
            )}
          </div>
        </div>

        {/* 결과 카드 */}
        <div className="mt-4 rounded-3xl bg-white p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          {analysis.isEligible ? (
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                  대출 가능 대상자 🎉
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-[#191f28]">대출 조건 판별 결과</h2>
              </div>

              {/* 주요 통계 피드백 */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#f8f9fa] rounded-2xl text-center">
                  <p className="text-[10px] text-[#8b95a1] font-semibold">최대 대출 한도 (80%)</p>
                  <p className="text-lg font-extrabold text-[#191f28] mt-1">
                    {formatCurrency(analysis.loanLimit)}만 원
                  </p>
                </div>
                <div className="p-3 bg-[#f8f9fa] rounded-2xl text-center">
                  <p className="text-[10px] text-[#8b95a1] font-semibold">최종 적용 금리</p>
                  <p className="text-lg font-extrabold text-blue-600 mt-1">
                    연 {analysis.finalRate.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* 월 지불액 가이드 */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/30 flex justify-between items-center">
                <div>
                  <p className="text-xs text-blue-600 font-bold">예상 월 이자 납입액</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">최대 대출 한도 실행 시</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-blue-700">
                    월 {formatCurrency(analysis.monthlyInterest)}원
                  </p>
                  <p className="text-[10px] text-[#8b95a1]">연 {formatCurrency(analysis.yearlyInterest)}원</p>
                </div>
              </div>

              {/* 금리 계산 세부정보 */}
              <div className="rounded-2xl border border-gray-100 p-4 text-xs space-y-2 bg-gray-50/50">
                <h3 className="font-bold text-gray-700">금리 산정 디테일</h3>
                <div className="flex justify-between text-gray-500">
                  <span>기본 금리</span>
                  <span>연 {analysis.baseRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>총 우대 금리 할인</span>
                  <span className="text-red-500">- 연 {analysis.preferentialRate.toFixed(2)}%p</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-dashed border-gray-200">
                  <span>최종 금리</span>
                  <span>연 {analysis.finalRate.toFixed(2)}%</span>
                </div>
              </div>

              {/* 상세 안내 및 한도 */}
              <div className="bg-[#fff8db]/60 p-4 rounded-2xl text-[11px] text-[#8b6a00] leading-relaxed border border-[#fff8db]">
                💡 **청년 버팀목 가이드**: 귀하의 조건에 따른 임차보증금 한도는 최대 3억 원이며, 대출은 최대 {analysis.maxAbsoluteLimit / 10000}억 원(신혼 3억, 일반 2억) 또는 보증금의 80% 중 더 낮은 금액까지 가능합니다.
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 text-xl">
                <AlertTriangle />
              </div>
              <h2 className="text-lg font-bold text-gray-900">대출 불가능 (부적격 대상)</h2>
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl text-xs text-left space-y-2 text-red-700">
                {analysis.reasons.map((reason, idx) => (
                  <p key={idx}>• {reason}</p>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed text-left">
                버팀목 전세대출은 서민 청년층을 지원하는 저금리 정책 상품으로, 일정 자산 기준(2026년 기준 약 3.45억 원 이하)을 초과하거나 소득 및 보증금 기준이 과도할 경우 신청할 수 없습니다. 
              </p>
            </div>
          )}
        </div>

        {/* 공유하기 레이아웃 */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-[rgba(0,27,55,0.05)] text-center space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-900">
              📊 내 전세대출 예상 한도 공유하기
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleKakaoShare}
              className="flex-1 h-11 rounded-xl bg-[#FEE500] text-[#191F28] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#FADA0A] transition-all active:scale-[0.98]"
            >
              <span>💬</span> 카카오톡 공유
            </button>
            <button
              onClick={handleShare}
              className={`flex-1 h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-[0.98] ${
                isCopied
                  ? "bg-[#e8f9f0] text-[#00c471] border border-[#00c471]/20"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isCopied ? <CheckCircle2 size={14} /> : <Share2 size={14} />}
              {isCopied ? "링크 복사 완료!" : "결과 링크 복사"}
            </button>
          </div>
        </div>

        {/* 구글 애드센스 */}
        <AdSenseSlot adFormat="auto" />

        {/* SEO 용 복지 정보 아티클 */}
        <article className="mt-8 p-5 bg-white rounded-3xl border border-gray-200 text-xs text-gray-600 leading-relaxed text-left">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1">
            <HelpCircle size={14} className="text-blue-600" />
            2026년 청년 전용 버팀목 전세자금대출 핵심 요약
          </h2>
          <p className="mb-2">
            청년 버팀목 전세자금대출은 만 19세 이상 34세 이하의 무주택 청년들에게 정부(주택도시기금)가 저금리로 전세 보증금을 지원하는 제도입니다.
          </p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li><strong>대상 요건</strong>: 만 19세~34세 이하 무주택 청년, 부부합산 자산 기준 3.45억 원 이하</li>
            <li><strong>보증금 한도</strong>: 3억 원 이하인 임차주택 (전용면적 85㎡ 이하)</li>
            <li><strong>대출 한도</strong>: 최대 2억 원 이하 (신혼가구 3억 원) 이내에서 임차보증금의 80% 이내</li>
            <li><strong>상환 방식</strong>: 만기일시상환 (기본 2년, 최대 4회 연장으로 10년 이용 가능)</li>
          </ul>
          <p>
            우대금리의 경우, 다자녀/신혼부부/전자계약/청년우대 등 중복 적용이 가능하지만 최종 적용 금리의 하한선은 연 1.0%로 고정됩니다. 대출 신청은 주택도시보증공사(HUG) 또는 한국주택금융공사(HF) 보증서를 담보로 시중 5대 은행(국민, 신한, 우리, 하나, 농협)에서 접수할 수 있습니다.
          </p>
        </article>

        {/* 구독 유도 */}
        <SubscribeCard defaultCategory="housing" />
      </div>
      <Footer />
    </main>
  );
}

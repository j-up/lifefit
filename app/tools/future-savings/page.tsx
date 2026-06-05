"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Info,
  Share2,
  ChevronRight,
  ChevronLeft,
  History,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

type Step = 1 | 2 | 3 | 4 | 5;

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

// 2026년 기준 중위소득 기준표 (월 소득 환산액)
const MEDIAN_INCOME_2026 = {
  1: { "100%": 2330000, "150%": 3495000, "200%": 4660000 },
  2: { "100%": 3870000, "150%": 5805000, "200%": 7740000, "250%": 9675000 },
  3: { "100%": 4970000, "150%": 7455000, "200%": 9940000 },
  4: { "100%": 6000000, "150%": 9000000, "200%": 12000000 },
  5: { "100%": 7030000, "150%": 10545000, "200%": 14060000 },
};

export default function FutureSavingsPage() {
  const [step, setStep] = useState<Step>(1);

  // Step 1: 나이 및 군필 여부
  const [birthYear, setBirthYear] = useState<string>("1996");
  const [birthMonth, setBirthMonth] = useState<string>("5");
  const [servedMilitary, setServedMilitary] = useState<boolean>(false);
  const [militaryMonths, setMilitaryMonths] = useState<string>("18");

  // Step 2: 소득 여부 및 소득 규모
  const [hasIncome, setHasIncome] = useState<boolean>(true);
  const [incomeType, setIncomeType] = useState<"salary" | "business" | "so-sang">("salary");
  const [incomeAmountStr, setIncomeAmountStr] = useState<string>("3200"); // 연 만원 단위
  const [isSmeNewHire, setIsSmeNewHire] = useState<boolean>(false); // 중소기업 신규취업자 여부

  // Step 3: 가구원 수 및 가구 소득
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [householdIncomeTier, setHouseholdIncomeTier] = useState<"low" | "medium" | "high">("low"); // low: 150%이하, medium: 150%~200%(2인가구 250%), high: 초과

  // Step 4: 납입액 및 금리 시뮬레이션
  const [monthlySavingsStr, setMonthlySavingsStr] = useState<string>("50"); // 월 만원 단위 (최대 50만 원)
  const [bankRateStr, setBankRateStr] = useState<string>("4.5"); // 시중 은행 금리

  // 공유 상태 및 토스트 알림
  const [isSharedResult, setIsSharedResult] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  // 로컬 스토리지 데이터 로드/저장
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_future_savings_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  // 공유 링크 공유 처리
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const by = params.get("by");
      const bm = params.get("bm");
      const mil = params.get("mil");
      const milm = params.get("milm");
      const inc = params.get("inc");
      const inct = params.get("inct");
      const inca = params.get("inca");
      const sme = params.get("sme");
      const hh = params.get("hh");
      const hht = params.get("hht");
      const ms = params.get("ms");
      const br = params.get("br");

      if (by && bm && ms && br) {
        setBirthYear(by);
        setBirthMonth(bm);
        setServedMilitary(mil === "y");
        setMilitaryMonths(milm || "18");
        setHasIncome(inc === "y");
        setIncomeType((inct as any) || "salary");
        setIncomeAmountStr(inca || "3200");
        setIsSmeNewHire(sme === "y");
        setHouseholdSize(parseInt(hh || "2", 10));
        setHouseholdIncomeTier((hht as any) || "low");
        setMonthlySavingsStr(ms);
        setBankRateStr(br);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const saveToHistory = () => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        birthYear,
        birthMonth,
        servedMilitary,
        militaryMonths,
        hasIncome,
        incomeType,
        incomeAmountStr,
        isSmeNewHire,
        householdSize,
        householdIncomeTier,
        monthlySavingsStr,
        bankRateStr,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_future_savings_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_future_savings_history");
        if (saved) {
          const p = JSON.parse(saved);
          setBirthYear(p.birthYear || "1996");
          setBirthMonth(p.birthMonth || "5");
          setServedMilitary(!!p.servedMilitary);
          setMilitaryMonths(p.militaryMonths || "18");
          setHasIncome(p.hasIncome !== false);
          setIncomeType(p.incomeType || "salary");
          setIncomeAmountStr(p.incomeAmountStr || "3200");
          setIsSmeNewHire(!!p.isSmeNewHire);
          setHouseholdSize(p.householdSize || 2);
          setHouseholdIncomeTier(p.householdIncomeTier || "low");
          setMonthlySavingsStr(p.monthlySavingsStr || "50");
          setBankRateStr(p.bankRateStr || "4.5");
          setStep(5);
          showToastNotification("이전 계산 기록을 불러왔습니다!");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 만 나이 계산 로직 (2026년 기준)
  const calculatedAge = useMemo(() => {
    const currentYear = 2026;
    const currentMonth = 5; // 2026년 5월 기준
    const year = parseInt(birthYear, 10);
    const month = parseInt(birthMonth, 10);

    let baseAge = currentYear - year;
    if (currentMonth < month) {
      baseAge -= 1; // 생일 안 지남
    }

    // 군 복무 기간 차감 (개월 수 환산 연도)
    if (servedMilitary) {
      const milMonths = parseInt(militaryMonths, 10) || 0;
      const milYears = milMonths / 12;
      // 최대 6년 차감 제한
      const deduction = Math.min(milYears, 6);
      return Math.max(baseAge - deduction, 0);
    }

    return baseAge;
  }, [birthYear, birthMonth, servedMilitary, militaryMonths]);

  // 가입 유형 판별
  const eligibility = useMemo(() => {
    // 1. 소득 없음 판별
    if (!hasIncome) {
      return {
        status: "ineligible_no_income" as const,
        title: "가입 불가",
        desc: "소득이 없는 청년은 가입 대상에서 제외됩니다. (부모 자금 우회 지원 방지)",
        matchingRate: 0,
      };
    }

    // 2. 나이 기준 판별
    // 만 19세 ~ 34세 이하 대상 (단, 2026년 1월~8월에 만 35세가 되는 청년 예외 허용 로직)
    const isAgeEligible =
      (calculatedAge >= 19 && calculatedAge <= 34) ||
      (calculatedAge === 35 && parseInt(birthMonth, 10) >= 1 && parseInt(birthMonth, 10) <= 8);

    if (!isAgeEligible) {
      return {
        status: "ineligible_age" as const,
        title: "가입 불가 (나이 제한)",
        desc: `만 나이가 만 ${Math.floor(calculatedAge)}세로 가입 연령(만 19~34세)을 초과했습니다.`,
        matchingRate: 0,
      };
    }

    // 3. 소득 규모 수치 파악
    const incomeVal = parseInt(incomeAmountStr, 10) || 0;

    // 중소기업 신규 취업자(6개월 이내)이면 다른 조건이 맞아도 우대형(12%) 적용
    if (isSmeNewHire && incomeVal <= 6000) {
      return {
        status: "preferred" as const,
        title: "우대형 (기여금 12% + 비과세)",
        desc: "중소기업 신규취업자로 선정되어 최대 12% 기여금과 이자 비과세 혜택을 받습니다!",
        matchingRate: 0.12,
      };
    }

    // 우대형 조건:
    // 근로소득 총급여 3,600만 이하 / 종합소득 2,600만 이하 / 소상공인 매출 1억 이하
    // AND 가구 소득 150% 이하 (2인 가구는 200% 이하)
    const isPreferredIncome =
      (incomeType === "salary" && incomeVal <= 3600) ||
      (incomeType === "business" && incomeVal <= 2600) ||
      (incomeType === "so-sang" && incomeVal <= 10000);

    const isPreferredHousehold =
      householdIncomeTier === "low" || (householdSize === 2 && householdIncomeTier === "medium");

    if (isPreferredIncome && isPreferredHousehold) {
      return {
        status: "preferred" as const,
        title: "우대형 (기여금 12% + 비과세)",
        desc: "소득 및 가구 요건을 완벽히 만족하여 12% 기여금 매칭과 이자 비과세 혜택을 받습니다.",
        matchingRate: 0.12,
      };
    }

    // 일반형 조건:
    // 근로소득 총급여 6,000만 이하 / 종합소득 4,800만 이하 / 소상공인 매출 3억 이하
    // AND 가구 소득 200% 이하 (2인 가구는 250% 이하)
    const isGeneralIncome =
      (incomeType === "salary" && incomeVal <= 6000) ||
      (incomeType === "business" && incomeVal <= 4800) ||
      (incomeType === "so-sang" && incomeVal <= 30000);

    const isGeneralHousehold =
      householdIncomeTier === "low" || householdIncomeTier === "medium";

    if (isGeneralIncome && isGeneralHousehold) {
      return {
        status: "general" as const,
        title: "일반형 (기여금 6% + 비과세)",
        desc: "안정적인 직장인/사업자 조건으로 6%의 정부 기여금과 이자 비과세 혜택을 받습니다.",
        matchingRate: 0.06,
      };
    }

    // 비과세 전용 조건:
    // 근로소득 총급여 6,000만 초과 7,500만 이하 / 종합소득 4,800만 초과 6,300만 이하
    const isTaxFreeOnlyIncome =
      (incomeType === "salary" && incomeVal > 6000 && incomeVal <= 7500) ||
      (incomeType === "business" && incomeVal > 4800 && incomeVal <= 6300);

    if (isTaxFreeOnlyIncome) {
      return {
        status: "tax_free_only" as const,
        title: "비과세 전용 (기여금 미지급)",
        desc: "소득 규모가 다소 높아 정부 기여금은 없지만, 이자소득 비과세(15.4% 면제) 혜택을 받습니다.",
        matchingRate: 0,
      };
    }

    // 모두 초과
    return {
      status: "ineligible_income" as const,
      title: "가입 불가 (소득 기준 초과)",
      desc: "정해진 소득 한도를 초과하여 아쉽게도 본 상품의 가입 대상이 아닙니다.",
      matchingRate: 0,
    };
  }, [hasIncome, calculatedAge, birthMonth, incomeAmountStr, isSmeNewHire, incomeType, householdIncomeTier, householdSize]);

  // 시뮬레이션 계산
  const results = useMemo(() => {
    const monthlySavings = (parseInt(monthlySavingsStr, 10) || 0) * 10000; // 원
    const bankRate = parseFloat(bankRateStr) || 0; // %
    const months = 36; // 3년 고정

    const totalPrincipal = monthlySavings * months;

    // 3년 만기 적금 이자 계산 (적립식 단리 공식)
    // 원금 * 이자율/100 * n(n+1)/24
    const bankInterestRaw = monthlySavings * (bankRate / 100) * ((months * (months + 1)) / 24);

    // 일반 적금일 경우 15.4% 과세 후 이자
    const normalTax = bankInterestRaw * 0.154;
    const normalNetInterest = bankInterestRaw * (1 - 0.154);

    // 청년미래적금은 비과세이므로 세전 이자를 고스란히 받음
    const actualBankInterest = bankInterestRaw;
    const taxSaved = normalTax; // 비과세 혜택으로 아낀 세금

    // 정부 기여금 계산
    const govContribution = monthlySavings * eligibility.matchingRate * months;

    // 최종 만기 수령액
    const finalAmount = totalPrincipal + actualBankInterest + govContribution;

    // 총 수익금
    const totalBenefit = actualBankInterest + govContribution;

    // 일반 적금 기준 실질 단리 환산 이율 계산 (X)
    // totalBenefit = monthlySavings * (X / 100) * 55.5 * 0.846
    // X = totalBenefit / (monthlySavings * 55.5 * 0.846) * 100
    const weight = (months * (months + 1)) / 24; // 36개월 기준 55.5
    const netWeight = weight * (1 - 0.154); // 일반 과세 계수: 46.953
    let effectiveRate = 0;
    if (monthlySavings > 0) {
      effectiveRate = (totalBenefit / (monthlySavings * netWeight)) * 100;
    }

    return {
      totalPrincipal,
      normalNetInterest,
      actualBankInterest,
      taxSaved,
      govContribution,
      finalAmount,
      totalBenefit,
      effectiveRate,
    };
  }, [monthlySavingsStr, bankRateStr, eligibility.matchingRate]);

  const canProceed = () => {
    if (step === 1) return birthYear !== "" && birthMonth !== "";
    if (step === 2) {
      if (!hasIncome) return false;
      return incomeAmountStr !== "";
    }
    if (step === 3) return true;
    if (step === 4) return monthlySavingsStr !== "" && bankRateStr !== "";
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 5) {
      saveToHistory();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleShare = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 청년미래적금 계산 결과 💰\n자격: ${eligibility.title}\n월 ${monthlySavingsStr}만 원 3년 납입 시\n최종 수령액: 약 ${formatCurrency(results.finalAmount)}원 (실질금리 효과 연 ${results.effectiveRate.toFixed(1)}%)`;
    const shareUrl = `https://lifefit.kr/tools/future-savings?by=${birthYear}&bm=${birthMonth}&mil=${servedMilitary ? "y" : "n"}&milm=${militaryMonths}&inc=${hasIncome ? "y" : "n"}&inct=${incomeType}&inca=${incomeAmountStr}&sme=${isSmeNewHire ? "y" : "n"}&hh=${householdSize}&hht=${householdIncomeTier}&ms=${monthlySavingsStr}&br=${bankRateStr}`;
    const fullText = `${resultText}\n\n👉 내 가입자격 및 혜택 1분 만에 계산하기:\n${shareUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 청년미래적금 계산기 💰",
          text: resultText,
          url: shareUrl,
        });
        showToastNotification("공유가 완료되었습니다!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Web Share API error:", err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("결과 링크가 복사되었습니다! 친구에게 공유해 보세요.");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToastNotification("❌ 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (!results) return;
    const shareUrl = `https://lifefit.kr/tools/future-savings?by=${birthYear}&bm=${birthMonth}&mil=${servedMilitary ? "y" : "n"}&milm=${militaryMonths}&inc=${hasIncome ? "y" : "n"}&inct=${incomeType}&inca=${incomeAmountStr}&sme=${isSmeNewHire ? "y" : "n"}&hh=${householdSize}&hht=${householdIncomeTier}&ms=${monthlySavingsStr}&br=${bankRateStr}`;
    shareToKakao({
      title: `청년미래적금 3년 만기 수령액 확인 💰`,
      description: `비교 결과: ${eligibility.title}. 납입금 대비 최종 수령액은 약 ${formatCurrency(results.finalAmount)}원(실질 단리 연 ${results.effectiveRate.toFixed(1)}% 효과)입니다!`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 만기수령액 계산하기",
      url: shareUrl,
    });
  };

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 pt-6 pb-28 sm:pt-10 sm:pb-20">
      {/* 구조화 데이터 스키마 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "청년미래적금 자격 판별 및 만기 수령액 계산기",
            url: "https://lifefit.kr/tools/future-savings",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "2026년 신설 청년미래적금의 우대형/일반형 자격 조건 자동 판별 및 정부 매칭 기여금, 이자소득 비과세 만기 시 수령액 모의 시뮬레이션",
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
                name: "청년미래적금 계산기",
                item: "https://lifefit.kr/tools/future-savings",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "청년미래적금 가입 대상은 누구인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "만 19세 이상 34세 이하 청년 중 소득이 있는 자가 대상입니다. 군 복무 기간이 있을 경우 그 기간만큼 만 나이 계산 시 차감되어 가입 연령이 연장됩니다. 소득이 없는 사람은 가입이 차단됩니다."
                }
              },
              {
                "@type": "Question",
                "name": "청년미래적금의 주요 혜택과 이율 우대 조건은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "월 최대 50만 원 한도로 3년간 납입 가능하며, 가구 중위소득 150% 이하 조건 충족 여부에 따라 기여금 매칭률이 6% 또는 12%로 차등 적용되고 이자소득 비과세 혜택이 주어집니다."
                }
              }
            ]
          }),
        }}
      />
      
      <div className="w-full max-w-[420px]">
        {/* 상단 네비게이션 */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors"
          >
            ← 메인으로
          </Link>
        </div>

        {/* 타이틀 및 헤더 */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3182f6] text-white mb-3 shadow-lg">
            <TrendingUp size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            청년미래적금 계산기
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            내 조건으로 자격 판별부터 만기 금액 시뮬레이션까지
          </p>
        </div>

        {/* 진행 막대 */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e8eb]">
          <div
            className="h-full rounded-full bg-[#3182f6] transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* 마법사 카드 본체 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              {hasHistory && (
                <button
                  onClick={loadHistory}
                  className="w-full h-11 rounded-2xl bg-blue-50/70 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100/70 transition-all active:scale-[0.98] border border-blue-100/50"
                >
                  <History size={14} />
                  이전 계산 기록 불러오기
                </button>
              )}
              
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">출생 연도와 월을 알려주세요</h2>
                <p className="text-xs text-[#8b95a1]">정확한 만 나이 계산 및 가입자격 검증에 활용됩니다.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#4e5968] mb-1.5 pl-1">출생 연도</label>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-[#f2f4f6] text-[#191f28] font-semibold border-none outline-none focus:ring-2 focus:ring-[#3182f6]"
                  >
                    {Array.from({ length: 45 }, (_, i) => 2012 - i).map((yr) => (
                      <option key={yr} value={yr}>{yr}년</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4e5968] mb-1.5 pl-1">출생 월</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-[#f2f4f6] text-[#191f28] font-semibold border-none outline-none focus:ring-2 focus:ring-[#3182f6]"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}월</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 군필 여부 섹션 */}
              <div className="pt-4 border-t border-[#f2f4f6]">
                <label className="block text-sm font-bold text-[#191f28] mb-3">군 복무를 이행하셨나요?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setServedMilitary(true)}
                    className={`py-3.5 rounded-xl border-2 font-bold text-sm transition-all ${
                      servedMilitary
                        ? "border-[#3182f6] bg-[#e8f3ff] text-[#3182f6]"
                        : "border-[#e5e8eb] bg-white text-[#4e5968]"
                    }`}
                  >
                    예 (군필)
                  </button>
                  <button
                    onClick={() => setServedMilitary(false)}
                    className={`py-3.5 rounded-xl border-2 font-bold text-sm transition-all ${
                      !servedMilitary
                        ? "border-[#3182f6] bg-[#e8f3ff] text-[#3182f6]"
                        : "border-[#e5e8eb] bg-white text-[#4e5968]"
                    }`}
                  >
                    아니오 (미필/해당없음)
                  </button>
                </div>

                {servedMilitary && (
                  <div className="mt-4 animate-fade-in">
                    <label className="block text-xs font-bold text-[#4e5968] mb-1.5">실제 군 복무 개월 수 (최대 6년 연장 가능)</label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={militaryMonths}
                        onChange={(e) => setMilitaryMonths(e.target.value)}
                        placeholder="예: 18"
                        className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-[#191f28] font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8b95a1] font-semibold">개월</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">소득 종류와 연 소득을 알려주세요</h2>
                <p className="text-xs text-[#8b95a1]">정부 매칭 자격 검증을 위해 반드시 필요합니다.</p>
              </div>

              {/* 소득 유무 */}
              <div className="flex gap-4">
                <button
                  onClick={() => setHasIncome(true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    hasIncome
                      ? "border-[#3182f6] bg-[#e8f3ff] text-[#3182f6]"
                      : "border-[#e5e8eb] bg-white text-[#4e5968]"
                  }`}
                >
                  소득이 있습니다
                </button>
                <button
                  onClick={() => setHasIncome(false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    !hasIncome
                      ? "border-[#ff4d4f] bg-red-50 text-[#ff4d4f]"
                      : "border-[#e5e8eb] bg-white text-[#4e5968]"
                  }`}
                >
                  현재 무소득입니다
                </button>
              </div>

              {hasIncome ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#4e5968] mb-2">어떤 성격의 소득인가요?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { type: "salary", label: "근로소득" },
                        { type: "business", label: "종합소득" },
                        { type: "so-sang", label: "소상공인" },
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => {
                            setIncomeType(item.type as any);
                            setIncomeAmountStr(item.type === "salary" ? "3200" : item.type === "business" ? "2400" : "8000");
                          }}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            incomeType === item.type
                              ? "bg-[#3182f6] text-white shadow-sm"
                              : "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4e5968] mb-2">
                      {incomeType === "salary" && "본인의 연간 총급여액"}
                      {incomeType === "business" && "본인의 연간 종합소득금액"}
                      {incomeType === "so-sang" && "본인 소상공인 연 매출액"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={incomeAmountStr}
                        onChange={(e) => setIncomeAmountStr(e.target.value)}
                        className="w-full h-12 pl-4 pr-16 rounded-xl bg-[#f2f4f6] text-[#191f28] font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8b95a1] font-semibold">만원</span>
                    </div>
                    
                    {/* 빠른 입력 버튼 */}
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {incomeType === "salary" && [2400, 3600, 4800, 6000, 7500].map((val) => (
                        <button
                          key={val}
                          onClick={() => setIncomeAmountStr(String(val))}
                          className="px-2.5 py-1.5 rounded-lg bg-[#f2f4f6] text-[10px] text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                        >
                          {val === 7500 ? "7500만(상한)" : `${val}만`}
                        </button>
                      ))}
                      {incomeType === "business" && [2000, 2600, 3600, 4800, 6300].map((val) => (
                        <button
                          key={val}
                          onClick={() => setIncomeAmountStr(String(val))}
                          className="px-2.5 py-1.5 rounded-lg bg-[#f2f4f6] text-[10px] text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                        >
                          {val}만
                        </button>
                      ))}
                      {incomeType === "so-sang" && [5000, 10000, 20000, 30000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setIncomeAmountStr(String(val))}
                          className="px-2.5 py-1.5 rounded-lg bg-[#f2f4f6] text-[10px] text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                        >
                          {val === 30000 ? "3억(상한)" : `${val / 10000}억`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 중소기업 신규 취업 특례 */}
                  <div className="pt-4 border-t border-[#f2f4f6] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#191f28]">중소기업 신규 취업 우대 특례</p>
                      <p className="text-[10px] text-[#8b95a1] mt-0.5">입사 6개월 이내 중소기업 청년 근로자인가요?</p>
                    </div>
                    <button
                      onClick={() => setIsSmeNewHire(!isSmeNewHire)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSmeNewHire
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "bg-gray-50 text-gray-400 border border-gray-200"
                      }`}
                    >
                      {isSmeNewHire ? "선택됨" : "아님"}
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs leading-relaxed space-y-2 animate-fade-in border border-red-100">
                  <p className="font-bold flex items-center gap-1">
                    <XCircle size={14} /> 소득이 없으신가요?
                  </p>
                  <p>
                    청년미래적금은 근로 의욕 고취와 건전한 목돈 마련을 목표로 하므로, 소득세 신고 내역이 존재하는 청년만을 가입 대상으로 합니다.
                  </p>
                  <p>
                    부모 등의 타인 자금을 대리 납입하는 행위를 원천 차단하기 위한 필수 요건입니다. 아르바이트(근로소득 신고분)나 프리랜서(종합소득 3.3% 원천징수분) 등의 소득 신고 사실이 있다면 가능합니다.
                  </p>
                </div>
              )}

            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">우리 집 가구 소득 규모는 어떤가요?</h2>
                <p className="text-xs text-[#8b95a1]">가구 중위소득 기준에 따라 매칭비율이 달라집니다.</p>
              </div>

              {/* 가구원 수 */}
              <div>
                <label className="block text-xs font-bold text-[#4e5968] mb-2">가구원 수 (본인 포함 주민등록등본 기준)</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setHouseholdSize(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        householdSize === num
                          ? "bg-[#3182f6] text-white"
                          : "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]"
                      }`}
                    >
                      {num === 5 ? "5인+" : `${num}인`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 중위소득 선택 */}
              <div className="pt-2 border-t border-[#f2f4f6]">
                <label className="block text-xs font-bold text-[#4e5968] mb-3">가구의 월평균 총소득 수준</label>
                <div className="space-y-3">
                  {[
                    {
                      tier: "low" as const,
                      label: `중위소득 150% 이하`,
                      desc: householdSize === 2 
                        ? `월 약 580만 원 이하 (2인 가구 특례 기준)`
                        : `월 약 ${formatCurrency(MEDIAN_INCOME_2026[householdSize as keyof typeof MEDIAN_INCOME_2026]?.["150%"] || 0)}원 이하`,
                      badge: "우대형 기여금 (12%)"
                    },
                    {
                      tier: "medium" as const,
                      label: `중위소득 150% 초과 ~ 200% 이하`,
                      desc: householdSize === 2 
                        ? `월 약 580만 ~ 774만 원 이하`
                        : `월 약 ${formatCurrency(MEDIAN_INCOME_2026[householdSize as keyof typeof MEDIAN_INCOME_2026]?.["150%"] || 0)}원 ~ ${formatCurrency(MEDIAN_INCOME_2026[householdSize as keyof typeof MEDIAN_INCOME_2026]?.["200%"] || 0)}원 이하`,
                      badge: householdSize === 2 ? "우대형 특례(12%)" : "일반형 기여금 (6%)"
                    },
                    {
                      tier: "high" as const,
                      label: "중위소득 200% 초과",
                      desc: "소득 기준보다 많이 버는 경우",
                      badge: "비과세 혜택만 가능"
                    }
                  ].map((item) => (
                    <button
                      key={item.tier}
                      onClick={() => setHouseholdIncomeTier(item.tier)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        householdIncomeTier === item.tier
                          ? "border-[#3182f6] bg-[#e8f3ff]"
                          : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`font-bold text-sm ${householdIncomeTier === item.tier ? "text-[#3182f6]" : "text-[#191f28]"}`}>
                          {item.label}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          householdIncomeTier === item.tier 
                            ? "bg-blue-500 text-white" 
                            : "bg-[#f2f4f6] text-[#4e5968]"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8b95a1] mt-1.5">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">원하시는 납입 플랜을 설정하세요</h2>
                <p className="text-xs text-[#8b95a1]">3년 동안 매달 저금할 금액과 은행 금리를 모의 입력해 보세요.</p>
              </div>

              {/* 월 납입 금액 */}
              <div>
                <label className="block text-xs font-bold text-[#4e5968] mb-2">월 저축 금액 (한도 월 50만 원)</label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={monthlySavingsStr}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (parseInt(v, 10) > 50) setMonthlySavingsStr("50");
                      else setMonthlySavingsStr(v);
                    }}
                    placeholder="최대 50"
                    className="w-full h-12 pl-4 pr-16 rounded-xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8b95a1] font-semibold">만원</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[10, 20, 30, 40, 50].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMonthlySavingsStr(String(val))}
                      className="flex-1 py-2 rounded-xl bg-[#f2f4f6] text-xs font-bold text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                    >
                      {val === 50 ? "50만(최대)" : `${val}만`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 은행 금리 */}
              <div className="pt-4 border-t border-[#f2f4f6]">
                <label className="block text-xs font-bold text-[#4e5968] mb-2">가정할 은행 기본 금리 (세전 연이율)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    value={bankRateStr}
                    onChange={(e) => setBankRateStr(e.target.value)}
                    placeholder="예: 4.5"
                    className="w-full h-12 pl-4 pr-16 rounded-xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8b95a1] font-semibold">%</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[3.5, 4.0, 4.5, 5.0].map((val) => (
                    <button
                      key={val}
                      onClick={() => setBankRateStr(String(val))}
                      className="flex-1 py-2 rounded-xl bg-[#f2f4f6] text-xs font-bold text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {step === 5 && results && (
            <div className="animate-fade-in space-y-6">
              
              {isSharedResult && (
                <div className="w-full rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800 border border-blue-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 청년미래적금 시뮬레이션입니다!
                </div>
              )}

              {/* 판별 결과 헤더 */}
              <div className="text-center pb-2">
                <p className="text-xs text-[#8b95a1] font-semibold">청년미래적금 자격 확인 결과</p>
                <h2 className={`text-2xl font-black mt-1 ${
                  eligibility.status.startsWith("ineligible") ? "text-red-500" : "text-[#3182f6]"
                }`}>
                  {eligibility.title}
                </h2>
                <p className="text-xs text-[#4e5968] mt-2 px-4 leading-relaxed">
                  {eligibility.desc}
                </p>
              </div>

              {/* 메인 결과 박스 (Toss 풍 프리미엄 만기 수령 요약) */}
              <div className={`rounded-3xl p-6 text-white shadow-xl ${
                eligibility.status.startsWith("ineligible")
                  ? "bg-gradient-to-br from-gray-500 to-gray-700 shadow-gray-100"
                  : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-indigo-100"
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-blue-100/80 text-xs font-medium mb-1">총 납입 원금 (3년)</p>
                    <p className="text-2xl font-black">{formatCurrency(results.totalPrincipal)}원</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100/80 text-xs font-medium mb-1">가입 기간</p>
                    <p className="text-sm font-bold">36개월</p>
                  </div>
                </div>

                {!eligibility.status.startsWith("ineligible") && (
                  <div className="pt-4 border-t border-white/20 space-y-2">
                    <div className="flex justify-between text-xs text-blue-100/90">
                      <span>은행 이자 (비과세)</span>
                      <span className="font-bold">+{formatCurrency(results.actualBankInterest)}원</span>
                    </div>
                    {results.govContribution > 0 && (
                      <div className="flex justify-between text-xs text-blue-100/90">
                        <span>정부 매칭 기여금 ({eligibility.matchingRate * 100}%)</span>
                        <span className="font-bold">+{formatCurrency(results.govContribution)}원</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                      <span className="text-xs font-bold text-blue-100">만기 예상 실수령액</span>
                      <span className="text-3xl font-black leading-none">{formatCurrency(results.finalAmount)}원</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 혜택 상세 카드 */}
              {!eligibility.status.startsWith("ineligible") && (
                <div className="space-y-4">
                  <h3 className="font-bold text-[#191f28] flex items-center gap-2 pl-1">
                    <TrendingUp size={20} className="text-[#3182f6]" />
                    일반 적금과 혜택 비교
                  </h3>

                  {/* 이율 막대 시각화 */}
                  <div className="p-5 rounded-2xl border border-[#e5e8eb] bg-[#f8f9fa] space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#4e5968] mb-1">
                        <span>시중 기본 은행 금리</span>
                        <span>연 {bankRateStr}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#e5e8eb] overflow-hidden">
                        <div className="h-full bg-gray-400" style={{ width: `${Math.min((parseFloat(bankRateStr) / 16) * 100, 100)}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-blue-600 mb-1">
                        <span>LifeFit 실질 체감 이율 (일반적금 단리 환산)</span>
                        <span className="text-sm font-black">연 {results.effectiveRate.toFixed(1)}% 효과!</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-blue-100 overflow-hidden">
                        <div className="h-full bg-[#3182f6] rounded-full" style={{ width: `${Math.min((results.effectiveRate / 16) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#4e5968] bg-[#f2f4f6] p-4 rounded-2xl leading-relaxed">
                    <p className="font-bold text-[#191f28] text-sm">💡 어떻게 이런 금리가 나오나요?</p>
                    <ul className="list-disc pl-4 space-y-1.5 mt-1.5">
                      <li>
                        <strong>비과세로 아낀 이자소득세:</strong> 일반 적금(15.4% 과세)에선 나가는 이자 소득세 <strong className="text-blue-600">{formatCurrency(results.taxSaved)}원</strong>이 전액 세이브됩니다.
                      </li>
                      {results.govContribution > 0 && (
                        <li>
                          <strong>정부가 얹어주는 정부 기여금:</strong> 만기 시 현금으로 즉시 매칭 수령하는 기여금 <strong className="text-blue-600">{formatCurrency(results.govContribution)}원</strong>이 통장 잔고에 다이렉트로 가산됩니다.
                        </li>
                      )}
                      <li>
                        따라서 세금을 다 떼는 일반 은행 적금으로 이만큼의 만기 금액을 받으려면 무려 <strong className="text-blue-600">연 {results.effectiveRate.toFixed(1)}%짜리</strong> 고금리 적금에 가입하는 것과 완전히 동일한 경제적 가치를 가집니다.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 구글 애드센스 슬롯 */}
              <AdSenseSlot adFormat="auto" />

            </div>
          )}

          {/* 이전/다음 단계 버튼 */}
          <div className="flex items-center gap-3 mt-8">
            {step > 1 && step < 5 && (
              <button
                onClick={prevStep}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {step < 5 && (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-1 transition-all ${
                  canProceed()
                    ? "bg-[#3182f6] text-white shadow-md hover:bg-[#1e6fdb]"
                    : "bg-[#e5e8eb] text-[#b0b8c1] cursor-not-allowed"
                }`}
              >
                다음
                <ChevronRight size={18} />
              </button>
            )}

            {step === 5 && (
              <div className="w-full mt-4 pt-6 border-t border-[#f2f4f6] space-y-4 text-center">
                <div>
                  <p className="text-sm font-bold text-[#191f28]">
                    🎉 내 판별 결과 주변에 공유하기
                  </p>
                  <p className="text-xs text-[#8b95a1] mt-1">
                    친구들도 청년미래적금 가입 대상인지 확인해 볼 수 있게 알려주세요!
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  {!eligibility.status.startsWith("ineligible") && (
                    <div className="flex gap-2 w-full">
                      {/* 카카오톡 공유 버튼 */}
                      <button
                        onClick={handleKakaoShare}
                        className="flex-1 h-12 rounded-2xl bg-[#FEE500] text-[#191F28] font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-[#FADA0A] transition-all active:scale-[0.98]"
                      >
                        <span className="text-base">💬</span>
                        카카오톡 공유
                      </button>

                      {/* 링크 복사 버튼 */}
                      <button
                        onClick={handleShare}
                        className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                          isCopied
                            ? "bg-[#e8f9f0] text-[#00c471] border border-[#00c471]/20"
                            : "bg-[#3182f6] text-white hover:bg-[#1e6fdb] shadow-md shadow-blue-100"
                        }`}
                      >
                        {isCopied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
                        {isCopied ? "링크 복사 완료!" : "결과 링크 복사"}
                      </button>
                    </div>
                  )}

                  {/* 다시 계산하기 버튼 */}
                  <button
                    onClick={() => {
                      setStep(1);
                      setBirthYear("1996");
                      setBirthMonth("5");
                      setServedMilitary(false);
                      setMilitaryMonths("18");
                      setHasIncome(true);
                      setIncomeType("salary");
                      setIncomeAmountStr("3200");
                      setIsSmeNewHire(false);
                      setHouseholdSize(2);
                      setHouseholdIncomeTier("low");
                      setIsSharedResult(false);
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, "", window.location.pathname);
                      }
                    }}
                    className="w-full h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-[#e5e8eb] transition-all active:scale-[0.98]"
                  >
                    <History size={16} />
                    {isSharedResult ? "나도 해보기" : "다시 하기"}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 하단 안내 가이드 */}
        <div className="mt-6 p-4 bg-[#fff8db] rounded-2xl">
          <p className="font-bold text-xs text-[#8b6a00] flex items-center gap-1 mb-1">
            <Info size={14} /> 청년미래적금 핵심 팩트 시트
          </p>
          <ul className="text-[11px] text-[#8b6a00] list-disc pl-4 space-y-1">
            <li>
              <strong>가입 대상:</strong> 만 19세 ~ 34세 청년 중 소득이 있는 자 (군 복무 기간은 만 나이 계산 시 차감).
            </li>
            <li>
              <strong>혜택 형태:</strong> 월 50만 원 한도, 3년 납입 시 정부 매칭 기여금 + 비과세 혜택 제공.
            </li>
            <li>
              <strong>우대 vs 일반:</strong> 본인 소득 수준 및 가구 중위소득 수준(150% 이하)에 따라 기여금 매칭률이 12%와 6%로 나뉩니다.
            </li>
            <li>
              <strong>소득 요건:</strong> 무소득자는 부모 등 타인을 통한 우회 가입 우려로 인해 가입이 차단됩니다.
            </li>
          </ul>
        </div>

        {/* SEO 용 텍스트 아티클 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            2026 청년미래적금으로 똑똑하게 돈 모으기
          </h2>
          <p className="mb-2">
            <strong>청년미래적금</strong>은 자산을 형성하기에 불리한 청년 세대에게 초고금리 수준의 목돈을 만들어주기 위해 기획된 최고 수준의 금융 정책 상품입니다. 연 최대 12%의 추가 기여금 매칭과 이자소득세 15.4%를 완전히 면제해 주므로 시중 그 어떤 금융 상품보다 유리합니다.
          </p>
          <p className="mb-2">
            본 계산기는 유저의 생년월일과 세후 소득, 그리고 가구의 중위소득 기준을 바탕으로 우대형과 일반형 중 어떤 유형으로 가입이 가능한지 실시간 시뮬레이션을 제공합니다. 중소기업에 신규 취업한 지 6개월 이내인 분들은 총급여 요건만 만족할 시 중위소득 요건과 무관하게 즉시 <strong>우대형 가입자격</strong>이 주어집니다.
          </p>
          <p>
            또한, 복잡한 비과세 효과와 매칭 기여금 금액을 단리 금리로 직접 환산하여 내 세전 적금 금리가 실제로 몇 % 수준의 효과를 발휘하는지 직관적으로 분석해 드립니다. 2026년 여름, 청년 자산 형성을 위한 완벽한 플래닝을 지금 시작해 보세요.
          </p>
        </article>
      </div>

      {step === 5 && (
        <SubscribeCard defaultCategory="saving" />
      )}

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#191f28] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-toast text-center whitespace-nowrap border border-[rgba(255,255,255,0.1)]">
          <span>💬</span>
          {toastMessage}
        </div>
      )}
      <Footer />
    </main>
  );
}

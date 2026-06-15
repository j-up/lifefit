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
  ArrowRight,
  ArrowLeft,
  Search,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

// 2026 Urban worker average monthly income standards (won)
const INCOME_STANDARDS = {
  1: 4022968,
  2: 5894121,
  3: 7192033,
  4: 8243685,
  5: 8783424,
};

export default function LhRentPage() {
  // Step-by-step state
  const [step, setStep] = useState<number>(0); // 0: intro, 1: age/homeless, 2: 1st priority check, 3: 2nd priority (family income/assets), 4: 3rd priority (my income/assets), 5: result

  // Step 1: Base eligibility
  const [isYouthOrStudent, setIsYouthOrStudent] = useState<boolean | null>(null);
  const [isHomeless, setIsHomeless] = useState<boolean | null>(null);

  // Step 2: 1st Priority
  const [isFirstPriorityType, setIsFirstPriorityType] = useState<boolean | null>(null); // 수급자, 한부모, 차상위 해당 여부

  // Step 3: 2nd Priority (Parents + Self)
  const [familySize, setFamilySize] = useState<number>(3); // 가구원수
  const [familyIncomeStr, setFamilyIncomeStr] = useState<string>("500"); // 만원 단위 (부모+본인 월평균 소득)
  const [familyAssetOk, setFamilyAssetOk] = useState<boolean | null>(null); // 자산 3.45억, 자동차 3,708만 이하

  // Step 4: 3rd Priority (Self)
  const [myIncomeStr, setMyIncomeStr] = useState<string>("250"); // 만원 단위 (본인 월소득)
  const [myAssetOk, setMyAssetOk] = useState<boolean | null>(null); // 자산 2.73억, 자동차 3,708만 이하

  // Interactive rent calculator inputs (on results screen)
  const [region, setRegion] = useState<"metropolitan" | "gwangyeok" | "other">("metropolitan");
  const [depositStr, setDepositStr] = useState<string>("10000"); // 희망 보증금 (만원)
  const [extraChildren, setExtraChildren] = useState<number>(0); // 자녀 할인

  // Toast/Share
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const familyIncome = familyIncomeStr === "" ? 0 : parseInt(familyIncomeStr, 10) * 10000;
  const myIncome = myIncomeStr === "" ? 0 : parseInt(myIncomeStr, 10) * 10000;
  const targetDeposit = depositStr === "" ? 0 : parseInt(depositStr, 10);

  // Handle toast notification
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

  // Determine final priority status
  const finalPriority = useMemo(() => {
    // 1단계 기본 조건 필터링
    if (isYouthOrStudent === false || isHomeless === false) {
      return "ineligible";
    }

    // 1순위 판정
    if (isFirstPriorityType === true) {
      return "priority_1";
    }

    // 2순위 판정
    // - 가구 소득 기준 100% 이하
    const standardLimit2nd = INCOME_STANDARDS[familySize as keyof typeof INCOME_STANDARDS] || INCOME_STANDARDS[5];
    const isIncome2ndOk = familyIncome <= standardLimit2nd;
    if (isIncome2ndOk && familyAssetOk === true) {
      return "priority_2";
    }

    // 3순위 판정
    // - 본인 소득 100% 이하 (1인 가구 기준인 4,022,968원 적용)
    const isIncome3rdOk = myIncome <= INCOME_STANDARDS[1];
    if (isIncome3rdOk && myAssetOk === true) {
      return "priority_3";
    }

    // 조건 미달
    return "ineligible";
  }, [
    isYouthOrStudent,
    isHomeless,
    isFirstPriorityType,
    familySize,
    familyIncome,
    familyAssetOk,
    myIncome,
    myAssetOk,
  ]);

  // Subsidized monthly rent calculation
  const calcRent = useMemo(() => {
    // LH 지원 한도 설정
    // - 수도권: 1.2억 원
    // - 광역시: 9,500만 원
    // - 기타: 8,500만 원
    let limit = 12000; // 만원 단위
    if (region === "gwangyeok") limit = 9500;
    else if (region === "other") limit = 8500;

    // 본인 부담금 설정
    // - 1, 2순위: 100만 원
    // - 3순위: 200만 원
    const coPay = (finalPriority === "priority_1" || finalPriority === "priority_2") ? 100 : 200;

    // 지원 대상 가능 여부 확인
    if (targetDeposit <= coPay) {
      return {
        limit,
        coPay,
        lhSupport: 0,
        baseRate: 0,
        finalRate: 0,
        monthlyRent: 0,
        extraPay: 0,
      };
    }

    // LH 실제 지원 가능 금액
    const maxLhSupportLimit = limit - coPay;
    const excessDeposit = Math.max(0, targetDeposit - limit); // 한도 초과분 (본인이 직접 마련해야 하는 금액)
    const lhSupport = Math.min(maxLhSupportLimit, targetDeposit - coPay);

    // LH 지원금액에 따른 연 이율 산정
    // - 3천만 원 이하: 연 1.0%
    // - 5천만 원 이하: 연 1.5%
    // - 5천만 원 초과: 연 2.0%
    let baseRate = 2.0;
    if (lhSupport <= 3000) baseRate = 1.0;
    else if (lhSupport <= 5000) baseRate = 1.5;

    // 우대금리 차감
    let discounts = 0;
    // 1, 2순위: 0.5%p 우대
    if (finalPriority === "priority_1" || finalPriority === "priority_2") {
      discounts += 0.5;
    }
    // 자녀 할인
    if (extraChildren === 1) discounts += 0.2;
    else if (extraChildren === 2) discounts += 0.3;
    else if (extraChildren >= 3) discounts += 0.5;

    const finalRate = Math.max(1.0, baseRate - discounts);

    // 월 임대료(이자) 계산
    const monthlyRent = Math.round((lhSupport * 10000 * finalRate) / 100 / 12);

    return {
      limit,
      coPay,
      lhSupport,
      baseRate,
      finalRate,
      monthlyRent,
      extraPay: excessDeposit,
    };
  }, [finalPriority, region, targetDeposit, extraChildren]);

  // Reset calculator
  const handleReset = () => {
    setIsYouthOrStudent(null);
    setIsHomeless(null);
    setIsFirstPriorityType(null);
    setFamilyAssetOk(null);
    setMyAssetOk(null);
    setStep(0);
  };

  // Skip options or auto flow
  const handleNextStep = () => {
    if (step === 1) {
      if (isYouthOrStudent === false || isHomeless === false) {
        setStep(5); // Ineligible immediately
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (isFirstPriorityType === true) {
        setStep(5); // 1st Priority confirmed, skip to results
      } else {
        setStep(3); // Go to 2nd priority checks
      }
    } else if (step === 3) {
      if (familyAssetOk === false) {
        // Assets exceed 2nd priority, check 3rd priority
        setStep(4);
      } else {
        // check income
        const limit = INCOME_STANDARDS[familySize as keyof typeof INCOME_STANDARDS] || INCOME_STANDARDS[5];
        if (familyIncome <= limit) {
          setStep(5); // 2nd Priority confirmed
        } else {
          setStep(4); // Income exceeds, check 3rd priority
        }
      }
    } else if (step === 4) {
      setStep(5); // 3rd priority results
    }
  };

  // Share results
  const shareUrl = `https://lifefit.kr/tools/lh-rent?region=${region}&deposit=${depositStr}&priority=${finalPriority}`;
  const resultText = `[LifeFit] 2026 LH 청년 전세임대주택 자격 판별 결과 🏠\n✅ 판정 결과: ${
    finalPriority === "priority_1"
      ? "1순위 대상자"
      : finalPriority === "priority_2"
        ? "2순위 대상자"
        : finalPriority === "priority_3"
          ? "3순위 대상자"
          : "대상 자격 미충족"
  }\n✅ 월 LH 이자(임대료): 월 ${formatCurrency(calcRent.monthlyRent)}원\n✅ 본인 기본 자부담금: ${formatCurrency(
    calcRent.coPay
  )}만 원`;
  const fullText = `${resultText}\n\n👉 내 LH 청년 전세임대 순위 확인하기:\n${shareUrl}`;

  const handleShare = async () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit LH 청년 전세임대 자격 판별기 🏠",
          text: resultText,
          url: shareUrl,
        });
        showToastNotification("공유하기 완료!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Web Share API error:", err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("결과 링크 복사 성공!");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToastNotification("복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `LH 청년 전세임대주택 판별기 결과 🏠`,
      description: `자격 진단 결과: [${
        finalPriority === "priority_1" ? "1순위" : finalPriority === "priority_2" ? "2순위" : "3순위"
      }]. 희망 보증금 임대 실행 시 월 LH 부담료는 월 ${formatCurrency(calcRent.monthlyRent)}원입니다.`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 자격 순위 확인하기",
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
            name: "LH 청년 전세임대주택 1·2·3순위 자격 판별기",
            url: "https://lifefit.kr/tools/lh-rent",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "2026년 기준 LH 청년 전세임대주택 소득, 자산 요건별 자격 순위 판별 및 월 임대료 모의 계산기입니다.",
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
                name: "LH 청년 전세임대 판별기",
                item: "https://lifefit.kr/tools/lh-rent",
              },
            ],
          }),
        }}
      />

      <div className="w-full max-w-[500px]">
        {/* 메인으로 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors mb-4"
        >
          ← 메인으로 돌아가기
        </Link>

        {/* 진행률 표시 */}
        {step > 0 && step < 5 && (
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* 메인 설문 카드 */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          
          {/* INTRO SCREEN */}
          {step === 0 && (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f3ff] text-3xl">
                🏠
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#191f28] sm:text-2xl">
                LH 청년 전세임대주택
                <br />
                1·2·3순위 자격 판별기
              </h1>
              <p className="mt-3 text-xs leading-relaxed text-[#8b95a1] sm:text-sm">
                LH 청년전세는 까다로운 소득/자산 조건에 따라 1~3순위가 결정되며, 순위에 따라 대출 금리와 본인부담금이 다르게 설계되어 있습니다. 1분 만에 내 순위를 판정하고 월세를 계산해 보세요!
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                진단 시작하기
              </button>
            </div>
          )}

          {/* STEP 1: 기본 청년 요건 및 무주택자 여부 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                  Step 1. 기본 대상 조건
                </span>
                <h2 className="mt-3 text-lg font-bold text-gray-900 leading-snug">
                  귀하는 만 19세 이상 34세 이하 청년이거나 대학생, 취업준비생 중 하나에 해당합니까?
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsYouthOrStudent(true)}
                  className={`py-3.5 rounded-xl text-xs font-bold border transition-all ${
                    isYouthOrStudent === true
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  예 (Yes)
                </button>
                <button
                  onClick={() => setIsYouthOrStudent(false)}
                  className={`py-3.5 rounded-xl text-xs font-bold border transition-all ${
                    isYouthOrStudent === false
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  아니오 (No)
                </button>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-snug">
                  본인 명의의 주택을 소유하지 않은 무주택자입니까?
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsHomeless(true)}
                  className={`py-3.5 rounded-xl text-xs font-bold border transition-all ${
                    isHomeless === true
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  예 (Yes)
                </button>
                <button
                  onClick={() => setIsHomeless(false)}
                  className={`py-3.5 rounded-xl text-xs font-bold border transition-all ${
                    isHomeless === false
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  아니오 (No)
                </button>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(0)}
                  className="text-xs font-bold text-[#8b95a1] hover:text-[#4e5968]"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={isYouthOrStudent === null || isHomeless === null}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  다음 질문 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 1순위 조건 여부 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                  Step 2. 1순위 자격 확인
                </span>
                <h2 className="mt-3 text-lg font-bold text-gray-900 leading-snug">
                  귀하는 다음 중 어느 하나에 해당합니까?
                </h2>
                <div className="mt-3 p-4 bg-[#f8f9fa] rounded-2xl text-xs text-gray-600 space-y-1">
                  <p>1. 기초생활수급자 가구 (생계/의료/주거급여)</p>
                  <p>2. 보호대상 한부모가족</p>
                  <p>3. 차상위계층 가구</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsFirstPriorityType(true)}
                  className={`py-4 rounded-xl text-xs font-bold border transition-all ${
                    isFirstPriorityType === true
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  예, 해당합니다 (1순위 확정)
                </button>
                <button
                  onClick={() => setIsFirstPriorityType(false)}
                  className={`py-4 rounded-xl text-xs font-bold border transition-all ${
                    isFirstPriorityType === false
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-[#f2f4f6] border-transparent text-[#4e5968] hover:bg-gray-200"
                  }`}
                >
                  아니오, 해당되지 않습니다.
                </button>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#8b95a1] hover:text-[#4e5968]"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={isFirstPriorityType === null}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  다음 질문 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 2순위 소득 및 자산 기준 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                  Step 3. 2순위 자격 확인 (부모 + 본인 기준)
                </span>
                <h2 className="mt-3 text-sm font-bold text-gray-900">
                  1. 부모님과 본인을 포함한 전체 가구원 수를 선택하세요.
                </h2>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFamilySize(size)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      familySize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-[#f2f4f6] text-[#4e5968]"
                    }`}
                  >
                    {size === 5 ? "5명 이상" : `${size}인`}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-bold text-gray-900">
                    2. 부모님과 본인의 월평균 합산 소득은 얼마인가요?
                  </h2>
                  <span className="text-xs font-bold text-blue-600">
                    {formatCurrency(parseInt(familyIncomeStr || "0", 10))}만 원
                  </span>
                </div>
                <div className="relative flex items-center mt-2">
                  <input
                    type="number"
                    value={familyIncomeStr}
                    onChange={(e) => setFamilyIncomeStr(e.target.value)}
                    className="w-full h-11 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-xs font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="부모+본인 소득 합산"
                  />
                  <span className="absolute right-4 text-xs text-[#8b95a1]">만원</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  * {familySize}인 가구 2순위 소득 상한선: 약{" "}
                  {formatCurrency(Math.round(INCOME_STANDARDS[familySize as keyof typeof INCOME_STANDARDS] / 10000))}만 원
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  3. 부모님과 본인의 합산 자산 기준을 충족하나요?
                </h2>
                <div className="p-3 bg-[#f8f9fa] rounded-2xl text-[10px] text-gray-500 mb-2 leading-relaxed">
                  • **자산 기준**: 부모+본인 합산 총자산 3억 4,500만 원 이하
                  <br />• **자동차 가치**: 부모 및 본인 차량 개별 3,708만 원 이하 (2026년 기준)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFamilyAssetOk(true)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      familyAssetOk === true
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-[#f2f4f6] border-transparent text-[#4e5968]"
                    }`}
                  >
                    네, 모두 충족합니다.
                  </button>
                  <button
                    onClick={() => setFamilyAssetOk(false)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      familyAssetOk === false
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-[#f2f4f6] border-transparent text-[#4e5968]"
                    }`}
                  >
                    아니오, 자산이 초과합니다.
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#8b95a1] hover:text-[#4e5968]"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={familyAssetOk === null}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  다음 질문 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: 3순위 소득 및 자산 기준 */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                  Step 4. 3순위 자격 확인 (청년 본인 1인 기준)
                </span>
                <div className="flex justify-between items-center mt-3">
                  <h2 className="text-sm font-bold text-gray-900">
                    1. 청년 본인 1인의 세전 월평균 소득은 얼마인가요?
                  </h2>
                  <span className="text-xs font-bold text-blue-600">
                    {formatCurrency(parseInt(myIncomeStr || "0", 10))}만 원
                  </span>
                </div>
                <div className="relative flex items-center mt-2">
                  <input
                    type="number"
                    value={myIncomeStr}
                    onChange={(e) => setMyIncomeStr(e.target.value)}
                    className="w-full h-11 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-xs font-bold placeholder:text-[#b0b8c1] outline-none"
                    placeholder="본인 소득 입력"
                  />
                  <span className="absolute right-4 text-xs text-[#8b95a1]">만원</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  * 3순위 소득 상한선: 약 {formatCurrency(Math.round(INCOME_STANDARDS[1] / 10000))}만 원 (1인 100% 이하)
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  2. 청년 본인 1인 기준 자산 기준을 충족하나요?
                </h2>
                <div className="p-3 bg-[#f8f9fa] rounded-2xl text-[10px] text-gray-500 mb-2 leading-relaxed">
                  • **자산 기준**: 청년 본인 자산 총 2억 7,300만 원 이하
                  <br />• **자동차 가치**: 본인 차량 연식 평가 3,708만 원 이하 (2026년 기준)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMyAssetOk(true)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      myAssetOk === true
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-[#f2f4f6] border-transparent text-[#4e5968]"
                    }`}
                  >
                    네, 모두 충족합니다.
                  </button>
                  <button
                    onClick={() => setMyAssetOk(false)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      myAssetOk === false
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-[#f2f4f6] border-transparent text-[#4e5968]"
                    }`}
                  >
                    아니오, 자산이 초과합니다.
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(3)}
                  className="text-xs font-bold text-[#8b95a1] hover:text-[#4e5968]"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={myAssetOk === null}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  판정 완료 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: RESULTS SCREEN */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-3xl">
                  {finalPriority !== "ineligible" ? "🎉" : "📋"}
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">LH 자격 진단 결과</h2>
              </div>

              {/* 판정 메시지 박스 */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                {finalPriority === "priority_1" && (
                  <div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">1순위 당첨 확률 최상</span>
                    <p className="mt-2 text-base font-bold text-[#191f28]">LH 청년 전세임대 [1순위] 대상자입니다</p>
                  </div>
                )}
                {finalPriority === "priority_2" && (
                  <div>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">2순위 해당</span>
                    <p className="mt-2 text-base font-bold text-[#191f28]">LH 청년 전세임대 [2순위] 대상자입니다</p>
                  </div>
                )}
                {finalPriority === "priority_3" && (
                  <div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">3순위 해당</span>
                    <p className="mt-2 text-base font-bold text-[#191f28]">LH 청년 전세임대 [3순위] 대상자입니다</p>
                  </div>
                )}
                {finalPriority === "ineligible" && (
                  <div className="text-red-700">
                    <span className="text-xs font-bold bg-red-100 px-2 py-0.5 rounded-full text-red-600">지원 조건 미충족</span>
                    <p className="mt-2 text-base font-bold">LH 전세임대 대상에서 제외되었습니다</p>
                    <p className="text-[10px] text-red-500 mt-1">소득 기준 혹은 자산 기준 초과, 또는 주택 소유로 인해 신청이 어렵습니다.</p>
                  </div>
                )}
              </div>

              {/* LH 임대료(월세/이자) 계산기 영역 */}
              {finalPriority !== "ineligible" && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    <Calculator size={16} className="text-blue-600" />
                    임대조건(이자) 시뮬레이션
                  </h3>

                  {/* 희망 보증금액 입력 */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-500">원하는 전세 보증금액</label>
                      <span className="text-xs font-bold text-blue-600">{formatCurrency(targetDeposit)}만 원</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={depositStr}
                        onChange={(e) => setDepositStr(e.target.value)}
                        className="w-full h-11 pl-4 pr-12 rounded-xl bg-[#f2f4f6] text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="예: 10000"
                      />
                      <span className="absolute right-4 text-xs text-[#8b95a1]">만원</span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {[5000, 8000, 10000, 12000, 15000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setDepositStr(String(val))}
                          className="flex-1 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[10px] text-gray-600 font-medium"
                        >
                          {val >= 10000 ? `${val / 10000}억` : `${val}만`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 주거 지역 선택 */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">임차 주택 거주 지역</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "metropolitan", label: "수도권 (한도 1.2억)" },
                        { id: "gwangyeok", label: "광역시 (한도 9.5천)" },
                        { id: "other", label: "기타지역 (한도 8.5천)" },
                      ].map((reg) => (
                        <button
                          key={reg.id}
                          onClick={() => setRegion(reg.id as any)}
                          className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${
                            region === reg.id
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-50 border-gray-200 text-gray-600"
                          }`}
                        >
                          {reg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 자녀 수 감면 조건 */}
                  <div>
                    <label className="text-xs font-medium text-[#4e5968] block mb-1">추가 자녀 할인 조건</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3].map((count) => (
                        <button
                          key={count}
                          onClick={() => setExtraChildren(count)}
                          className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            extraChildren === count
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-50 border-gray-200 text-gray-600"
                          }`}
                        >
                          {count === 3 ? "3명 이상" : `${count}명`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 세부 계산 리포트 */}
                  <div className="bg-[#f8f9fa] rounded-2xl p-4 text-xs space-y-2 border border-gray-100">
                    <div className="flex justify-between text-gray-500">
                      <span>본인 기초 자부담금 (Co-pay)</span>
                      <span className="font-bold text-[#191f28]">{formatCurrency(calcRent.coPay)}만 원</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>LH 실제 전세 보증금 대출금</span>
                      <span className="font-bold text-[#191f28]">{formatCurrency(calcRent.lhSupport)}만 원</span>
                    </div>
                    {calcRent.extraPay > 0 && (
                      <div className="flex justify-between text-red-600 font-medium">
                        <span>초과 자부담금 (한도 부족분)</span>
                        <span>{formatCurrency(calcRent.extraPay)}만 원</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>최종 연동 이율</span>
                      <span className="font-bold text-[#191f28]">연 {calcRent.finalRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-blue-600 pt-2 border-t border-dashed border-gray-200 text-sm">
                      <span>매월 납부해야 하는 이자 (월세)</span>
                      <span>월 {formatCurrency(calcRent.monthlyRent)}원</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 리셋 버튼 */}
              <button
                onClick={handleReset}
                className="w-full h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-600 transition-colors"
              >
                다시 진단하기
              </button>
            </div>
          )}
        </div>

        {/* 결과 공유 카드 */}
        {step === 5 && (
          <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-[rgba(0,27,55,0.05)] text-center space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-900">
                🎉 내 LH 청년 전세임대 순위 결과 공유하기
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
        )}

        {/* 구글 애드센스 */}
        <AdSenseSlot adFormat="auto" />

        {/* 복지 정보 아티클 */}
        <article className="mt-8 p-5 bg-white rounded-3xl border border-gray-200 text-xs text-gray-600 leading-relaxed text-left">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1">
            <HelpCircle size={14} className="text-blue-600" />
            2026년 LH 청년 전세임대주택 1·2·3순위 자격 요건 안내
          </h2>
          <p className="mb-2">
            LH 청년 전세임대주택은 입주 대상자로 선정된 청년이 전세 계약을 맺을 주택을 구해오면, LH(한국토지주택공사)가 주택 소유자와 전세계약을 체결한 뒤 청년에게 저렴하게 재임대하는 제도입니다.
          </p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li><strong>1순위</strong>: 생계·의료·주거급여 수급 가구, 한부모가족, 차상위계층 청년</li>
            <li><strong>2순위</strong>: 본인과 부모의 월평균 소득의 합이 전년도 도시근로자 가구당 월평균 소득 100% 이하이고, 국민임대주택 자산 기준(총자산 3.45억, 자동차 3,708만 원 이하)을 충족하는 청년</li>
            <li><strong>3순위</strong>: 청년 본인의 월평균 소득이 도시근로자 1인 가구 월평균 소득 100% 이하(약 402만 원)이고, 행복주택 청년 자산 기준(본인 자산 2.73억, 자동차 3,708만 원 이하)을 충족하는 청년</li>
          </ul>
          <p>
            임대 보증금 지원 한도액은 수도권 1억 2,000만 원, 광역시 9,500만 원, 기타 지방 8,500만 원입니다. 초과하는 금액은 입주자가 추가 부담할 경우 지원 한도의 150%까지도 전세 임대 실행이 가능합니다. 이 제도는 전세 자금을 직접 빌려주는 대출과 달리 LH가 임대인이 되는 형식이어서 비교적 권리 관계가 안전하다는 장점이 있습니다.
          </p>
        </article>

        {/* 구독 유도 */}
        <SubscribeCard defaultCategory="housing" />
      </div>
      <Footer />
    </main>
  );
}

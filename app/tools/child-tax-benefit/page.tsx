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
  Percent,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";

type Step = 1 | 2 | 3;

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export default function ChildTaxBenefitPage() {
  const [step, setStep] = useState<Step>(1);

  // Step 1: 만 6세 이하 자녀 수
  const [childCount, setChildCount] = useState<number>(2);

  // Step 2: 연봉 구간 (지방소득세 10% 포함된 세울 연동)
  const [salaryTier, setSalaryTier] = useState<string>("5000_8800");

  // 공유 상태 및 토스트 알림
  const [isSharedResult, setIsSharedResult] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
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

  // 로컬 스토리지 연동
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_child_tax_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  // 공유 URL 로드
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("c");
      const s = params.get("s");

      if (c && s) {
        setChildCount(parseInt(c, 10));
        setSalaryTier(s);
        setStep(3);
        setIsSharedResult(true);
      }
    }
  }, []);

  const saveToHistory = () => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        childCount,
        salaryTier,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_child_tax_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_child_tax_history");
        if (saved) {
          const p = JSON.parse(saved);
          setChildCount(p.childCount || 2);
          setSalaryTier(p.salaryTier || "5000_8800");
          setStep(3);
          showToastNotification("이전 계산 기록을 불러왔습니다!");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 과세표준 세율 매칭표 (2026년 기준 지방소득세 10% 포함 실질 한계세율)
  const TAX_BRACKETS = {
    "under_1400": { rate: 6.6, label: "연봉 ~ 1,400만 원 이하", desc: "실질 한계세율 6.6% 적용" },
    "1400_5000": { rate: 16.5, label: "연봉 1,400만 ~ 5,000만 원 이하", desc: "실질 한계세율 16.5% 적용" },
    "5000_8800": { rate: 26.4, label: "연봉 5,000만 ~ 8,800만 원 이하", desc: "실질 한계세율 26.4% 적용" },
    "8800_15000": { rate: 38.5, label: "연봉 8,800만 ~ 1억 5,000만 원 이하", desc: "실질 한계세율 38.5% 적용" },
    "over_15000": { rate: 41.8, label: "연봉 1억 5,000만 원 초과", desc: "실질 한계세율 41.8% 이상 적용" },
  };

  const selectedBracket = TAX_BRACKETS[salaryTier as keyof typeof TAX_BRACKETS];

  // 절세 혜택 계산
  const results = useMemo(() => {
    // 2026년 보육수당 개편
    // 이전 한도: 통합 월 20만 원 (연 240만 원)
    // 2026년 한도: 자녀 1인당 월 20만 원 (자녀 2명 = 월 40만 원, 3명 = 월 60만 원)
    const prevMonthlyLimit = 200000;
    const newMonthlyLimit = childCount * 200000;

    // 추가 비과세 한도 혜택 금액 (자녀가 1명이면 추가분은 없음, 2명 이상부터 추가 혜택 발생)
    const additionalMonthlyExemption = Math.max(0, newMonthlyLimit - prevMonthlyLimit);
    const additionalYearlyExemption = additionalMonthlyExemption * 12;

    const rateFraction = selectedBracket.rate / 100;
    const monthlySavings = additionalMonthlyExemption * rateFraction;
    const yearlySavings = additionalYearlyExemption * rateFraction;

    return {
      prevMonthlyLimit,
      newMonthlyLimit,
      additionalMonthlyExemption,
      additionalYearlyExemption,
      monthlySavings,
      yearlySavings,
      rate: selectedBracket.rate,
    };
  }, [childCount, selectedBracket]);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return salaryTier !== "";
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 3) {
      saveToHistory();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleShare = async () => {
    const resultText = `[LifeFit] 보육수당 비과세 절세 계산 💰\n자녀수: 만 6세 이하 ${childCount}명\n소득세 절감액: 매달 약 ${formatCurrency(results.monthlySavings)}원 (연간 약 ${formatCurrency(results.yearlySavings)}원 비과세 보너스)`;
    const shareUrl = `https://lifefit.kr/tools/child-tax-benefit?c=${childCount}&s=${salaryTier}`;
    const fullText = `${resultText}\n\n👉 내 월급 통장에 추가될 비과세 혜택 계산하기:\n${shareUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 보육수당 비과세 계산기 💰",
          text: resultText,
          url: shareUrl,
        });
        showToastNotification("💬 공유가 완료되었습니다!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Web Share API error:", err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("💬 결과 링크가 복사되었습니다! 친구에게 공유해 보세요.");
    } catch {
      showToastNotification("❌ 복사에 실패했습니다.");
    }
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
            name: "자녀 수별 보육수당 비과세 절세 계산기",
            url: "https://lifefit.kr/tools/child-tax-benefit",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "2026년 개정된 자녀 1인당 월 20만 원 보육수당 비과세 개편에 따른 연도별 소득세 감면율 및 월 실수령액 증가 시뮬레이션",
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500 text-white mb-3 shadow-lg">
            <Percent size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            보육수당 비과세 계산기
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            2026 개편안 반영 자녀 수별 실수령액 변동 확인
          </p>
        </div>

        {/* 진행 막대 */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e8eb]">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* 마법사 카드 본체 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">

          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              {hasHistory && (
                <button
                  onClick={loadHistory}
                  className="w-full h-11 rounded-2xl bg-teal-50/70 text-teal-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-teal-100/70 transition-all active:scale-[0.98] border border-teal-100/50"
                >
                  <History size={14} />
                  이전 계산 기록 불러오기
                </button>
              )}

              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">만 6세 이하 자녀가 몇 명인가요?</h2>
                <p className="text-xs text-[#8b95a1]">자녀 수에 따라 비과세 혜택 한도가 증액됩니다.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { count: 1, label: "1명 (첫째)" },
                  { count: 2, label: "2명 (다자녀)" },
                  { count: 3, label: "3명 (다자녀)" },
                  { count: 4, label: "4명 이상" },
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setChildCount(item.count)}
                    className={`py-5 rounded-2xl border-2 font-bold transition-all flex flex-col items-center justify-center ${
                      childCount === item.count
                        ? "border-teal-500 bg-teal-50/70 text-teal-600"
                        : "border-[#e5e8eb] bg-white text-[#4e5968] hover:border-[#b0b8c1]"
                    }`}
                  >
                    <span className="text-lg">{item.count}명</span>
                    <span className="text-[10px] text-[#8b95a1] mt-1">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* 자녀가 0명인 경우 예외 안내 */}
              <button
                onClick={() => {
                  setChildCount(0);
                  showToastNotification("자녀가 없는 경우 비과세 대상이 아닙니다.");
                }}
                className={`w-full py-3.5 rounded-xl border-2 font-bold text-xs transition-all ${
                  childCount === 0
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-dashed border-gray-300 bg-gray-50/50 text-gray-400 hover:border-gray-400"
                }`}
              >
                자녀 없음 (비대상 확인하기)
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-1">현재 대략적인 연봉 범위를 골라주세요</h2>
                <p className="text-xs text-[#8b95a1]">소득세 표준 한계세율을 자동으로 매칭합니다.</p>
              </div>

              <div className="space-y-3">
                {Object.entries(TAX_BRACKETS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSalaryTier(key)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                      salaryTier === key
                        ? "border-teal-500 bg-teal-50/70"
                        : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`font-bold text-sm ${salaryTier === key ? "text-teal-600" : "text-[#191f28]"}`}>
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        salaryTier === key 
                          ? "bg-teal-500 text-white" 
                          : "bg-[#f2f4f6] text-[#4e5968]"
                      }`}>
                        세율 {item.rate}%
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8b95a1] mt-1.5">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && results && (
            <div className="animate-fade-in space-y-6">
              
              {isSharedResult && (
                <div className="w-full rounded-xl bg-teal-50 p-3 text-xs font-semibold text-teal-800 border border-teal-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 보육수당 절세 시뮬레이션입니다!
                </div>
              )}

              {/* 판별 결과 헤더 */}
              <div className="text-center pb-2">
                <p className="text-xs text-[#8b95a1] font-semibold">2026 보육수당 개편 혜택</p>
                {childCount === 0 ? (
                  <h2 className="text-2xl font-black mt-1 text-red-500">
                    비과세 적용 불가
                  </h2>
                ) : childCount === 1 ? (
                  <h2 className="text-2xl font-black mt-1 text-teal-600">
                    기존 비과세 혜택 유지 (월 20만 원)
                  </h2>
                ) : (
                  <h2 className="text-2xl font-black mt-1 text-teal-600">
                    추가 비과세 혜택 가능!
                  </h2>
                )}
                <p className="text-xs text-[#4e5968] mt-2 px-4 leading-relaxed">
                  {childCount === 0 
                    ? "만 6세 이하 자녀가 없는 근로자는 보육수당 비과세 혜택 대상이 아닙니다."
                    : childCount === 1 
                      ? "자녀 1명에 해당하는 월 20만 원(연 240만 원) 비과세가 지속 적용됩니다."
                      : `2026년부터 자녀 1인당 20만 원으로 개편되어, 이전 대비 추가로 월 ${childCount * 20 - 20}만 원이 더 비과세 처리됩니다.`}
                </p>
              </div>

              {/* 메인 결과 박스 (Toss 풍 프리미엄 명세서 양식) */}
              {childCount > 1 && (
                <div className="rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-emerald-100 space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-teal-100 text-xs font-medium mb-1">개편 후 추가 비과세 한도</p>
                      <p className="text-2xl font-black">월 {childCount * 20 - 20}만 원 (연 {240 * childCount - 240}만 원)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-teal-100 text-xs font-medium mb-1">나의 세율</p>
                      <p className="text-sm font-bold">{results.rate}%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 space-y-3">
                    <div className="flex justify-between items-center text-xs text-teal-100">
                      <span>연간 아끼는 세금 (소득세+지방세)</span>
                      <span className="font-extrabold text-base text-white">약 {formatCurrency(results.yearlySavings)}원</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                      <span className="text-xs font-bold text-teal-100">매월 실수령액 순수 증가액</span>
                      <span className="text-3xl font-black leading-none">+{formatCurrency(results.monthlySavings)}원</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 월급봉투 시뮬레이션 */}
              {childCount > 1 ? (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-[#191f28] flex items-center gap-2 pl-1">
                    <TrendingUp size={20} className="text-teal-500" />
                    실제 내 월급 실수령액 변화
                  </h3>

                  <div className="rounded-2xl border border-[#e5e8eb] p-5 bg-[#f8f9fa] space-y-3.5">
                    <div className="flex justify-between items-center text-xs text-[#8b95a1]">
                      <span>이전 월급 비과세 한도</span>
                      <span className="font-semibold text-gray-700">200,000원</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#8b95a1]">
                      <span>2026년 개정 후 내 비과세 한도</span>
                      <span className="font-semibold text-teal-600">{formatCurrency(results.newMonthlyLimit)}원</span>
                    </div>
                    <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between items-center text-sm">
                      <span className="font-bold text-[#191f28]">매월 절세 캐시백</span>
                      <span className="font-extrabold text-teal-600">+{formatCurrency(results.monthlySavings)}원 / 월</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#4e5968] bg-[#f2f4f6] p-4 rounded-2xl leading-relaxed">
                    <p className="font-bold text-[#191f28] text-sm">💡 왜 연봉이 높을수록 절세액이 늘어나나요?</p>
                    <p className="mt-1">
                      비과세 혜택은 세금이 부과되는 대상 금액(소득) 자체를 깎아주는 <strong>소득공제</strong> 방식이기 때문입니다. 따라서 한계세율(내가 내는 최고 세율 구간)이 높은 고연봉자일수록 비과세 한도가 늘어날 때 아낄 수 있는 실질 소득세액이 대폭 늘어납니다.
                    </p>
                    <p className="font-bold text-[#d97706] mt-2">
                      ⚠️ 주의: 회사 인사(급여)팀에 보육수당 대상을 자녀 수에 맞게 분할 적용해달라고 직접 신청해야 이 세제 혜택이 내 급여명세서에 정상적으로 세이브됩니다!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-[#4e5968] leading-relaxed space-y-3">
                  <p className="font-bold text-teal-800 text-sm flex items-center gap-1">
                    <CheckCircle2 size={16} /> 자녀 1명 혜택 적용 중
                  </p>
                  <p>
                    자녀 1명의 경우 이미 이전 제도 한도인 <strong>월 20만 원(연 240만 원)</strong>의 비과세 혜택을 온전히 누리고 계십니다. 자녀가 2명으로 늘어날 때 추가 20만 원 한도가 적용되어 절세 효과가 발동합니다.
                  </p>
                  <p>
                    만약 자녀가 1명임에도 급여 명세서에 보육수당(또는 육아수당) 비과세 항목이 잡혀있지 않다면, 회사 담당 부서에 문의하시어 비과세 수당 설정을 요청하셔야 매달 소득세를 아끼실 수 있습니다.
                  </p>
                </div>
              )}

              {/* 구글 애드센스 슬롯 */}
              <AdSenseSlot adFormat="auto" />

            </div>
          )}

          {/* 이전/다음 단계 버튼 */}
          <div className="flex items-center gap-3 mt-8">
            {step > 1 && step < 3 && (
              <button
                onClick={prevStep}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {step < 3 && (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-1 transition-all ${
                  canProceed()
                    ? "bg-teal-500 text-white shadow-md hover:bg-teal-600"
                    : "bg-[#e5e8eb] text-[#b0b8c1] cursor-not-allowed"
                }`}
              >
                다음
                <ChevronRight size={18} />
              </button>
            )}

            {step === 3 && (
              <div className="w-full mt-4 pt-6 border-t border-[#f2f4f6] space-y-4 text-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      setChildCount(2);
                      setSalaryTier("5000_8800");
                      setIsSharedResult(false);
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, "", window.location.pathname);
                      }
                    }}
                    className="flex-1 h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-[#e5e8eb] transition-all"
                  >
                    <History size={16} />
                    {isSharedResult ? "나도 해보기" : "다시 하기"}
                  </button>
                  
                  {childCount > 1 && (
                    <button
                      onClick={handleShare}
                      className="flex-1 h-12 rounded-2xl bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-teal-600 shadow-md shadow-teal-100 transition-all"
                    >
                      <Share2 size={16} />
                      결과 공유
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 하단 안내 가이드 */}
        <div className="mt-6 p-4 bg-[#fff8db] rounded-2xl">
          <p className="font-bold text-xs text-[#8b6a00] flex items-center gap-1 mb-1">
            <Info size={14} /> 보육수당 비과세 상식 가이드
          </p>
          <ul className="text-[11px] text-[#8b6a00] list-disc pl-4 space-y-1">
            <li>
              <strong>적용 대상 자녀:</strong> 만 6세 이하인 자녀 (출생연도 기준 당해 연도까지 포함).
            </li>
            <li>
              <strong>맞벌이 부부 중복 혜택:</strong> 맞벌이 부부의 경우, 각자 재직 중인 회사에서 동일한 자녀에 대해 각각 월 20만 원씩 비과세 적용이 가능합니다.
            </li>
            <li>
              <strong>비과세 신청 시점:</strong> 매달 지급받는 월급에 자동으로 반영되며, 12월 연말정산 시에 총급여액이 비과세만큼 차감되어 적용됩니다.
            </li>
          </ul>
        </div>

        {/* SEO 아티클 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            2026 보육수당 자녀수별 비과세 개편 팩트 체크
          </h2>
          <p className="mb-2">
            기존 소득세법상 보육수당 비과세 제도는 근로자 1인당 자녀 수와 관계없이 월 20만 원까지만 혜택을 제공하여 다자녀 가구의 양육 비용 보전에 한계가 있었습니다. 이를 해결하기 위해 <strong>2026년 1월 1일 지급분부터 자녀 1인당 월 20만 원</strong>으로 비과세 한도가 획기적으로 늘어났습니다.
          </p>
          <p className="mb-2">
            이 변화는 다자녀 가구 근로자의 과세대상 소득(과세표준)을 낮춤으로써, 누진세 구조인 한국 소득세법의 혜택을 크게 배가시킵니다. 예를 들어, 연봉 6,000만 원 직장인(지방소득세 포함 한계세율 26.4% 구간)이 만 6세 이하의 자녀 2명을 키우는 경우 연간 세금 절감액이 <strong>약 633,600원</strong>에 이르게 됩니다.
          </p>
          <p>
            본 계산기는 귀하가 속한 소득 구간의 최신 세율 데이터와 자녀 수에 따라 즉각적인 월 실수령액 변동치를 모의 시연해 드립니다. 회사 내규 및 급여 규정에 보육수당(자녀양육수당 등)의 한도가 올바르게 자녀별로 지정되어 신청되어 있는지 급여 명세서와 인사 부서를 통해 반드시 검수해 보세요.
          </p>
        </article>
      </div>

      {step === 3 && (
        <SubscribeCard defaultCategory="welfare" />
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

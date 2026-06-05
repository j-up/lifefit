"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Store,
  FileText,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Calculator,
  Info,
  ChevronRight,
  ChevronLeft,
  Share2,
  Coins,
  Landmark,
  History,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

type Step = 1 | 2 | 3 | 4 | 5;
type IncomeType = "3.3" | "business" | "other" | null;

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

// 2026 소득세율표 (간이 산출용)
function getTaxRate(income: number) {
  if (income <= 1400_0000) return 0.06;
  if (income <= 5000_0000) return 0.15;
  if (income <= 8800_0000) return 0.24;
  if (income <= 15000_0000) return 0.35;
  return 0.38;
}

export default function NJobTaxPage() {
  const [step, setStep] = useState<Step>(1);
  const [hasJob, setHasJob] = useState<boolean | null>(null);
  const [salaryStr, setSalaryStr] = useState<string>("");
  const [sideIncomeStr, setSideIncomeStr] = useState<string>("");
  const [incomeType, setIncomeType] = useState<IncomeType>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharedResult, setIsSharedResult] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_njob_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  const saveToHistory = (job: boolean | null, sal: string, side: string, type: IncomeType) => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        hasJob: job,
        salaryStr: sal,
        sideIncomeStr: side,
        incomeType: type,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_njob_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_njob_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          setHasJob(parsed.hasJob);
          setSalaryStr(parsed.salaryStr);
          setSideIncomeStr(parsed.sideIncomeStr);
          setIncomeType(parsed.incomeType);
          setStep(5);
          showToastNotification("이전 계산 기록을 불러왔습니다!");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const job = params.get("job");
      const sal = params.get("sal");
      const side = params.get("side");
      const type = params.get("type");

      if (job !== null && sal !== null && side !== null && type !== null) {
        setHasJob(job === "1");
        setSalaryStr(sal);
        setSideIncomeStr(side);
        setIncomeType(type as IncomeType);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const salary = salaryStr === "" ? 0 : parseInt(salaryStr, 10) * 10_000;
  const sideIncome =
    sideIncomeStr === "" ? 0 : parseInt(sideIncomeStr, 10) * 10_000;

  // 결과 계산
  const results = useMemo(() => {
    if (step < 5) return null;

    // 단순경비율 가정 (모의계산용)
    let expenseRatio = 0.6; // 기본 60%
    if (incomeType === "business") expenseRatio = 0.8; // 소매/오픈마켓은 경비율 높음 가정
    if (incomeType === "3.3") expenseRatio = 0.65; // 프리랜서 가정

    // 부수입 과세표준 (소득금액 = 총매출 - 필요경비)
    const sideTaxable = sideIncome * (1 - expenseRatio);

    // 종소세 계산 (근사치)
    const currentBracketRate = hasJob
      ? getTaxRate(salary + sideTaxable)
      : getTaxRate(sideTaxable);
    const estimatedTax = sideTaxable * currentBracketRate;
    const estimatedLocalTax = estimatedTax * 0.1; // 지방소득세 10%
    const totalTax = estimatedTax + estimatedLocalTax;

    // 건보료 리스크 계산 (2026년 요율 7.09% 가정)
    const healthRate = 0.0709;

    let isDeprived = false;
    let extraHealthFee = 0;
    let riskLevel: "safe" | "warning" | "danger" = "safe";
    let riskMessage = "";

    if (hasJob) {
      // 직장인: 소득월액보험료 (2000만원 초과분)
      if (sideTaxable > 2000_0000) {
        riskLevel = "danger";
        extraHealthFee = ((sideTaxable - 2000_0000) * healthRate) / 12;
        riskMessage =
          "경고: 연간 부수입 소득금액이 2,000만 원을 초과하여 소득월액보험료(건보료 추가)가 고지됩니다.";
      } else {
        riskLevel = "safe";
        riskMessage =
          "정상: 부수입 소득금액이 2,000만 원 이하로, 현재는 직장 건보료 외에 추가되는 건보료가 없습니다.";
      }
    } else {
      // 피부양자/지역가입자 (순수 프리랜서)
      if (incomeType === "business") {
        if (sideTaxable > 0) {
          isDeprived = true;
          riskLevel = "danger";
          riskMessage =
            "폭탄 위험: 사업자등록증이 있고 소득금액이 1원이라도 발생하여 피부양자 자격이 무조건 박탈됩니다.";
        } else {
          riskLevel = "safe";
          riskMessage =
            "정상: 사업자등록증이 있으나 사업소득금액이 0원 이하(적자)로 피부양자 자격이 유지될 가능성이 큽니다.";
        }
      } else {
        if (sideTaxable > 500_0000) {
          isDeprived = true;
          riskLevel = "danger";
          riskMessage =
            "폭탄 위험: 사업자등록증이 없더라도 부수입 소득금액이 500만 원을 초과하여 피부양자 자격이 박탈됩니다.";
        } else {
          riskLevel = "safe";
          riskMessage =
            "정상: 부수입 소득금액 500만 원 이하로 피부양자 자격이 안정적으로 유지됩니다.";
        }
      }

      if (isDeprived) {
        // 지역가입자 건보료 (소득+재산+자동차) 중 소득 기준만 최소 계산
        // 최소 하한선 약 19,780원, 소득보험료 = 소득금액 * 7.09% / 12
        extraHealthFee = Math.max(19780, (sideTaxable * healthRate) / 12);
      }
    }

    return {
      sideTaxable,
      totalTax,
      extraHealthFee,
      isDeprived,
      riskLevel: riskLevel as "safe" | "warning" | "danger",
      riskMessage,
    };
  }, [step, hasJob, salary, sideIncome, incomeType]);

  const canProceed = () => {
    if (step === 1) return hasJob !== null;
    if (step === 2) return salary > 0;
    if (step === 3) return sideIncome > 0;
    if (step === 4) return incomeType !== null;
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    if (step === 1 && !hasJob) {
      setStep(3); // 직장 없으면 바로 부수입 입력으로 건너뜀
    } else {
      const next = (step + 1) as Step;
      setStep(next);
      if (next === 5) {
        saveToHistory(hasJob, salaryStr, sideIncomeStr, incomeType);
      }
    }
  };

  const prevStep = () => {
    if (step === 3 && !hasJob) {
      setStep(1);
    } else if (step > 1) {
      setStep((s) => (s - 1) as Step);
    }
  };

  const handleShare = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 2026 N잡러 건보료 폭탄 계산기 💸\n🚨 건보료 리스크: ${results.riskMessage.split(':')[0]}\n💰 예상 추가 종소세: 약 ${formatCurrency(results.totalTax)}원`;
    const shareUrl = `https://lifefit.kr/tools/njob-tax?job=${hasJob ? 1 : 0}&sal=${salaryStr}&side=${sideIncomeStr}&type=${incomeType || ""}`;
    const fullText = `${resultText}\n\n👉 내 건보료 폭탄 위험도 1분 만에 확인하기:\n${shareUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit N잡러 건보료 폭탄 계산기 💸",
          text: resultText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Web Share API error:", err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("복사가 성공되었습니다!");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToastNotification("복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (!results) return;
    const shareUrl = `https://lifefit.kr/tools/njob-tax?job=${hasJob ? 1 : 0}&sal=${salaryStr}&side=${sideIncomeStr}&type=${incomeType || ""}`;
    const highlightText = `예상 추가 종소세: 약 ${formatCurrency(results.totalTax)}원`;
    shareToKakao({
      title: `2026 N잡러 건보료 폭탄 계산기 💸`,
      description: `부업 소득에 따른 건보료 추가 및 피부양자 박탈 리스크 결과. (${highlightText}) 내 위험도를 1분 만에 확인해 보세요!`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 위험도 확인하기",
      url: shareUrl,
    });
  };

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 pt-6 pb-28 sm:pt-10 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 N잡러 종합소득세 및 건보료 폭탄 계산기",
            url: "https://lifefit.kr/tools/njob-tax",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            description: "2026년 기준 직장인 부업 및 프리랜서 종합소득세 신고 후 건강보험료 인상액 및 피부양자 탈락 리스크 모의계산기",
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
                name: "N잡러 건보료 계산기",
                item: "https://lifefit.kr/tools/njob-tax",
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
                "name": "직장인 부업 시 건보료가 추가 부과되는 기준은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "직장 가입자의 경우 연간 보수 외 소득(부수입 등)이 2,000만 원을 초과할 경우 소득월액보험료가 추가로 고지되며, 이는 직장 건보료와 별도로 납부해야 합니다."
                }
              },
              {
                "@type": "Question",
                "name": "건강보험 피부양자 자격 요건과 탈락 기준은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "피부양자 자격을 유지하기 위해서는 연 소득금액 합계액이 3,400만 원 이하여야 합니다. 다만 사업자등록증이 있는 경우 단 1원의 사업소득이라도 발생 시 자격이 즉각 박탈되며, 프리랜서 등 사업자 미등록 시에는 연 500만 원 초과 시 탈락하게 됩니다."
                }
              }
            ]
          }),
        }}
      />
      <div className="w-full max-w-[420px]">
        {/* 네비게이션 */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors"
          >
            ← 메인으로
          </Link>
        </div>

        {/* 헤더 */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#191f28] text-white mb-3 shadow-lg">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            N잡러 건보료 폭탄 계산기
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            종합소득세 신고 전 내 리스크를 1분 만에 확인하세요
          </p>
        </div>

        {/* 프로그레스 바 */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e8eb]">
          <div
            className="h-full rounded-full bg-[#3182f6] transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* 메인 카드 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          {step === 1 && (
            <div className="animate-fade-in">
              {hasHistory && (
                <button
                  onClick={loadHistory}
                  className="mb-5 w-full h-11 rounded-2xl bg-blue-50/70 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100/70 transition-all active:scale-[0.98] border border-blue-100/50"
                >
                  <History size={14} />
                  이전 계산 기록 불러오기
                </button>
              )}
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                현재 직장에 다니고 계신가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                4대보험이 가입된 직장인지 확인합니다.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setHasJob(true)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    hasJob === true
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase
                      size={24}
                      className={
                        hasJob === true ? "text-[#3182f6]" : "text-[#8b95a1]"
                      }
                    />
                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          hasJob === true ? "text-[#3182f6]" : "text-[#191f28]"
                        }`}
                      >
                        네, 직장인 N잡러입니다
                      </p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setHasJob(false)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    hasJob === false
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      size={24}
                      className={
                        hasJob === false ? "text-[#3182f6]" : "text-[#8b95a1]"
                      }
                    />
                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          hasJob === false ? "text-[#3182f6]" : "text-[#191f28]"
                        }`}
                      >
                        아니요, 순수 프리랜서/무직입니다
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                직장 세전 연봉을 입력해주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                종합소득세 누진세율 구간 계산에 사용됩니다.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(e.target.value)}
                  placeholder="예: 4000"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[3000, 4000, 5000, 6000, 7000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSalaryStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val}만
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                연간 부수입 총액을 입력해주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                경비를 빼기 전의 '세전 총 매출'을 입력해주세요.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={sideIncomeStr}
                  onChange={(e) => setSideIncomeStr(e.target.value)}
                  placeholder="예: 1500"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[300, 500, 1000, 2000, 3000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSideIncomeStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val}만
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                부수입의 주된 유형은 무엇인가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                유형에 따라 세법상 경비 인정 비율이 다릅니다.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setIncomeType("3.3")}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    incomeType === "3.3"
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <FileText
                    size={20}
                    className={
                      incomeType === "3.3" ? "text-[#3182f6]" : "text-[#8b95a1]"
                    }
                  />
                  <div className="text-left">
                    <p className="font-bold text-[#191f28]">
                      3.3% 원천징수 (프리랜서, 배달, 알바)
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setIncomeType("business")}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    incomeType === "business"
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <Store
                    size={20}
                    className={
                      incomeType === "business"
                        ? "text-[#3182f6]"
                        : "text-[#8b95a1]"
                    }
                  />
                  <div className="text-left">
                    <p className="font-bold text-[#191f28]">
                      사업자등록증 보유 (오픈마켓, 스토어 등)
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setIncomeType("other")}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    incomeType === "other"
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <AlertTriangle
                    size={20}
                    className={
                      incomeType === "other"
                        ? "text-[#3182f6]"
                        : "text-[#8b95a1]"
                    }
                  />
                  <div className="text-left">
                    <p className="font-bold text-[#191f28]">
                      기타 소득 (일회성 강연, 원고료 등)
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 5 && results && (
            <div className="animate-fade-in space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800 border border-blue-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 N잡러 결과지입니다!
                </div>
              )}
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-[#191f28]">분석 결과</h2>
                <p className="text-sm text-[#8b95a1] mt-1">
                  입력하신 데이터 기반 모의 계산 결과입니다.
                </p>
              </div>

              {/* 건보료 카드 */}
              <div
                className={`rounded-2xl p-5 border-2 ${
                  results.riskLevel === "danger"
                    ? "border-[#f04452] bg-[#fdf0f1]"
                    : results.riskLevel === "warning"
                    ? "border-[#ffaa00] bg-[#fff8eb]"
                    : "border-[#00c471] bg-[#e6f9f1]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {results.riskLevel === "danger" ? (
                    <AlertOctagon size={22} className="text-[#f04452]" />
                  ) : (
                    <CheckCircle2 size={22} className="text-[#00c471]" />
                  )}
                  <h3
                    className={`font-bold text-lg ${
                      results.riskLevel === "danger"
                        ? "text-[#f04452]"
                        : "text-[#00c471]"
                    }`}
                  >
                    건보료 & 피부양자 리스크
                  </h3>
                </div>

                <p className="text-[15px] font-bold text-[#191f28] mb-2 leading-relaxed">
                  {results.riskMessage}
                </p>

                {results.extraHealthFee > 0 && (
                  <div className="mt-4 p-4 bg-white rounded-xl flex items-center justify-between shadow-sm">
                    <span className="text-sm text-[#4e5968] font-medium">
                      예상 추가 건보료
                    </span>
                    <span className="text-lg font-bold text-[#f04452]">
                      매월 약 {formatCurrency(results.extraHealthFee)}원
                    </span>
                  </div>
                )}
              </div>

              {/* 종소세 카드 */}
              <div className="rounded-2xl p-5 bg-[#f8f9fa] border border-[#e5e8eb]">
                <h3 className="font-bold text-[#191f28] flex items-center gap-2 mb-4">
                  <Calculator size={20} className="text-[#3182f6]" />
                  예상 종합소득세 (부수입 분)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#4e5968]">
                      추정 과세표준 (매출-경비)
                    </span>
                    <span className="font-medium text-[#191f28]">
                      {formatCurrency(results.sideTaxable)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#4e5968]">
                      예상 소득세 합계 (근사치)
                    </span>
                    <span className="font-bold text-[#3182f6] text-base">
                      {formatCurrency(results.totalTax)}원
                    </span>
                  </div>
                  <p className="text-xs text-[#8b95a1] pt-2 border-t border-[#e5e8eb]">
                    ※ 업종별 단순경비율을 가정한 대략적인 금액으로, 비용 처리나
                    소득공제 여부에 따라 실제 세금과 크게 차이 날 수 있습니다.
                  </p>
                </div>
              </div>

              {/* 외부 서비스 링크 영역 (CTA 버튼) */}
              <div className="space-y-3 pt-4">
                <a
                  href="https://www.hometax.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#191f28] text-white hover:bg-[#333d4b] transition-colors shadow-lg"
                >
                  <div className="text-left">
                    <p className="text-xs text-[#b0b8c1] mb-1">
                      놓친 세금이 있는지 확인
                    </p>
                    <p className="font-bold text-[15px]">
                      국세청 홈택스 간편 조회 가기
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-[#8b95a1]" />
                </a>
              </div>

              {/* 구글 애드센스 광고 영역 - 수익성 극대화 */}
              <AdSenseSlot adFormat="auto" />

            </div>
          )}

          {/* 하단 버튼 영역 */}
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
                    🎉 내 예상 결과 주변에 공유하기
                  </p>
                  <p className="text-xs text-[#8b95a1] mt-1">
                    친구들도 N잡러 건보료 폭탄 위험이 있는지 알려주세요!
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
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

                  {/* 다시 계산하기 버튼 */}
                  <button
                    onClick={() => {
                      setStep(1);
                      setHasJob(null);
                      setSalaryStr("");
                      setSideIncomeStr("");
                      setIncomeType(null);
                      setIsSharedResult(false);
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, "", window.location.pathname);
                      }
                    }}
                    className="w-full h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-[#e5e8eb] transition-all active:scale-[0.98]"
                  >
                    <Calculator size={16} />
                    {isSharedResult ? "나도 계산해보기" : "다시 계산하기"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 안내문 */}
        <div className="mt-6 p-4 bg-[#fff8db] rounded-2xl">
          <p className="font-bold text-xs text-[#8b6a00] flex items-center gap-1 mb-1">
            <Info size={14} /> 유의사항
          </p>
          <ul className="text-[11px] text-[#8b6a00] list-disc pl-4 space-y-1">
            <li>
              본 계산 결과는 2026년 현행 기준 단순 모의계산으로, 부양가족이나
              공제 내역에 따라 실제와 다를 수 있습니다.
            </li>
            <li>
              정확한 건강보험료 부과 여부와 종합소득세는 국민건강보험공단 및
              국세청 홈택스에서 확인하시기 바랍니다.
            </li>
          </ul>
        </div>
        {/* 하단 SEO 텍스트 (시맨틱 태그 및 가독성 최적화) */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            2026년 기준 종합소득세 및 건강보험료 피부양자 자격 요건 안내
          </h2>
          <p className="mb-2">
            본 계산기는 2026년 국민건강보험법 시행령 및 소득세법을 기반으로 제작된 <strong>N잡러 및 프리랜서 전용 실수령액 모의계산 애플리케이션</strong>입니다.
          </p>
          <p className="mb-2">
            직장 가입자의 경우 연간 보수 외 소득(부수입 등)이 <strong>2,000만 원</strong>을 초과할 경우 소득월액보험료가 추가로 고지되며, 이는 직장 건보료와 별도로 납부해야 하는 '건보료 폭탄'의 원인이 될 수 있습니다.
          </p>
          <p>
            피부양자 자격을 유지하기 위해서는 연 소득금액 합계액이 <strong>3,400만 원 이하</strong>여야 하나, 사업자등록증이 있는 경우 단 1원의 사업소득이라도 발생 시 자격이 즉각 박탈됩니다. (프리랜서 3.3% 원천징수 등 사업자 미등록 시 500만 원 이하 유지 필요) 반드시 5월 종합소득세 신고 전 본인의 예상 과세표준을 미리 모의계산하여 불이익을 방지하시기 바랍니다.
          </p>
        </article>
      </div>
      {step === 5 && (
        <SubscribeCard defaultCategory="tax" />
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

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Landmark,
  Calculator,
  Info,
  ChevronRight,
  ChevronLeft,
  Share2,
  Building2,
  AlertTriangle,
  PiggyBank,
  TrendingUp,
  Check,
  History,
  CheckCircle2,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

type Step = 1 | 2 | 3 | 4 | 5;
type InstitutionType = "bank" | "mutual" | null;

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export default function TaxCalculatorPage() {
  const [step, setStep] = useState<Step>(1);
  const [amountStr, setAmountStr] = useState<string>("");
  const [rateStr, setRateStr] = useState<string>("");
  const [salaryStr, setSalaryStr] = useState<string>("");
  const [institution, setInstitution] = useState<InstitutionType>(null);
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
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_tax_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  const saveToHistory = (amt: string, r: string, sal: string, inst: InstitutionType) => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        amountStr: amt,
        rateStr: r,
        salaryStr: sal,
        institution: inst,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_tax_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_tax_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          setAmountStr(parsed.amountStr);
          setRateStr(parsed.rateStr);
          setSalaryStr(parsed.salaryStr);
          setInstitution(parsed.institution);
          setStep(5);
          showToastNotification("이전 계산 기록을 불러왔습니다!");
        }
      } catch (e) {
        console.error(e);
      }
    }
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
      const amt = params.get("amt");
      const r = params.get("rate");
      const sal = params.get("sal");
      const inst = params.get("inst");

      if (amt !== null && r !== null && sal !== null && inst !== null) {
        setAmountStr(amt);
        setRateStr(r);
        setSalaryStr(sal);
        setInstitution(inst as InstitutionType);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const amount = amountStr === "" ? 0 : parseInt(amountStr, 10) * 10_000;
  const rate = rateStr === "" ? 0 : parseFloat(rateStr);
  const salary = salaryStr === "" ? 0 : parseInt(salaryStr, 10) * 10_000;

  // 결과 계산
  const results = useMemo(() => {
    if (step < 5) return null;

    const grossInterest = amount * (rate / 100);
    
    // 1. 일반 과세 (15.4%)
    const generalTax = grossInterest * 0.154;
    const generalNet = grossInterest - generalTax;

    // 2. 상호금융 저율과세 (1.4% or 5.0%)
    const isHighIncome = salary > 7000_0000;
    const mutualTaxRate = isHighIncome ? 0.05 : 0.014;
    const mutualTax = grossInterest * mutualTaxRate;
    const mutualNet = grossInterest - mutualTax;

    // 3. 비과세 (0%)
    const taxFreeNet = grossInterest;

    // 사용자가 선택한 실제 수령액
    const myNet = institution === "bank" ? generalNet : mutualNet;
    const myTax = institution === "bank" ? generalTax : mutualTax;
    const myTaxRate = institution === "bank" ? 15.4 : Number((mutualTaxRate * 100).toFixed(1));

    return {
      grossInterest,
      generalTax,
      generalNet,
      mutualTax,
      mutualNet,
      taxFreeNet,
      isHighIncome,
      mutualTaxRate: Number((mutualTaxRate * 100).toFixed(1)),
      myNet,
      myTax,
      myTaxRate,
      maxSavings: generalTax,
      mutualSavings: generalTax - mutualTax,
    };
  }, [step, amount, rate, salary, institution]);

  const canProceed = () => {
    if (step === 1) return amount > 0;
    if (step === 2) return rate > 0;
    if (step === 3) return salaryStr !== "";
    if (step === 4) return institution !== null;
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 5) {
      saveToHistory(amountStr, rateStr, salaryStr, institution);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as Step);
    }
  };

  const handleShare = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 2026 이자 세금 비교 결과 💸\n💰 예치금: ${formatCurrency(amount)}원\n📈 예상 이자(세전): ${formatCurrency(results.grossInterest)}원\n✨ 실수령액(${institution === "bank" ? "일반과세" : "저율과세"}): ${formatCurrency(results.myNet)}원`;
    const shareUrl = `https://lifefit.kr/tools/tax-calculator?amt=${amountStr}&rate=${rateStr}&sal=${salaryStr}&inst=${institution || ""}`;
    const fullText = `${resultText}\n\n👉 내 예적금 이자 세금 1분 만에 비교하기:\n${shareUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 이자 세금 비교 계산기 💸",
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
      showToastNotification("결과 링크가 복사되었습니다! 친구에게 공유해보세요.");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToastNotification("❌ 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (!results) return;
    const shareUrl = `https://lifefit.kr/tools/tax-calculator?amt=${amountStr}&rate=${rateStr}&sal=${salaryStr}&inst=${institution || ""}`;
    const highlightText = `예상 실수령액: 약 ${formatCurrency(results.myNet)}원`;
    shareToKakao({
      title: `2026 이자 세금 비교 계산기 💸`,
      description: `세금 떼고 실제로 받는 예적금 이자 결과. (${highlightText}) 내 실수령액을 1분 만에 확인해 보세요!`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 실수령액 확인하기",
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
            name: "2026 이자 세금 비교 계산기",
            url: "https://lifefit.kr/tools/tax-calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            description: "2026년 기준 시중은행 및 상호금융 예적금 이자 세금 비교 및 실수령액 모의계산기",
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
                name: "이자 세금 비교 계산기",
                item: "https://lifefit.kr/tools/tax-calculator",
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
                "name": "상호금융 저율과세 혜택이란 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "신협, 새마을금고, 단위농협 등 상호금융권에서 예적금 가입 시 발생하는 이자소득세(14%)를 면제해주고 농어촌특별세(1.4%)만 부과하여 이자 수령액을 극대화하는 세제 혜택입니다."
                }
              },
              {
                "@type": "Question",
                "name": "2026년 상호금융 저율과세 한도와 세율 변동 내용은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "상호금융 저율과세 혜택은 전 금융기관 합산 1인당 3,000만 원 한도입니다. 단, 2026년부터 연봉 7,000만 원 초과 고소득자는 저율과세율이 기존 1.4%에서 5.0%로 상향 적용될 예정입니다."
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3182f6] text-white mb-3 shadow-lg">
            <Calculator size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            2026 이자 세금 비교 계산기
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            세금 떼고 실제로 받는 돈, 한눈에 비교하세요
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
                예치할 금액을 입력해주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                예금 또는 적금의 총 원금을 입력합니다.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder="예: 3000"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[500, 1000, 3000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmountStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val >= 10000 ? `${val/10000}억` : `${val}만`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                연 이자율은 몇 % 인가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                세전 금리를 소수점까지 입력할 수 있습니다.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                  placeholder="예: 3.5"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  %
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[2.0, 3.0, 3.5, 4.0, 5.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => setRateStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                본인의 연봉은 얼마인가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                2026년 고소득자 저율과세 인상 여부를 판정합니다.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(e.target.value)}
                  placeholder="예: 5000"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[3000, 5000, 7000, 8000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSalaryStr(String(val))}
                    className={`px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors ${val > 7000 ? 'text-red-500' : ''}`}
                  >
                    {val >= 10000 ? `${val/10000}억` : `${val}만`}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#8b95a1] leading-relaxed">
                ※ 총급여 7,000만 원 초과 시 상호금융 저율과세가 1.4% → 5.0%로 인상될 예정입니다.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                가입하려는 금융기관 유형은?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                기관에 따라 적용되는 세금이 다릅니다.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setInstitution("bank")}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    institution === "bank"
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2
                      size={24}
                      className={
                        institution === "bank" ? "text-[#3182f6]" : "text-[#8b95a1]"
                      }
                    />
                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          institution === "bank" ? "text-[#3182f6]" : "text-[#191f28]"
                        }`}
                      >
                        시중은행 (1금융권)
                      </p>
                      <p className="text-xs text-[#8b95a1]">국민, 신한, 토스뱅크 등</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setInstitution("mutual")}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    institution === "mutual"
                      ? "border-[#3182f6] bg-[#e8f3ff]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark
                      size={24}
                      className={
                        institution === "mutual" ? "text-[#3182f6]" : "text-[#8b95a1]"
                      }
                    />
                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          institution === "mutual" ? "text-[#3182f6]" : "text-[#191f28]"
                        }`}
                      >
                        상호금융 (신협, 새마을금고 등)
                      </p>
                      <p className="text-xs text-[#8b95a1]">농협, 수협, 산림조합 포함</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 5 && results && (
            <div className="animate-fade-in space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800 border border-blue-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 이자 결과지입니다!
                </div>
              )}
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-[#191f28]">나의 예상 수령액</h2>
                <p className="text-sm text-[#8b95a1] mt-1">
                  선택하신 금융기관 기준 실수령액입니다.
                </p>
              </div>

              {/* [핵심] 나의 선택 결과 강조 */}
              <div className="rounded-3xl p-6 bg-[#3182f6] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                <div className="absolute right-[-10px] top-[-10px] opacity-10">
                  <Calculator size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-tight">
                      {institution === "bank" ? "시중은행 일반과세" : `상호금융 저율과세(${results.mutualTaxRate}%)`}
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold mb-1">
                    {formatCurrency(results.myNet)}원
                  </p>
                  <p className="text-sm text-white/70">
                    세전 이자 {formatCurrency(results.grossInterest)}원 중 세금 {formatCurrency(results.myTax)}원 차감
                  </p>
                </div>
              </div>

              {/* 다른 방식과 비교 안내 */}
              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#191f28] mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#3182f6]" />
                  금융기관만 바꿔도 더 받을 수 있어요
                </h3>
                
                <div className="space-y-3">
                  {/* 상호금융 비교 (시중은행 선택 시에만 노출) */}
                  {institution === "bank" && (
                    <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#e5e8eb] flex justify-between items-center group hover:border-[#3182f6] transition-all">
                      <div>
                        <p className="text-xs font-bold text-[#8b95a1] mb-1">상호금융(신협/새마을금고) 이용 시</p>
                        <p className="text-lg font-bold text-[#191f28]">{formatCurrency(results.mutualNet)}원</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-[#3182f6] bg-[#e8f3ff] px-2 py-1 rounded-lg">
                          +{formatCurrency(results.mutualSavings)}원 더 받음
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 비과세 비교 (항상 노출하여 혜택 인지) */}
                  <div className="p-5 rounded-2xl bg-[#e6f9f1] border border-[#00c471] flex justify-between items-center group transition-all">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <p className="text-xs font-bold text-[#00c471]">비과세 종합저축 대상일 경우</p>
                        <span className="text-[9px] bg-[#00c471] text-white px-1.5 py-0.5 rounded font-bold">BEST</span>
                      </div>
                      <p className="text-lg font-bold text-[#191f28]">{formatCurrency(results.taxFreeNet)}원</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-[#00c471] bg-white/60 px-2 py-1 rounded-lg">
                        +{formatCurrency(results.grossInterest - results.myNet)}원 더 받음
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 알림/팁 */}
              {results.isHighIncome && (
                <div className="p-4 bg-[#fdf0f1] border border-[#f04452] rounded-2xl flex gap-3">
                  <AlertTriangle size={20} className="text-[#f04452] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#f04452] mb-1">2026년 세율 인상 대상자입니다</p>
                    <p className="text-[11px] text-[#191f28] leading-normal text-opacity-80">
                      연봉 7,000만 원 초과로 인해 상호금융 저율과세율이 기존 1.4%에서 5.0%로 상향 적용되었습니다.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#e8f3ff] rounded-2xl flex gap-3">
                <PiggyBank size={20} className="text-[#3182f6] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#3182f6] mb-1">수익 극대화 팁</p>
                  <p className="text-[11px] text-[#191f28] leading-normal text-opacity-80">
                    {institution === "bank" 
                      ? "시중은행보다는 상호금융(신협, 새마을금고)의 저율과세 혜택을 이용하면 약 10~14%의 세금을 아낄 수 있습니다. (1인당 3천만원 한도)"
                      : "상호금융 가입 시 출자금 통장을 함께 활용하면 배당금 비과세 혜택도 챙길 수 있습니다."}
                  </p>
                </div>
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
              <div className="w-full mt-2 pt-6 border-t border-[#f2f4f6] space-y-4 text-center">
                <div>
                  <p className="text-sm font-bold text-[#191f28]">
                    🎉 내 예상 결과 주변에 공유하기
                  </p>
                  <p className="text-xs text-[#8b95a1] mt-1">
                    친구들도 이자 세금을 아낄 수 있도록 계산 결과를 공유해 보세요!
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
                      setAmountStr("");
                      setRateStr("");
                      setSalaryStr("");
                      setInstitution(null);
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
              본 계산 결과는 2026년 세법 개정안을 기준으로 한 모의계산이며, 실제 적용 세율은 정부 정책에 따라 변경될 수 있습니다.
            </li>
            <li>
              상호금융 저율과세는 전 금융기관 합산 1인당 3,000만 원 한도로 적용됩니다.
            </li>
            <li>
              비과세 종합저축은 만 65세 이상 등 특정 요건 충족 시 5,000만 원 한도로 가입 가능합니다.
            </li>
          </ul>
        </div>

        {/* 하단 SEO 텍스트 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            2026년 상호금융 저율과세 및 이자소득세 안내
          </h2>
          <p className="mb-2">
            최근 예적금 금리가 변동함에 따라 <strong>이자소득세(15.4%)</strong>를 제외한 실제 수령액을 계산하는 것이 중요해졌습니다. 특히 2026년부터는 고소득자에 대한 세제 혜택이 축소될 예정입니다.
          </p>
          <p className="mb-2">
            <strong>상호금융 저율과세</strong>란 신협, 새마을금고, 단위농협 등에서 예금 가입 시 이자소득세 14%를 면제해주고 농어촌특별세만 부과하는 제도입니다. 현재는 1.4%가 적용되지만, 2026년부터 연봉 7,000만 원 초과 시 <strong>5.0%</strong>로 세율이 인상됩니다.
          </p>
          <p>
            저율과세 혜택은 1인당 3,000만 원 한도이므로, 한도를 초과하는 금액은 시중은행과 동일한 15.4% 세율이 적용됩니다. 본 계산기를 통해 본인의 연봉 조건과 예치 금액에 따른 최적의 금융기관을 선택해 보시기 바랍니다.
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

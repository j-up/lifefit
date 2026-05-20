"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Calculator,
  Wallet,
  Clock,
  Baby,
  Banknote,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Circle,
  Share2,
  Coins,
  Landmark,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const MAX_WAGE_CAP = 2_500_000; // 2026년 고용보험 상한액 (고시 기준)

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

function estimateNetPayRatio(gross: number): number {
  const brackets = [
    { limit: 0, rate: 0 },
    { limit: 1_000_000, rate: 0.10 },
    { limit: 2_000_000, rate: 0.12 },
    { limit: 3_000_000, rate: 0.15 },
    { limit: 4_000_000, rate: 0.17 },
    { limit: 5_000_000, rate: 0.19 },
    { limit: 6_000_000, rate: 0.21 },
    { limit: 7_000_000, rate: 0.23 },
    { limit: 8_000_000, rate: 0.25 },
    { limit: 9_000_000, rate: 0.27 },
    { limit: 10_000_000, rate: 0.29 },
    { limit: 15_000_000, rate: 0.33 },
    { limit: 20_000_000, rate: 0.36 },
  ];

  let lower = brackets[0];
  let upper = brackets[brackets.length - 1];

  for (let i = 0; i < brackets.length - 1; i++) {
    if (gross >= brackets[i].limit && gross <= brackets[i + 1].limit) {
      lower = brackets[i];
      upper = brackets[i + 1];
      break;
    }
    if (gross > brackets[i + 1].limit) {
      lower = brackets[i + 1];
    }
  }

  if (gross >= upper.limit) return 1 - upper.rate;
  if (lower.limit === upper.limit) return 1 - lower.rate;

  const t = (gross - lower.limit) / (upper.limit - lower.limit);
  const rate = lower.rate + t * (upper.rate - lower.rate);
  return 1 - rate;
}

function AdSenseBanner({
  slot = "5604101234",
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense placement error:", err);
    }
  }, []);

  return (
    <div className={`w-full my-4 overflow-hidden rounded-2xl bg-white border border-[#e5e8eb] p-3 text-center ${className}`}>
      <span className="block text-[9px] font-bold text-[#b0b8c1] tracking-wider uppercase mb-1.5">ADVERTISEMENT</span>
      <div className="flex items-center justify-center min-h-[100px] bg-[#f8f9fa] rounded-xl relative">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7832182931355116"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
          <Coins size={24} className="text-[#b0b8c1] mb-1" />
          <span className="text-[10px] text-[#8b95a1]">구글 맞춤 광고 영역</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [salaryStr, setSalaryStr] = useState<string>("");
  const [originalHours, setOriginalHours] = useState<number>(40);
  const [reducedHours, setReducedHours] = useState<number>(30);
  const [isFirst12Months, setIsFirst12Months] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharedResult, setIsSharedResult] = useState(false);
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

  // Load Kakao SDK on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const kakao = (window as any).Kakao;
      if (kakao && !kakao.isInitialized()) {
        try {
          kakao.init("d5745b5e1623229be8701723aa5f3bb4");
        } catch (e) {
          console.error("Kakao initialization failed on mount:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sal = params.get("sal");
      const orig = params.get("orig");
      const red = params.get("red");
      const first = params.get("first");

      if (sal !== null && orig !== null && red !== null && first !== null) {
        setSalaryStr(sal);
        setOriginalHours(parseInt(orig, 10));
        setReducedHours(parseInt(red, 10));
        setIsFirst12Months(first === "1");
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const salary = salaryStr === "" ? 0 : parseInt(salaryStr, 10) * 10_000;

  const results = useMemo(() => {
    if (salary <= 0 || originalHours <= 0) return null;

    const companyPay = salary * (reducedHours / originalHours);
    const reductionRatio = (originalHours - reducedHours) / originalHours;
    const baseWage = Math.min(salary, MAX_WAGE_CAP);
    const govSupportBase = baseWage * reductionRatio;
    const govSupport = isFirst12Months
      ? govSupportBase
      : govSupportBase * 0.8;

    const netRatio = estimateNetPayRatio(companyPay);
    const companyNet = companyPay * netRatio;
    const totalNet = companyNet + govSupport;

    return {
      companyPay,
      companyNet,
      govSupport,
      totalNet,
      reductionRatio,
    };
  }, [salary, originalHours, reducedHours, isFirst12Months]);

  const canProceed = useCallback(() => {
    switch (step) {
      case 1:
        return salary > 0;
      case 2:
        return originalHours > 0;
      case 3:
        return reducedHours >= 15 && reducedHours < originalHours;
      case 4:
        return isFirst12Months !== null;
      default:
        return true;
    }
  }, [step, salary, originalHours, reducedHours, isFirst12Months]);

  const nextStep = useCallback(() => {
    if (!canProceed()) return;
    if (step < 5) setStep((s) => (s + 1) as Step);
  }, [canProceed, step]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }, [step]);

  const handleKakaoShare = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 2026 육아기 근로시간 단축 급여 모의계산 👶\n✅ 내 예상 실수령액: 월 ${formatCurrency(results.totalNet)}원\n(회사 월급 ${formatCurrency(results.companyPay)}원 + 고용보험 지원금 ${formatCurrency(results.govSupport)}원)`;
    const shareUrl = `https://lifefit.kr/tools/short-work?sal=${salaryStr}&orig=${originalHours}&red=${reducedHours}&first=${isFirst12Months ? 1 : 0}`;
    const fullText = `${resultText}\n\n👉 나도 1분 만에 계산해보기:\n${shareUrl}`;

    // 1. Try Kakao JS SDK (with dynamic initialization on click)
    const kakao = (window as any).Kakao;
    if (kakao) {
      if (!kakao.isInitialized()) {
        try {
          kakao.init("d5745b5e1623229be8701723aa5f3bb4");
        } catch (e) {
          console.error("Kakao dynamic initialization failed:", e);
        }
      }

      if (kakao.isInitialized()) {
        try {
          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: "LifeFit 육아기 단축근무 급여 계산기 👶",
              description: `내 예상 실수령액은 월 약 ${formatCurrency(results.totalNet)}원! 회사 월급과 고용보험 지원금 모의계산을 1분만에 확인해보세요!`,
              imageUrl: "https://lifefit.kr/og-short-work.png",
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
            buttons: [
              {
                title: "내 예상 수령액 확인하기",
                link: {
                  mobileWebUrl: shareUrl,
                  webUrl: shareUrl,
                },
              },
            ],
          });
          return;
        } catch (err) {
          console.error("Kakao share error", err);
        }
      }
    }

    // 2. Fallback: Copy to Clipboard & Show Premium Toast
    try {
      await navigator.clipboard.writeText(fullText);
      showToastNotification("결과가 복사되었습니다! 💬 카카오톡을 열어 친구에게 붙여넣기(Ctrl+V)해보세요!");
    } catch {
      showToastNotification("복사에 실패했습니다. 수동으로 주소를 복사해주세요.");
    }
  };

  const handleCopyLink = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 2026 육아기 근로시간 단축 급여 모의계산 👶\n✅ 내 예상 실수령액: 월 ${formatCurrency(results.totalNet)}원\n(회사 월급 ${formatCurrency(results.companyPay)}원 + 고용보험 지원금 ${formatCurrency(results.govSupport)}원)`;
    const shareUrl = `https://lifefit.kr/tools/short-work?sal=${salaryStr}&orig=${originalHours}&red=${reducedHours}&first=${isFirst12Months ? 1 : 0}`;
    const fullText = `${resultText}\n\n👉 나도 1분 만에 계산해보기:\n${shareUrl}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      showToastNotification("결과 링크가 클립보드에 복사되었습니다!");
    } catch {
      showToastNotification("링크 복사에 실패했습니다.");
    }
  };

  const stepTitles = [
    "세전 월급 입력",
    "현재 근무 시간",
    "단축 후 근무 시간",
    "단축 기간 구분",
    "예상 실수령액",
  ];

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 pt-6 pb-28 sm:pt-10 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 육아기 근로시간 단축 급여 계산기",
            url: "https://lifefit.kr/tools/short-work",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            description: "2026년 기준 육아기 근로시간 단축 급여액, 회사 지급액, 고용보험 지원금 및 최종 실수령액 모의계산기",
          }),
        }}
      />
      <div className="w-full max-w-[420px]">
        {/* 메인으로 가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors mb-4"
        >
          ← 메인으로 돌아가기
        </Link>
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3182f6] text-white mb-3 shadow-lg shadow-blue-200">
            <Calculator size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            2026 육아기 단축근무
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            실수령액 모의 계산기
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          {[1, 2, 3, 4, 5].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s === step
                    ? "bg-[#3182f6] text-white"
                    : s < step
                    ? "bg-[#e8f3ff] text-[#3182f6]"
                    : "bg-white text-[#8b95a1] border border-[#e5e8eb]"
                }`}
              >
                {s < step ? <CheckCircle2 size={16} /> : s}
              </div>
              {idx < 4 && (
                <div
                  className={`w-6 h-0.5 mx-1 ${
                    s < step ? "bg-[#3182f6]" : "bg-[#e5e8eb]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(0,27,55,0.05)]">
          <h2 className="text-lg font-bold text-[#191f28] mb-1">
            {stepTitles[step - 1]}
          </h2>
          <p className="text-sm text-[#8b95a1] mb-6">
            {step === 1 && "세전 월급을 만원 단위로 입력해 주세요."}
            {step === 2 && "현재 주당 근무 시간을 선택해 주세요."}
            {step === 3 && "단축 후 주당 근무 시간을 선택해 주세요."}
            {step === 4 && "단축 시작 후 최초 12개월인가요?"}
            {step === 5 && "예상 지급액을 확인해 보세요."}
          </p>

          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Wallet
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b95a1]"
                  size={20}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={salaryStr}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) {
                      setSalaryStr(val);
                    }
                  }}
                  placeholder="예: 350"
                  className="w-full h-14 pl-12 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-[#3182f6] transition-shadow"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[200, 250, 300, 350, 400, 450, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSalaryStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] font-medium hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val}만
                  </button>
                ))}
              </div>
              {salary > 0 && (
                <p className="text-sm text-[#3182f6] font-medium">
                  입력하신 세전 월급: {formatCurrency(salary)}원
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-3 gap-3">
              {[40, 44, 52].map((h) => (
                <button
                  key={h}
                  onClick={() => setOriginalHours(h)}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all ${
                    originalHours === h
                      ? "border-[#3182f6] bg-[#e8f3ff] text-[#3182f6]"
                      : "border-[#e5e8eb] bg-white text-[#4e5968] hover:border-[#b0b8c1]"
                  }`}
                >
                  <Clock size={20} className="mb-1" />
                  <span className="text-lg font-bold">{h}시간</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8b95a1]">단축 후 근무시간</span>
                <span className="text-2xl font-bold text-[#3182f6]">
                  {reducedHours}
                  <span className="text-base font-medium text-[#4e5968] ml-1">
                    시간
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={35}
                step={1}
                value={reducedHours}
                onChange={(e) => setReducedHours(parseInt(e.target.value, 10))}
              />
              <div className="flex justify-between text-xs text-[#8b95a1] px-1">
                <span>15시간</span>
                <span>25시간</span>
                <span>35시간</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[15, 20, 25, 30, 35].map((h) => (
                  <button
                    key={h}
                    onClick={() => setReducedHours(h)}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                      reducedHours === h
                        ? "border-[#3182f6] bg-[#e8f3ff] text-[#3182f6]"
                        : "border-[#e5e8eb] bg-white text-[#4e5968] hover:border-[#b0b8c1]"
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
              {reducedHours >= originalHours && (
                <p className="text-sm text-[#f04452] flex items-center gap-1">
                  <AlertCircle size={14} />
                  단축 후 시간은 현재 근무시간보다 적어야 합니다.
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <button
                onClick={() => setIsFirst12Months(true)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  isFirst12Months === true
                    ? "border-[#3182f6] bg-[#e8f3ff]"
                    : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Baby
                    size={22}
                    className={
                      isFirst12Months === true
                        ? "text-[#3182f6]"
                        : "text-[#8b95a1]"
                    }
                  />
                  <div className="text-left">
                    <p
                      className={`font-bold ${
                        isFirst12Months === true
                          ? "text-[#3182f6]"
                          : "text-[#191f28]"
                      }`}
                    >
                      네, 최초 12개월이에요
                    </p>
                    <p className="text-xs text-[#8b95a1]">
                      통상임금 100% 상한 내 지원
                    </p>
                  </div>
                </div>
                {isFirst12Months === true ? (
                  <CheckCircle2 size={22} className="text-[#3182f6]" />
                ) : (
                  <Circle size={22} className="text-[#e5e8eb]" />
                )}
              </button>

              <button
                onClick={() => setIsFirst12Months(false)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  isFirst12Months === false
                    ? "border-[#3182f6] bg-[#e8f3ff]"
                    : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock
                    size={22}
                    className={
                      isFirst12Months === false
                        ? "text-[#3182f6]"
                        : "text-[#8b95a1]"
                    }
                  />
                  <div className="text-left">
                    <p
                      className={`font-bold ${
                        isFirst12Months === false
                          ? "text-[#3182f6]"
                          : "text-[#191f28]"
                      }`}
                    >
                      아니요, 12개월이 지났어요
                    </p>
                    <p className="text-xs text-[#8b95a1]">
                      통상임금 80% 상한 내 지원
                    </p>
                  </div>
                </div>
                {isFirst12Months === false ? (
                  <CheckCircle2 size={22} className="text-[#3182f6]" />
                ) : (
                  <Circle size={22} className="text-[#e5e8eb]" />
                )}
              </button>
            </div>
          )}

          {step === 5 && results && (
            <div className="space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800 border border-blue-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 단축근무 결과지입니다!
                </div>
              )}


              {/* Total Net */}
              <div className="text-center py-4">
                <p className="text-sm text-[#8b95a1] mb-1">
                  내가 받을 최종 예상 실수령액
                </p>
                <p className="text-4xl font-extrabold text-[#191f28] tracking-tight">
                  {formatCurrency(results.totalNet)}
                  <span className="text-xl font-bold ml-1">원</span>
                </p>
                <p className="text-xs text-[#8b95a1] mt-2">
                  ※ 세전 기준 회사 급여 공제율 추정 + 비과세 지원금 합산
                </p>
              </div>

              {/* Bar Chart */}
              <div className="bg-[#f8f9fa] rounded-2xl p-4 space-y-4">
                <p className="text-sm font-bold text-[#4e5968]">
                  월별 예상 수입 구성
                </p>
                <div className="space-y-3">
                  {/* Company Net */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4e5968] font-medium">
                        회사 지급 급여 (공제 후)
                      </span>
                      <span className="text-[#191f28] font-bold">
                        {formatCurrency(results.companyNet)}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                      <div
                        className="h-full bg-[#8b95a1] rounded-full transition-all duration-700"
                        style={{
                          width: `${
                            results.totalNet > 0
                              ? (results.companyNet / results.totalNet) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  {/* Gov Support */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4e5968] font-medium">
                        정부 지원 단축 급여
                      </span>
                      <span className="text-[#3182f6] font-bold">
                        {formatCurrency(results.govSupport)}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                      <div
                        className="h-full bg-[#3182f6] rounded-full transition-all duration-700"
                        style={{
                          width: `${
                            results.totalNet > 0
                              ? (results.govSupport / results.totalNet) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8f9fa] rounded-2xl p-4 text-center">
                  <Banknote
                    size={20}
                    className="mx-auto mb-2 text-[#8b95a1]"
                  />
                  <p className="text-xs text-[#8b95a1] mb-0.5">
                    회사 세전 지급액
                  </p>
                  <p className="text-base font-bold text-[#191f28]">
                    {formatCurrency(results.companyPay)}원
                  </p>
                </div>
                <div className="bg-[#f8f9fa] rounded-2xl p-4 text-center">
                  <TrendingUp
                    size={20}
                    className="mx-auto mb-2 text-[#3182f6]"
                  />
                  <p className="text-xs text-[#8b95a1] mb-0.5">
                    정부 지원금
                  </p>
                  <p className="text-base font-bold text-[#3182f6]">
                    {formatCurrency(results.govSupport)}원
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-2xl bg-[#fff8db] p-4 text-xs text-[#8b6a00] leading-relaxed">
                <p className="font-bold mb-1">참고 사항</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>
                    정부 지원금은 통상임금 상한액 {formatCurrency(MAX_WAGE_CAP)}원
                    기준으로 산정됩니다.
                  </li>
                  <li>
                    최초 12개월은 통상임금 100%, 이후 80% 지원됩니다.
                  </li>
                  <li>
                    회사 지급분 공제율은 세전 급여 기준 추정치이며, 실제
                  실수령액은 근무 환경에 따라 달라질 수 있습니다.
                  </li>
                </ul>
              </div>



              {/* 상단 애드센스 배너 (CTR 향상) */}
              <AdSenseBanner slot="7832182931355116" className="my-2" />

              {/* CTA */}
              <Link
                href="/tools/short-work/parking"
                className="block w-full py-4 rounded-2xl bg-[#00c471] text-white text-center font-bold text-sm shadow-lg shadow-green-200 hover:bg-[#00b065] transition-colors"
              >
                정부 지원 육아수당 모으기 좋은
                <br />
                고금리 파킹통장 비교하러 가기
              </Link>

              {/* 하단 애드센스 배너 (CTR 극대화) */}
              <AdSenseBanner slot="7832182931355116" className="my-2" />
            </div>
          )}

          {/* Navigation */}
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
                    ? "bg-[#3182f6] text-white shadow-md shadow-blue-200 hover:bg-[#1e6fdb]"
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
                    친구들도 육아기 단축근무 실수령액 계산을 해볼 수 있게 알려주세요!
                  </p>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  {/* 카카오톡 공유하기 버튼 - 브랜드 칼라 #FEE500 */}
                  <button
                    onClick={handleKakaoShare}
                    type="button"
                    className="w-full h-12 rounded-2xl bg-[#FEE500] text-[#3c1e1e] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#FADA0A] transition-all shadow-sm active:scale-[0.98]"
                  >
                    <span className="text-lg">💬</span>
                    카카오톡으로 친구에게 알려주기
                  </button>
                  
                  <div className="flex gap-2">
                    {/* 다시 계산하기 버튼 */}
                    <button
                      onClick={() => {
                        setStep(1);
                        setSalaryStr("");
                        setOriginalHours(40);
                        setReducedHours(30);
                        setIsFirst12Months(null);
                        setIsSharedResult(false);
                        if (typeof window !== "undefined") {
                          window.history.replaceState({}, "", window.location.pathname);
                        }
                      }}
                      className="flex-1 h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-[#e5e8eb] transition-all active:scale-[0.98]"
                    >
                      <Calculator size={16} />
                      {isSharedResult ? "나도 계산해보기" : "다시 계산하기"}
                    </button>
                    
                    {/* 링크 복사 버튼 */}
                    <button
                      onClick={handleCopyLink}
                      className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                        isCopied
                          ? "bg-[#e8f9f0] text-[#00c471]"
                          : "bg-[#3182f6] text-white hover:bg-[#1e6fdb] shadow-md shadow-blue-100"
                      }`}
                    >
                      {isCopied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
                      {isCopied ? "복사 완료!" : "링크 주소 복사"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#b0b8c1] mt-6 leading-relaxed">
          본 계산기는 2026년 고용보험 육아기 근로시간 단축 급여 고시 기준을
          반영한 모의계산 도구입니다.
          <br />
          실제 지급액과 차이가 있을 수 있으니 고용노동부 또는 관할 고용센터에
          확인하시기 바랍니다.
        </p>
        {/* 하단 SEO 텍스트 (시맨틱 태그 및 가독성 최적화) */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            2026년 고용노동부 고시 기준 육아기 근로시간 단축 급여 지급 기준 안내
          </h2>
          <p className="mb-2">
            본 계산기는 고용보험법에 명시된 <strong>2026년 최신 육아기 근로시간 단축 급여 산정 방식</strong>을 기반으로 제작되었습니다.
          </p>
          <p className="mb-2">
            자녀가 만 12세 이하(초등학교 6학년 이하)인 근로자는 주 15시간~35시간 사이로 단축 근무를 신청할 수 있습니다. 단축 후 최초 12개월 동안은 <strong>통상임금의 100% (상한액 200만 원)</strong>를 기준으로 고용보험에서 단축된 시간만큼 비례하여 급여를 지원합니다.
          </p>
          <p>
            근로자는 회사로부터 단축된 근무 시간에 비례한 임금을 지급받으며, 고용보험의 지원금을 합산하여 실질적인 급여 감소를 최소화할 수 있습니다. 본 모의계산 결과는 예상치이므로 정확한 실수령액은 관할 고용센터를 통해 확인하시기 바랍니다.
          </p>
        </article>
      </div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#191f28] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-toast text-center whitespace-nowrap border border-[rgba(255,255,255,0.1)]">
          <span>💬</span>
          {toastMessage}
        </div>
      )}
    </main>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  TrendingUp,
  Info,
  Share2,
  ChevronRight,
  ChevronLeft,
  History,
  CheckCircle2,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";
import { shareToKakao } from "@/app/utils/kakaoShare";

type Step = 1 | 2 | 3 | 4 | 5;

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 입금 회차별 예정일 계산
function getScheduledDates(startDate: Date, months: number): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < months; i++) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + i);
    dates.push(d);
  }
  return dates;
}

export default function SavingsPlanPage() {
  const [step, setStep] = useState<Step>(1);
  const [amountStr, setAmountStr] = useState<string>("");
  const [period, setPeriod] = useState<12 | 24>(12);
  const [rateStr, setRateStr] = useState<string>("");
  const [startDateStr, setStartDateStr] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [isSharedResult, setIsSharedResult] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [parkingRateStr, setParkingRateStr] = useState<string>("3.5");
  const [depositRateStr, setDepositRateStr] = useState<string>("3.0");

  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleIcsDownload = (schedule: { date: Date; count: number; amount: number }[], planName: string) => {
    try {
      let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LifeFit//Savings Plan//KO\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";
      
      schedule.forEach((item, idx) => {
        const d = new Date(item.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;
        
        const uid = `savings_plan_${Date.now()}_${idx}_${planName}@lifefit.kr`;
        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
        const nowDay = String(now.getDate()).padStart(2, '0');
        const nowHour = String(now.getHours()).padStart(2, '0');
        const nowMin = String(now.getMinutes()).padStart(2, '0');
        const nowSec = String(now.getSeconds()).padStart(2, '0');
        const dtStamp = `${nowYear}${nowMonth}${nowDay}T${nowHour}${nowMin}${nowSec}Z`;
        
        icsContent += "BEGIN:VEVENT\r\n";
        icsContent += `UID:${uid}\r\n`;
        icsContent += `DTSTAMP:${dtStamp}\r\n`;
        icsContent += `DTSTART;VALUE=DATE:${dateStr}\r\n`;
        icsContent += `SUMMARY:[선납이연] ${idx + 1}회차 납입 (${item.count}회차분)\r\n`;
        icsContent += `DESCRIPTION:LifeFit 선납이연 플랜 (${planName})\\n납입 금액: ${new Intl.NumberFormat('ko-KR').format(item.amount)}원\\n적금 회차: ${item.count}회차분 납입\\n서비스 바로가기: https://lifefit.kr/tools/savings-plan\r\n`;
        icsContent += "END:VEVENT\r\n";
      });
      
      icsContent += "END:VCALENDAR";
      
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lifefit_savings_plan_${planName}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToastNotification("📅 캘린더 파일(.ics)이 다운로드되었습니다. 실행 시 달력에 일정이 등록됩니다.");
    } catch (err) {
      console.error(err);
      showToastNotification("❌ 파일 생성 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_savings_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  const saveToHistory = (amt: string, p: number, r: string, start: string) => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        amountStr: amt,
        period: p,
        rateStr: r,
        startDateStr: start,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_savings_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_savings_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          setAmountStr(parsed.amountStr);
          setPeriod(parsed.period);
          setRateStr(parsed.rateStr);
          setStartDateStr(parsed.startDateStr);
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
      const p = params.get("period");
      const r = params.get("rate");
      const s = params.get("start");

      if (amt !== null && p !== null && r !== null && s !== null) {
        setAmountStr(amt);
        setPeriod(parseInt(p, 10) as 12 | 24);
        setRateStr(r);
        setStartDateStr(s);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const amount = amountStr === "" ? 0 : parseInt(amountStr, 10) * 10000;
  const rate = rateStr === "" ? 0 : parseFloat(rateStr);
  const startDate = useMemo(() => new Date(startDateStr), [startDateStr]);

  const parkingRate = parkingRateStr === "" ? 0 : parseFloat(parkingRateStr);
  const depositRate = depositRateStr === "" ? 0 : parseFloat(depositRateStr);

  const results = useMemo(() => {
    if (step < 5) return null;

    const n = period;
    const scheduledDates = getScheduledDates(startDate, n);
    const maturityDate = new Date(scheduledDates[n - 1]);
    maturityDate.setMonth(maturityDate.getMonth() + 1);

    // 일반 적금 이자 계산
    let totalNormalInterest = 0;
    for (let i = 1; i <= n; i++) {
      totalNormalInterest += amount * (rate / 100) * ((n - i + 1) / 12);
    }

    const taxRate = 0.154;
    const netNormalInterest = totalNormalInterest * (1 - taxRate);

    // 예금 환산 이자 계산 (동일 금액을 정기예금에 예치했을 때)
    const depositInterestRaw = (amount * n) * (depositRate / 100);
    const netDepositInterest = depositInterestRaw * (1 - taxRate);

    // 각 플랜별 파킹통장 추가 이자 계산 (세후)
    const getParkingInterest = (type: "6-1-5" | "1-11" | "6-6") => {
      let interest = 0;
      if (n === 12) {
        if (type === "6-1-5") {
          // 6개월분 파킹(6개월간) + 5개월분 파킹(5개월간)
          interest = (amount * 6 * (parkingRate / 100) * (6 / 12)) + 
                     (amount * 5 * (parkingRate / 100) * (5 / 12));
        } else if (type === "1-11") {
          // 11개월분 파킹(6개월간)
          interest = amount * 11 * (parkingRate / 100) * (6 / 12);
        } else if (type === "6-6") {
          // 6개월분 파킹(6개월간)
          interest = amount * 6 * (parkingRate / 100) * (6 / 12);
        }
      } else { // 24개월
        if (type === "6-1-5") { // 12-1-11 플랜
          interest = (amount * 12 * (parkingRate / 100) * (12 / 12)) + 
                     (amount * 11 * (parkingRate / 100) * (11 / 12));
        } else if (type === "1-11") { // 1-23 플랜
          interest = amount * 23 * (parkingRate / 100) * (12 / 12);
        } else if (type === "6-6") { // 12-12 플랜
          interest = amount * 12 * (parkingRate / 100) * (12 / 12);
        }
      }
      return interest * (1 - taxRate);
    };

    const getPlanSchedule = (type: "6-1-5" | "1-11" | "6-6") => {
      const schedule: { date: Date; count: number; amount: number }[] = [];
      const d1 = new Date(scheduledDates[0]);
      
      if (n === 12) {
        const d7 = new Date(scheduledDates[6] || scheduledDates[0]);
        if (type === "6-1-5") {
          schedule.push({ date: d1, count: 6, amount: amount * 6 });
          schedule.push({ date: d7, count: 1, amount: amount * 1 });
          const dLast = new Date(maturityDate);
          dLast.setDate(dLast.getDate() - 1);
          schedule.push({ date: dLast, count: 5, amount: amount * 5 });
        } else if (type === "1-11") {
          schedule.push({ date: d1, count: 1, amount: amount * 1 });
          schedule.push({ date: d7, count: 11, amount: amount * 11 });
        } else if (type === "6-6") {
          schedule.push({ date: d1, count: 6, amount: amount * 6 });
          schedule.push({ date: d7, count: 6, amount: amount * 6 });
        }
      } else { // 24개월
        const d13 = new Date(scheduledDates[12] || scheduledDates[0]);
        if (type === "6-1-5") { // 12-1-11 플랜
          schedule.push({ date: d1, count: 12, amount: amount * 12 });
          schedule.push({ date: d13, count: 1, amount: amount * 1 });
          const dLast = new Date(maturityDate);
          dLast.setDate(dLast.getDate() - 1);
          schedule.push({ date: dLast, count: 11, amount: amount * 11 });
        } else if (type === "1-11") { // 1-23 플랜
          schedule.push({ date: d1, count: 1, amount: amount * 1 });
          schedule.push({ date: d13, count: 23, amount: amount * 23 });
        } else if (type === "6-6") { // 12-12 플랜
          schedule.push({ date: d1, count: 12, amount: amount * 12 });
          schedule.push({ date: d13, count: 12, amount: amount * 12 });
        }
      }
      return schedule;
    };

    const getPlanName = (type: "6-1-5" | "1-11" | "6-6") => {
      if (n === 12) {
        if (type === "6-1-5") return "6-1-5 플랜";
        if (type === "1-11") return "1-11 플랜";
        return "6-6 플랜";
      } else {
        if (type === "6-1-5") return "12-1-11 플랜";
        if (type === "1-11") return "1-23 플랜";
        return "12-12 플랜";
      }
    };

    const plans = (["6-1-5", "1-11", "6-6"] as const).map((type) => {
      const pInterest = getParkingInterest(type);
      const combinedInterest = netNormalInterest + pInterest;
      const extraBenefit = combinedInterest - netDepositInterest;
      return {
        name: getPlanName(type),
        type,
        schedule: getPlanSchedule(type),
        parkingInterest: pInterest,
        combinedInterest,
        extraBenefit,
      };
    });

    return {
      totalPrincipal: amount * n,
      totalNormalInterest,
      netNormalInterest,
      netDepositInterest,
      maturityDate,
      plans,
    };
  }, [step, amount, period, rate, startDate, parkingRate, depositRate]);

  const canProceed = () => {
    if (step === 1) return amount > 0;
    if (step === 2) return true;
    if (step === 3) return rate > 0;
    if (step === 4) return startDateStr !== "";
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 5) {
      saveToHistory(amountStr, period, rateStr, startDateStr);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleShare = async () => {
    if (!results) return;
    const resultText = `[LifeFit] 적금 선납이연 계산기 💰\n월 ${formatCurrency(amount)}원, ${period}개월, ${rate}% 기준\n세후 이자: 약 ${formatCurrency(results.netNormalInterest)}원`;
    const shareUrl = `https://lifefit.kr/tools/savings-plan?amt=${amountStr}&period=${period}&rate=${rateStr}&start=${startDateStr}`;
    const fullText = `${resultText}\n\n👉 내 적금 이자 극대화하는 법 확인하기:\n${shareUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 적금 선납이연 계산기 💰",
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
    const shareUrl = `https://lifefit.kr/tools/savings-plan?amt=${amountStr}&period=${period}&rate=${rateStr}&start=${startDateStr}`;
    shareToKakao({
      title: `적금 선납이연 이자 최적화 플랜 💰`,
      description: `월 ${formatCurrency(amount)}원, ${period}개월, 연 ${rate}% 기준 세후 이자: 약 ${formatCurrency(results.netNormalInterest)}원. 선납이연 플랜으로 이자를 극대화해 보세요!`,
      imageUrl: "https://lifefit.kr/og-default.png",
      buttonText: "나도 플랜 계산해보기",
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
            name: "적금 선납이연 계산기",
            url: "https://lifefit.kr/tools/savings-plan",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "6-1-5, 1-11, 6-6 등 적금 선납이연 방식을 통한 이자 수익 최적화 계산기",
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
                name: "적금 선납이연 계산기",
                item: "https://lifefit.kr/tools/savings-plan",
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
                "name": "적금 선납이연이란 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "정기적금의 납입일을 앞당겨 내는 것(선납)과 늦게 내는 것(이연)을 조절하여, 약정한 만기 이자는 그대로 받으면서 자금 운용의 효율성을 극대화하는 재테크 기법입니다."
                }
              },
              {
                "@type": "Question",
                "name": "가장 많이 사용하는 6-1-5 플랜은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "12개월 적금 기준, 첫 달에 6개월치 금액을 미리 선납하고, 7번째 달에 1개월치 금액을 납입하며, 만기일 하루 전에 나머지 5개월치를 납입하는 방식입니다."
                }
              },
              {
                "@type": "Question",
                "name": "선납이연을 진행할 때 주의할 점은 무엇인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "모든 정기적금 상품이 선납이연을 지원하는 것은 아닙니다. 가입 전에 해당 은행 상품 설명서에서 선납이연(또는 이연일수 계산법)이 적용되는지 반드시 확인해야 합니다."
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
            <TrendingUp size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            적금 선납이연 계산기
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            이자 수익을 극대화하는 입금 플랜을 확인하세요
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
                월 납입 금액을 알려주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                매달 저축할 금액을 입력해주세요.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder="예: 100"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[10, 30, 50, 100, 200].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmountStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] hover:bg-[#e8f3ff] hover:text-[#3182f6] transition-colors"
                  >
                    {val}만
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                적금 기간을 선택해주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                보통 12개월 또는 24개월을 많이 사용합니다.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[12, 24].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPeriod(val as 12 | 24)}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      period === val
                        ? "border-[#3182f6] bg-[#e8f3ff]"
                        : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                    }`}
                  >
                    <p className={`text-lg font-bold ${period === val ? "text-[#3182f6]" : "text-[#191f28]"}`}>
                      {val}개월
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                연 이자율은 몇 %인가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                세전 이자율을 입력해주세요.
              </p>
              <div className="relative mb-4">
                <input
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                  placeholder="예: 5.0"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  %
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[3.0, 4.0, 5.0, 6.0, 7.0].map((val) => (
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

          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                적금 시작일은 언제인가요?
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                1회차 납입일을 선택해주세요.
              </p>
              <div className="relative">
                <input
                  type="date"
                  value={startDateStr}
                  onChange={(e) => setStartDateStr(e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-[#3182f6]"
                />
              </div>
            </div>
          )}

          {step === 5 && results && (
            <div className="animate-fade-in space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800 border border-blue-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 적금 플랜입니다!
                </div>
              )}
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-[#191f28]">계산 결과</h2>
                <p className="text-sm text-[#8b95a1] mt-1">
                  만기 시 받게 될 이자와 입금 일정입니다.
                </p>
              </div>

              {/* 요약 카드 */}
              <div className="rounded-2xl p-5 bg-[#3182f6] text-white shadow-lg shadow-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-blue-100 text-xs font-medium mb-1">총 납입 원금</p>
                    <p className="text-xl font-bold">{formatCurrency(results.totalPrincipal)}원</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-xs font-medium mb-1">만기일</p>
                    <p className="text-sm font-bold">{formatDate(results.maturityDate)}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-400/30">
                  <p className="text-blue-100 text-xs font-medium mb-1">세후 이자 (일반 적금 기준)</p>
                  <p className="text-2xl font-bold">약 {formatCurrency(results.netNormalInterest)}원</p>
                </div>
              </div>

              {/* 추가 수익 시뮬레이터 */}
              <div className="rounded-2xl border border-blue-100 bg-[#f8faff] p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">📈</span>
                  <h3 className="font-bold text-sm text-[#191f28]">파킹통장 연계 추가 수익 시뮬레이터</h3>
                </div>
                <p className="text-xs text-[#4e5968] leading-relaxed">
                  미뤄둔 입금 예정액을 파킹통장에 넣어두었을 때의 추가 세후 이자 혜택을 정기예금과 비교합니다.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8b95a1] mb-1">비교 정기예금 금리 (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={depositRateStr}
                        onChange={(e) => setDepositRateStr(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-lg bg-white border border-[#e5e8eb] text-xs font-bold text-[#191f28] focus:ring-1 focus:ring-[#3182f6] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8b95a1] mb-1">연계 파킹통장 금리 (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={parkingRateStr}
                        onChange={(e) => setParkingRateStr(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-lg bg-white border border-[#e5e8eb] text-xs font-bold text-[#191f28] focus:ring-1 focus:ring-[#3182f6] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <div className="flex justify-between text-xs text-[#8b95a1]">
                    <span>일반 정기예금 이자 (세후)</span>
                    <span className="font-medium text-[#4e5968]">{formatCurrency(results.netDepositInterest)}원</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  
                  {results.plans.map((plan) => (
                    <div key={plan.type} className="flex flex-col gap-1 p-2 rounded-xl bg-white border border-gray-50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#191f28]">{plan.name}</span>
                        <span className="font-bold text-[#3182f6]">{formatCurrency(plan.combinedInterest)}원</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-[#8b95a1]">
                        <span>(적금 {formatCurrency(results.netNormalInterest)}원 + 파킹 {formatCurrency(plan.parkingInterest)}원)</span>
                        {plan.extraBenefit > 0 ? (
                          <span className="font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            예금 대비 +{formatCurrency(plan.extraBenefit)}원 더 이득! 🏆
                          </span>
                        ) : (
                          <span className="text-[#8b95a1]">
                            예금 대비 {formatCurrency(plan.extraBenefit)}원
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 플랜별 일정 */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#191f28] flex items-center gap-2">
                  <Calendar size={20} className="text-[#3182f6]" />
                  선납이연 추천 플랜 및 세부 일정
                </h3>
                
                {results.plans.map((plan) => (
                  <div key={plan.type} className="rounded-2xl border border-[#e5e8eb] overflow-hidden">
                    <div className="bg-[#f8f9fa] p-4 border-b border-[#e5e8eb] flex justify-between items-center">
                      <p className="font-bold text-[#191f28]">{plan.name}</p>
                      {plan.extraBenefit > 0 && (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                          예금 대비 +{formatCurrency(plan.extraBenefit)}원
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="text-[11px] text-[#8b95a1] pb-2 border-b border-dashed border-[#e5e8eb]">
                        이 플랜 적용 시, 파킹통장 추가 이자 수익은 <strong>약 {formatCurrency(plan.parkingInterest)}원</strong>입니다.
                      </div>
                      {plan.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[10px] font-bold text-[#8b95a1]">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-[#191f28] font-bold">{formatDate(item.date)}</p>
                              <p className="text-[#8b95a1] text-xs">{item.count}회차분 입금</p>
                            </div>
                          </div>
                          <p className="font-bold text-[#3182f6]">{formatCurrency(item.amount)}원</p>
                        </div>
                      ))}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleIcsDownload(plan.schedule, plan.name)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#e8f3ff] hover:bg-blue-100 text-[#3182f6] text-xs font-bold rounded-xl transition-colors border border-blue-100/50"
                        >
                          <Calendar size={13} />
                          이 플랜 일정 캘린더에 추가 (ICS 다운로드)
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#f2f4f6] rounded-2xl space-y-3">
                <p className="text-xs text-[#4e5968] leading-relaxed">
                  ※ <strong>선납이연</strong>은 적금의 일부 회차를 미리 내고(선납), 일부는 늦게 내는(이연) 방식으로 자금 흐름을 조절하는 테크닉입니다. 결과적으로 만기 이자는 일반 적금과 동일하게 수령하면서, 중간에 자금을 다른 곳(예: 파킹통장)에 활용할 수 있는 장점이 있습니다.
                </p>
                <div className="pt-2 border-t border-gray-200/50">
                  <Link
                    href="/posts/parking-account-rankings-june-2026"
                    className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-blue-50 hover:border-blue-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span>🏦</span>
                      <span className="font-bold text-[#3182f6]">최신 고금리 파킹통장 TOP 5 비교하기</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#8b95a1] group-hover:text-[#3182f6] transition-colors">이동하기 →</span>
                  </Link>
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
              <div className="w-full mt-4 pt-6 border-t border-[#f2f4f6] space-y-4 text-center">
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

        {/* 안내문 */}
        <div className="mt-6 p-4 bg-[#fff8db] rounded-2xl">
          <p className="font-bold text-xs text-[#8b6a00] flex items-center gap-1 mb-1">
            <Info size={14} /> 선납이연 핵심 가이드
          </p>
          <ul className="text-[11px] text-[#8b6a00] list-disc pl-4 space-y-1">
            <li>
              <strong>6-1-5 플랜:</strong> 가장 대중적인 방식으로, 처음 6개월치와 중간 1개월치만 내고 나머지는 만기 직전에 납입합니다.
            </li>
            <li>
              <strong>1-11 플랜:</strong> 처음 1개월치만 내고 중간(7회차 시점)에 나머지 11개월치를 모두 납입하는 방식입니다.
            </li>
            <li>
              <strong>주의사항:</strong> 은행이나 상품에 따라 선납이연을 허용하지 않거나 조건이 다를 수 있으니 가입 전 확인이 필요합니다.
            </li>
          </ul>
        </div>

        {/* 하단 SEO 텍스트 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            적금 선납이연으로 이자 수익 극대화하기
          </h2>
          <p className="mb-2">
            <strong>선납이연</strong>이란 정기적금의 납입일을 조절하여 실질적인 수익률을 높이거나 자금 운용의 효율성을 극대화하는 재테크 기법입니다. &apos;선납&apos;은 예정일보다 미리 내는 것, &apos;이연&apos;은 예정일보다 늦게 내는 것을 의미합니다.
          </p>
          <p className="mb-2">
            정기적금은 모든 회차의 &apos;선납 일수&apos; 합계가 &apos;이연 일수&apos; 합계보다 크거나 같으면 약정한 만기 이자를 그대로 지급합니다. 이를 이용해 고금리 적금 상품에 적은 초기 자본으로 가입하고, 나머지 금액은 파킹통장이나 다른 투자처에 예치하여 추가 수익을 거둘 수 있습니다.
          </p>
          <p>
            가장 많이 사용되는 <strong>6-1-5 방식</strong>은 12개월 적금 기준, 1회차에 6회분 입금, 7회차에 1회분 입금, 그리고 만기일 전날에 나머지 5회분을 입금하는 방식입니다. 본 계산기를 통해 본인의 자금 상황에 맞는 최적의 플랜을 세워보세요.
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

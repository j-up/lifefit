"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  TrendingUp,
  Info,
  Share2,
  ChevronRight,
  ChevronLeft,
  History,
  PiggyBank,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Bus,
  Check,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";

type Step = 1 | 2 | 3 | 4 | 5;

type Region = "seoul" | "metropolitan" | "other";
type Demographic = "general" | "youth" | "lowIncome";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export default function KPassClimatePage() {
  const [step, setStep] = useState<Step>(1);
  const [region, setRegion] = useState<Region | null>(null);
  const [ridesStr, setRidesStr] = useState<string>("40");
  const [fareStr, setFareStr] = useState<string>("1400");
  const [demographic, setDemographic] = useState<Demographic>("youth");
  const [useBike, setUseBike] = useState<boolean>(false);
  
  const [isSharedResult, setIsSharedResult] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lifefit_kpass_climate_history");
      if (saved) setHasHistory(true);
    }
  }, [step]);

  const saveToHistory = (r: Region | null, rides: string, fare: string, demo: Demographic, bike: boolean) => {
    if (typeof window === "undefined") return;
    try {
      const history = {
        region: r,
        ridesStr: rides,
        fareStr: fare,
        demographic: demo,
        useBike: bike,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lifefit_kpass_climate_history", JSON.stringify(history));
      setHasHistory(true);
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lifefit_kpass_climate_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          setRegion(parsed.region);
          setRidesStr(parsed.ridesStr);
          setFareStr(parsed.fareStr);
          setDemographic(parsed.demographic);
          setUseBike(parsed.useBike ?? false);
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
      const r = params.get("region") as Region | null;
      const rds = params.get("rides");
      const f = params.get("fare");
      const d = params.get("demo") as Demographic | null;
      const b = params.get("bike") === "true";

      if (r && rds && f && d) {
        setRegion(r);
        setRidesStr(rds);
        setFareStr(f);
        setDemographic(d);
        setUseBike(b);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const rides = ridesStr === "" ? 0 : parseInt(ridesStr, 10);
  const fare = fareStr === "" ? 0 : parseInt(fareStr, 10);

  const results = useMemo(() => {
    if (step < 5 || !region) return null;

    const baseTransitCost = rides * fare;

    // K-Pass Cashback calculation
    // Requirements: Minimum 15 rides per month. Max cashback capped at 60 rides.
    let kpassCashbackRate = 0.20; // General
    if (demographic === "youth") kpassCashbackRate = 0.30;
    else if (demographic === "lowIncome") kpassCashbackRate = 0.53;

    let kpassCashback = 0;
    if (rides >= 15) {
      const eligibleRides = Math.min(60, rides);
      kpassCashback = eligibleRides * fare * kpassCashbackRate;
    }

    const kpassNetExpense = baseTransitCost - kpassCashback;

    // Climate Card Flat Rate
    // Requirements: Standard vs Youth (under 34)
    // Options: Standard 62k (65k with bike), Youth 55k (58k with bike)
    const climateCardSupport = region === "seoul";
    let climateCardCost = 999999; // Not applicable default heavy cost
    
    if (climateCardSupport) {
      if (demographic === "youth") {
        climateCardCost = useBike ? 58000 : 55000;
      } else {
        climateCardCost = useBike ? 65000 : 62000;
      }
    }

    const climateSaving = baseTransitCost - climateCardCost;
    const isClimateCardBetter = climateCardSupport && climateCardCost < kpassNetExpense;
    
    const savingDiff = isClimateCardBetter 
      ? kpassNetExpense - climateCardCost 
      : kpassNetExpense < baseTransitCost 
        ? kpassNetExpense 
        : 0;

    return {
      baseTransitCost,
      kpassCashback,
      kpassNetExpense,
      climateCardSupport,
      climateCardCost,
      climateSaving,
      isClimateCardBetter,
      savingDiff: Math.abs(kpassNetExpense - climateCardCost),
    };
  }, [step, region, rides, fare, demographic, useBike]);

  const canProceed = () => {
    if (step === 1) return region !== null;
    if (step === 2) return rides > 0;
    if (step === 3) return fare > 0;
    if (step === 4) return true;
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 5) {
      saveToHistory(region, ridesStr, fareStr, demographic, useBike);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleShare = async () => {
    if (!results || !region) return;
    const shareUrl = `https://lifefit.kr/tools/kpass-climate?region=${region}&rides=${ridesStr}&fare=${fareStr}&demo=${demographic}&bike=${useBike}`;
    
    let resultText = "";
    if (results.isClimateCardBetter) {
      resultText = `🚌 [LifeFit] K-패스 vs 기후동행카드 비교 결과\n👉 내 최적의 카드는 '기후동행카드'입니다!\n💡 기후동행카드 이용 시 K-패스보다 월 ${formatCurrency(results.savingDiff)}원 더 절약!`;
    } else {
      resultText = `🚌 [LifeFit] K-패스 vs 기후동행카드 비교 결과\n👉 내 최적의 카드는 'K-패스'입니다!\n💡 K-패스 환급으로 매달 ${formatCurrency(results.kpassCashback)}원(실수령액) 환급!`;
    }

    const fullText = `${resultText}\n\n👉 나도 1분 만에 내 교통비 최적의 카드 찾기:\n${shareUrl}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit K-패스 vs 기후동행카드 비교 계산기 🚌",
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
    } catch {
      showToastNotification("❌ 복사에 실패했습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 pt-6 pb-28 sm:pt-10 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "K-패스 vs 기후동행카드 비교 계산기",
            url: "https://lifefit.kr/tools/kpass-climate",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "2026년 대중교통 이용 패턴에 따른 K-패스 환급액과 기후동행카드 정기권 혜택 비교 계산기",
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
                name: "K-패스 vs 기후동행카드 비교 계산기",
                item: "https://lifefit.kr/tools/kpass-climate",
              },
            ],
          }),
        }}
      />
      
      <div className="w-full max-w-[420px]">
        {/* 네비게이션 */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[#8b95a1] hover:text-[#3182f6] transition-colors animate-fade-in"
          >
            ← 메인으로
          </Link>
        </div>

        {/* 헤더 */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-3 shadow-lg shadow-indigo-150">
            <CreditCard size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            K-패스 vs 기후동행카드
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            내 이용 패턴에 맞는 최적의 대중교통 카드는?
          </p>
        </div>

        {/* 프로그레스 바 */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e8eb]">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
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
                  className="mb-5 w-full h-11 rounded-2xl bg-indigo-50/70 text-indigo-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-indigo-100/70 transition-all active:scale-[0.98] border border-indigo-100/50"
                >
                  <History size={14} />
                  이전 계산 기록 불러오기
                </button>
              )}
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                주로 이용하시는 지역을 알려주세요
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                교통카드의 지원 가능 지역을 판별합니다.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setRegion("seoul")}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    region === "seoul"
                      ? "border-indigo-600 bg-indigo-50/50"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold ${region === "seoul" ? "text-indigo-600" : "text-[#191f28]"}`}>
                      서울 시내만 이용 🇰🇷
                    </p>
                    <p className="text-xs text-[#8b95a1] mt-1">
                      서울 지하철, 서울 시내버스, 따릉이 위주 이용
                    </p>
                  </div>
                  {region === "seoul" ? (
                    <CheckCircle2 size={20} className="text-indigo-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-200" />
                  )}
                </button>

                <button
                  onClick={() => setRegion("metropolitan")}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    region === "metropolitan"
                      ? "border-indigo-600 bg-indigo-50/50"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold ${region === "metropolitan" ? "text-indigo-600" : "text-[#191f28]"}`}>
                      경기·인천·광역 통근 🚌
                    </p>
                    <p className="text-xs text-[#8b95a1] mt-1">
                      서울-경기/인천 광역 통근, 신분당선, GTX 등 이용
                    </p>
                  </div>
                  {region === "metropolitan" ? (
                    <CheckCircle2 size={20} className="text-indigo-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-200" />
                  )}
                </button>

                <button
                  onClick={() => setRegion("other")}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    region === "other"
                      ? "border-indigo-600 bg-indigo-50/50"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold ${region === "other" ? "text-indigo-600" : "text-[#191f28]"}`}>
                      기타 전국 지자체 🗺️
                    </p>
                    <p className="text-xs text-[#8b95a1] mt-1">
                      부산, 대구, 대전, 광주 등 전국 주요 지역 이용
                    </p>
                  </div>
                  {region === "other" ? (
                    <CheckCircle2 size={20} className="text-indigo-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-200" />
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                한 달 평균 대중교통 이용 횟수
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                출퇴근 왕복을 감안해 입력해주세요.
              </p>
              
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={ridesStr}
                  onChange={(e) => setRidesStr(e.target.value)}
                  placeholder="예: 44"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  회 / 월
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {[15, 30, 40, 44, 50, 60].map((val) => (
                  <button
                    key={val}
                    onClick={() => setRidesStr(String(val))}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      rides === val
                        ? "bg-indigo-600 text-white"
                        : "bg-[#f2f4f6] text-[#4e5968] hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {val === 15 ? "최소 15회" : val === 44 ? "통근 44회 (주5일)" : val === 60 ? "최대 60회" : `${val}회`}
                  </button>
                ))}
              </div>

              {rides > 0 && rides < 15 && (
                <div className="p-4 bg-orange-50 rounded-2xl flex items-start gap-2.5 border border-orange-100">
                  <AlertTriangle size={18} className="text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-800 leading-relaxed font-medium">
                    ※ <strong>K-패스</strong>는 월 대중교통을 최소 <strong>15회 이상</strong> 사용해야 환급이 적용됩니다. 현재 기준에서는 환급 혜택을 받을 수 없습니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#191f28] mb-2">
                1회 탑승 시 평균 교통 요금
              </h2>
              <p className="text-sm text-[#8b95a1] mb-6">
                기본 요금 및 거리 비례 요금을 감안해 주세요.
              </p>
              
              <div className="relative mb-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={fareStr}
                  onChange={(e) => setFareStr(e.target.value)}
                  placeholder="예: 1400"
                  className="w-full h-14 pl-4 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  원 / 회
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[1400, 1500, 1700, 2900, 3100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFareStr(String(val))}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      fare === val
                        ? "bg-indigo-600 text-white"
                        : "bg-[#f2f4f6] text-[#4e5968] hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {val === 1400 ? "서울 지하철 (1,400원)" : val === 1500 ? "시내버스 (1,500원)" : val === 2900 ? "광역버스/신분당선 (2,900원)" : `${formatCurrency(val)}원`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191f28] mb-2">
                  본인의 연령/복지 유형
                </h2>
                <p className="text-sm text-[#8b95a1] mb-4">
                  K-패스 및 기후동행카드의 할인 요율을 결정합니다.
                </p>
                
                <div className="space-y-3">
                  {[
                    { id: "youth", label: "청년 (만 19 ~ 34세)", desc: "K-패스 30% 환급 / 기후동행카드 5.5~5.8만 원 적용" },
                    { id: "general", label: "일반 (만 35세 이상)", desc: "K-패스 20% 환급 / 기후동행카드 6.2~6.5만 원 적용" },
                    { id: "lowIncome", label: "저소득층 (수급자/차상위)", desc: "K-패스 53.3% 환급 적용" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDemographic(item.id as Demographic)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        demographic === item.id
                          ? "border-indigo-600 bg-indigo-50/50"
                          : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                      }`}
                    >
                      <div className="text-left">
                        <p className={`font-bold text-sm ${demographic === item.id ? "text-indigo-600" : "text-[#191f28]"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-[#8b95a1] mt-1">{item.desc}</p>
                      </div>
                      {demographic === item.id ? (
                        <CheckCircle2 size={18} className="text-indigo-600" />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border border-gray-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {region === "seoul" && (
                <div className="pt-4 border-t border-[#f2f4f6]">
                  <h3 className="text-sm font-bold text-[#191f28] mb-3 flex items-center gap-1.5">
                    🚲 따릉이(서울시 공공자전거) 이용 여부
                  </h3>
                  <button
                    onClick={() => setUseBike(!useBike)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      useBike
                        ? "border-teal-600 bg-teal-50/50"
                        : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-bold text-sm ${useBike ? "text-teal-600" : "text-[#191f28]"}`}>
                        따릉이 포함 요금제 선택
                      </p>
                      <p className="text-xs text-[#8b95a1] mt-1">
                        기후동행카드 3,000원 추가 (무제한 따릉이 2시간 이용권 포함)
                      </p>
                    </div>
                    {useBike ? (
                      <CheckCircle2 size={18} className="text-teal-600" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-gray-200" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 5 && results && region && (
            <div className="animate-fade-in space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-indigo-50 p-3 text-xs font-semibold text-indigo-800 border border-indigo-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 대중교통 카드 계산서입니다!
                </div>
              )}

              {/* 매칭결과 배너 */}
              <div className="text-center pb-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">교통비 매칭 결과</p>
                <h2 className="text-2xl font-black text-[#191f28] mt-1">
                  {results.isClimateCardBetter ? (
                    <span className="text-[#3182f6]">기후동행카드 강추 💳</span>
                  ) : (
                    <span className="text-[#3182f6]">K-패스 강력 추천 🚌</span>
                  )}
                </h2>
                <p className="text-xs text-[#8b95a1] mt-1.5 leading-relaxed">
                  한 달 통근패턴 분석 결과, 귀하에게 가장 유리한 카드는{" "}
                  <strong>{results.isClimateCardBetter ? "기후동행카드" : "K-패스"}</strong>입니다.
                </p>
              </div>

              {/* 추천 이유 요약 카드 */}
              <div className="rounded-2xl p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-indigo-100 text-xs font-semibold mb-1">매달 절약하는 예상 요금</p>
                    <p className="text-2xl font-black">
                      월 {formatCurrency(results.savingDiff)}원 절감!
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-bold">
                    {demographic === "youth" ? "청년 혜택 적용" : demographic === "lowIncome" ? "저소득 특별환급" : "일반 혜택 적용"}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-indigo-100">원래 대중교통 요금</span>
                    <span className="font-bold">{formatCurrency(results.baseTransitCost)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-100">최적 선택 시 실지출</span>
                    <span className="font-bold text-yellow-300">
                      {formatCurrency(
                        results.isClimateCardBetter ? results.climateCardCost : results.kpassNetExpense
                      )}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 만약 서울이 아닌 지역인데 기후동행카드 확인하려 했다면 경고 */}
              {!results.climateCardSupport && (
                <div className="rounded-2xl bg-orange-50 p-4 border border-orange-100 text-xs leading-relaxed text-orange-800">
                  <p className="font-bold flex items-center gap-1.5 mb-1 text-orange-950">
                    <AlertTriangle size={15} /> 기후동행카드 사용 불가 지역
                  </p>
                  <p>
                    서울 시외 통근자이거나 타 시/도 지자체 이용자는 서울 무제한 <strong>기후동행카드</strong>의 혜택을 온전히 받으실 수 없습니다. 전국 단위로 20%~53.3%를 페이백해 주는 <strong>K-패스</strong>를 가입하셔야 합니다.
                  </p>
                </div>
              )}

              {/* 두 카드 요금 비교 바차트 */}
              <div className="bg-[#f8f9fa] rounded-2xl p-4 space-y-4">
                <p className="text-xs font-bold text-[#4e5968]">카드별 실질 요금 비교 (지출액이 낮을수록 유리)</p>
                
                <div className="space-y-3">
                  {/* K-Pass */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4e5968] font-semibold">
                        K-패스 {rides >= 15 ? `(캐시백 -${formatCurrency(results.kpassCashback)}원)` : "(환급 미충족)"}
                      </span>
                      <span className={`font-bold ${!results.isClimateCardBetter ? "text-indigo-600" : "text-[#191f28]"}`}>
                        {formatCurrency(results.kpassNetExpense)}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min((results.kpassNetExpense / Math.max(1, results.baseTransitCost)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Climate Card (Only if supported) */}
                  {results.climateCardSupport && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#4e5968] font-semibold">
                          기후동행카드 (정액제 {useBike ? "따릉이 포함" : ""})
                        </span>
                        <span className={`font-bold ${results.isClimateCardBetter ? "text-indigo-600" : "text-[#191f28]"}`}>
                          {formatCurrency(results.climateCardCost)}원
                        </span>
                      </div>
                      <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min((results.climateCardCost / Math.max(1, results.baseTransitCost)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 꿀팁 정보 카드 */}
              <div className="p-4 bg-[#e8f3ff] rounded-2xl">
                <h4 className="font-bold text-xs text-[#1e6fdb] flex items-center gap-1 mb-1">
                  <Info size={14} /> 2026 교통 혜택 핵심 가이드
                </h4>
                <ul className="text-[11px] text-[#4e5968] list-disc pl-4 space-y-1">
                  <li>
                    <strong>K-패스 (전국):</strong> 전월 대중교통 15회 이상 사용 필수, 청년층(만19~34세)은 연령층에 따라 30%를 현금(또는 카드대금 차감)으로 돌려받습니다.
                  </li>
                  <li>
                    <strong>기후동행카드 (서울):</strong> 서울 전용 지하철 및 버스를 월 6.2만 원(청년 5.5만 원)으로 횟수 무제한 승차 가능합니다. (경기/인천 제외 광역 통행 시 미적용 주의)
                  </li>
                  <li>
                    <strong>따릉이 팁:</strong> 따릉이를 자주 타신다면 단돈 3,000원에 한 달 따릉이를 2시간 무료 이용할 수 있어 따릉이 정기권보다 훨씬 이득입니다.
                  </li>
                </ul>
              </div>

              {/* 구글 애드센스 광고 영역 */}
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
                    ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                    : "bg-[#e5e8eb] text-[#b0b8c1] cursor-not-allowed"
                }`}
              >
                다음
                <ChevronRight size={18} />
              </button>
            )}
            {step === 5 && (
              <div className="w-full mt-4 pt-6 border-t border-[#f2f4f6] space-y-4 text-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      setRegion(null);
                      setRidesStr("40");
                      setFareStr("1400");
                      setUseBike(false);
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
                  <button
                    onClick={handleShare}
                    className="flex-1 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all"
                  >
                    <Share2 size={16} />
                    결과 공유
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 세부 SEO 콘텐츠 아티클 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            나에게 맞는 교통카드 혜택 총정리
          </h2>
          <p className="mb-2">
            2026년 대중교통 혜택은 크게 <strong>K-패스 (K-PASS)</strong>와 <strong>기후동행카드</strong> 두 가지 축으로 양분됩니다. 대중교통비 인상으로 매월 출퇴근 고정 비용이 커지는 직장인과 학생들에게 교통카드 선택은 가계 절약의 첫걸음입니다.
          </p>
          <p className="mb-2">
            <strong>K-패스</strong>는 지자체 관계없이 전국 모든 대중교통(GTX, 신분당선 포함)에서 매월 15회 이상 탑승 시 실지출 금액의 일정 요율(일반 20%, 청년 30%, 저소득층 53.3%)을 환급해 주는 캐시백 모델입니다. 경기도민이나 인천시민의 통근 요금에 대단히 강력합니다.
          </p>
          <p>
            반면, <strong>서울 기후동행카드</strong>는 월정액을 내면 횟수 제한 없이 서울 내 대중교통을 무제한 탈 수 있는 정기권 모델입니다. 탑승 횟수가 아주 많거나, 서울 내 단거리 이동을 수시로 하는 직장인에게 최적입니다. 본 1분 비교기 도구를 활용해 매년 20만 원 이상의 차액을 아끼는 맞춤 혜택 카드를 판별해보세요.
          </p>
        </article>
      </div>

      {step === 5 && (
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

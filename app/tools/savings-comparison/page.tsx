"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Info,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PiggyBank,
  Check,
  AlertCircle,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export default function SavingsComparisonPage() {
  const [personalIncomeStr, setPersonalIncomeStr] = useState<string>("3500"); // 연봉 (만원)
  const [monthlySavingsStr, setMonthlySavingsStr] = useState<string>("50"); // 월 저축여력 (만원)
  const [isYouth, setIsYouth] = useState<boolean>(true); // 만 19~34세 여부
  const [isSmeNewHire, setIsSmeNewHire] = useState<boolean>(false); // 중소기업 신규취업 청년 여부
  const [leapRateStr, setLeapRateStr] = useState<string>("6.0"); // 청년도약계좌 이율
  const [futureRateStr, setFutureRateStr] = useState<string>("5.2"); // 청년미래적금 이율

  // 결과 계산
  const comparison = useMemo(() => {
    const personalIncome = (parseFloat(personalIncomeStr) || 0) * 10000;
    const monthlySavings = (parseFloat(monthlySavingsStr) || 0) * 10000;
    const leapRate = parseFloat(leapRateStr) || 0;
    const futureRate = parseFloat(futureRateStr) || 0;

    // --- 1. 청년도약계좌 계산 ---
    // 가입 자격 판별: 나이 필수, 개인 소득 7,500만 원 이하
    const isLeapEligible = isYouth && personalIncome <= 75000000;

    // 도약계좌 월 납입액 (최대 70만원)
    const leapMonthly = Math.min(monthlySavings, 700000);
    const leapMonths = 60;
    const leapPrincipal = leapMonthly * leapMonths;

    // 정부 기여금 매칭 계산
    let leapGovMonthly = 0;
    if (isLeapEligible && leapMonthly > 0) {
      if (personalIncome <= 24000000) {
        // 소득 2400만원 이하: 6.0% (납입액 한도 40만)
        leapGovMonthly = Math.min(leapMonthly, 400000) * 0.06;
      } else if (personalIncome <= 36000000) {
        // 소득 2400~3600만원 이하: 4.6% (납입액 한도 50만)
        leapGovMonthly = Math.min(leapMonthly, 500000) * 0.046;
      } else if (personalIncome <= 48000000) {
        // 소득 3600~4800만원 이하: 3.7% (납입액 한도 60만)
        leapGovMonthly = Math.min(leapMonthly, 600000) * 0.037;
      } else if (personalIncome <= 60000000) {
        // 소득 4800~6000만원 이하: 3.0% (납입액 한도 70만)
        leapGovMonthly = Math.min(leapMonthly, 700000) * 0.03;
      } else {
        // 소득 6000~7500만원 이하: 비과세만 (기여금 0)
        leapGovMonthly = 0;
      }
    }
    const leapGovTotal = leapGovMonthly * leapMonths;

    // 이자 계산 (적립식 단리 비과세)
    const leapInterest = leapMonthly * (leapRate / 100) * ((leapMonths * (leapMonths + 1)) / 24);
    
    // 만기 수령액
    const leapTotalAmount = leapPrincipal + leapInterest + leapGovTotal;
    const leapTotalBenefit = leapInterest + leapGovTotal;

    // 일반 과세(15.4%) 적금 환산 금리 계산
    // 세후이율 = (세후수익 / (원금 * 계수)) * 100
    // 세후이율 = 일반금리 * (1 - 0.154) -> 일반금리 = 세후이율 / 0.846
    const leapWeight = (leapMonths * (leapMonths + 1)) / 24; // 60개월 = 152.5
    const leapNetWeight = leapWeight * (1 - 0.154);
    let leapEffectiveRate = 0;
    if (leapMonthly > 0) {
      leapEffectiveRate = (leapTotalBenefit / (leapMonthly * leapNetWeight)) * 100;
    }

    // --- 2. 청년미래적금 계산 ---
    // 가입 자격 판별: 나이 필수, 개인 소득 7,500만 원 이하
    const isFutureEligible = isYouth && personalIncome <= 75000000;

    // 미래적금 월 납입액 (최대 50만원)
    const futureMonthly = Math.min(monthlySavings, 500000);
    const futureMonths = 36;
    const futurePrincipal = futureMonthly * futureMonths;

    // 정부 기여금 매칭 계산
    let futureGovMonthly = 0;
    if (isFutureEligible && futureMonthly > 0) {
      if (personalIncome <= 60000000) {
        // 소득 6,000만원 이하 기여금 매칭
        // 중소기업 신규취업 청년은 12% 매칭, 일반은 6% 매칭
        const rate = isSmeNewHire ? 0.12 : 0.06;
        futureGovMonthly = futureMonthly * rate;
      } else {
        // 소득 6000~7500만원 이하: 비과세만 (기여금 0)
        futureGovMonthly = 0;
      }
    }
    const futureGovTotal = futureGovMonthly * futureMonths;

    // 이자 계산 (적립식 단리 비과세)
    const futureInterest = futureMonthly * (futureRate / 100) * ((futureMonths * (futureMonths + 1)) / 24);

    // 만기 수령액
    const futureTotalAmount = futurePrincipal + futureInterest + futureGovTotal;
    const futureTotalBenefit = futureInterest + futureGovTotal;

    // 일반 과세(15.4%) 적금 환산 금리 계산
    const futureWeight = (futureMonths * (futureMonths + 1)) / 24; // 36개월 = 55.5
    const futureNetWeight = futureWeight * (1 - 0.154);
    let futureEffectiveRate = 0;
    if (futureMonthly > 0) {
      futureEffectiveRate = (futureTotalBenefit / (futureMonthly * futureNetWeight)) * 100;
    }

    return {
      isLeapEligible,
      leapMonthly,
      leapPrincipal,
      leapGovTotal,
      leapInterest,
      leapTotalAmount,
      leapEffectiveRate,
      
      isFutureEligible,
      futureMonthly,
      futurePrincipal,
      futureGovTotal,
      futureInterest,
      futureTotalAmount,
      futureEffectiveRate,
    };
  }, [personalIncomeStr, monthlySavingsStr, isYouth, isSmeNewHire, leapRateStr, futureRateStr]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
          >
            <ChevronLeft size={16} />
            <span>홈으로</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Intro */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 mb-3">
            💡 재테크 비교 분석
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            청년도약계좌 vs 청년미래적금 비교
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            나이, 소득, 월 저축 금액에 따라 5년 만기 도약계좌와 3년 만기 미래적금 중 어떤 상품을 선택하는 것이 이득인지 맞춤형으로 시뮬레이션해 드립니다.
          </p>
        </div>

        {/* Input Panel & Simulation */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Inputs */}
          <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5 h-fit">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">내 정보 입력</h2>

            {/* Age check */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">청년 여부</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsYouth(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    isYouth ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  만 19~34세 청년
                </button>
                <button
                  type="button"
                  onClick={() => setIsYouth(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    !isYouth ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  청년 아님 (대상 외)
                </button>
              </div>
            </div>

            {/* Income */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700">개인 연 소득 (세전)</label>
                <span className="text-[10px] font-medium text-gray-400">만원 단위</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={personalIncomeStr}
                  onChange={(e) => setPersonalIncomeStr(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none text-right pr-12 font-bold"
                  placeholder="예: 3000"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">만원</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                * 총급여 6,000만 원 이하일 경우에만 정부 기여금이 매칭되며, 7,500만 원 이하는 비과세 혜택만 제공됩니다.
              </p>
            </div>

            {/* Monthly Savings */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700">월 저축 가능 금액</label>
                <span className="text-[10px] font-medium text-gray-400">만원 단위</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={monthlySavingsStr}
                  onChange={(e) => setMonthlySavingsStr(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none text-right pr-12 font-bold"
                  placeholder="예: 50"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">만원</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                * 도약계좌는 월 최대 70만 원, 미래적금은 월 최대 50만 원까지 납입할 수 있습니다.
              </p>
            </div>

            {/* SME New Hire Check */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="pr-2">
                <span className="text-[11px] font-bold text-gray-700 block">중소기업 신규취업 청년</span>
                <span className="text-[9px] text-gray-400 block leading-tight">청년미래적금 정부기여금 12% 특별매칭</span>
              </div>
              <input
                type="checkbox"
                checked={isSmeNewHire}
                onChange={(e) => setIsSmeNewHire(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>

            {/* Custom Rates */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-500 block">적용 이율 설정 (연 %)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-gray-400 block mb-1">청년도약계좌</span>
                  <input
                    type="number"
                    step="0.1"
                    value={leapRateStr}
                    onChange={(e) => setLeapRateStr(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-right font-semibold"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block mb-1">청년미래적금</span>
                  <input
                    type="number"
                    step="0.1"
                    value={futureRateStr}
                    onChange={(e) => setFutureRateStr(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-right font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Side by Side */}
          <div className="md:col-span-2 space-y-6">
            {!isYouth ? (
              <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-center space-y-2">
                <AlertCircle className="mx-auto text-red-500" size={32} />
                <h3 className="font-bold text-red-800">가입이 불가능한 나이입니다.</h3>
                <p className="text-xs text-red-600">
                  두 상품 모두 만 19세 이상 34세 이하 청년층을 핵심 타겟으로 하는 정부 지원 금융 정책입니다. (군 복무 기간은 최대 6년 인정 가능)
                </p>
              </div>
            ) : (
              <>
                {/* 1:1 Side by Side Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* 청년도약계좌 카드 */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 text-[9px] font-bold text-blue-700 bg-blue-50 rounded">5년 만기 (60개월)</span>
                        <PiggyBank className="text-blue-500" size={16} />
                      </div>
                      <h3 className="mt-3 text-base font-extrabold text-gray-900">청년도약계좌</h3>
                      <p className="text-[10px] text-gray-400 mt-1">긴 납입기간 동안 목돈 규모를 극대화하는 플랜</p>

                      <div className="mt-5 space-y-2.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">월 납입 금액</span>
                          <span className="font-bold text-gray-800">{formatCurrency(comparison.leapMonthly / 10000)}만 원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">5년 납입 원금</span>
                          <span className="font-bold text-gray-800">{formatCurrency(comparison.leapPrincipal)}원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">세후 은행 이자 (비과세)</span>
                          <span className="font-bold text-green-600">+{formatCurrency(comparison.leapInterest)}원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">정부 매칭 기여금</span>
                          <span className="font-bold text-blue-600">+{formatCurrency(comparison.leapGovTotal)}원</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gray-400">만기 예상 실수령액</span>
                        <span className="text-lg font-black text-blue-600">
                          {formatCurrency(comparison.leapTotalAmount)}원
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] bg-blue-50/50 p-2 rounded-xl">
                        <span className="text-blue-700 font-bold">실질 환산 이율 (일반적금)</span>
                        <span className="text-blue-800 font-black">연 {comparison.leapEffectiveRate.toFixed(2)}% 효과</span>
                      </div>
                    </div>
                  </div>

                  {/* 청년미래적금 카드 */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 text-[9px] font-bold text-indigo-700 bg-indigo-50 rounded">3년 만기 (36개월)</span>
                        <PiggyBank className="text-indigo-500" size={16} />
                      </div>
                      <h3 className="mt-3 text-base font-extrabold text-gray-900">청년미래적금</h3>
                      <p className="text-[10px] text-gray-400 mt-1">짧은 호흡으로 가볍고 높은 기여금을 받는 플랜</p>

                      <div className="mt-5 space-y-2.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">월 납입 금액</span>
                          <span className="font-bold text-gray-800">{formatCurrency(comparison.futureMonthly / 10000)}만 원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">3년 납입 원금</span>
                          <span className="font-bold text-gray-800">{formatCurrency(comparison.futurePrincipal)}원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">세후 은행 이자 (비과세)</span>
                          <span className="font-bold text-green-600">+{formatCurrency(comparison.futureInterest)}원</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">정부 매칭 기여금 {isSmeNewHire && "(12% 우대)"}</span>
                          <span className="font-bold text-blue-600">+{formatCurrency(comparison.futureGovTotal)}원</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gray-400">만기 예상 실수령액</span>
                        <span className="text-lg font-black text-indigo-600">
                          {formatCurrency(comparison.futureTotalAmount)}원
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] bg-indigo-50/50 p-2 rounded-xl">
                        <span className="text-indigo-700 font-bold">실질 환산 이율 (일반적금)</span>
                        <span className="text-indigo-800 font-black">연 {comparison.futureEffectiveRate.toFixed(2)}% 효과</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 분석 진단 결론 */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-6 rounded-3xl shadow-md">
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                    <TrendingUp size={16} />
                    LifeFit의 상품 추천 및 자산 플래닝 제안
                  </h3>
                  
                  <div className="mt-4 text-xs space-y-3.5 leading-relaxed text-gray-200">
                    <p>
                      <strong>1. 만기 관리 측면 (3년 vs 5년):</strong> 청년도약계좌는 만기가 5년(60개월)으로 길기 때문에 중도 해지 리스크가 비교적 큽니다. 반면 청년미래적금은 만기가 3년으로 짧아 납입 유지가 훨씬 유리합니다.
                    </p>
                    {isSmeNewHire ? (
                      <p className="bg-white/10 p-3 rounded-xl border border-white/10">
                        ⭐ <strong>중소기업 청년 꿀팁:</strong> 중소기업 신규취업자이신 경우 청년미래적금 정부 매칭 비율이 <strong>12%로 대폭 상향</strong>되므로, 연 환산 환산 이율이 <strong>연 {comparison.futureEffectiveRate.toFixed(2)}%</strong>까지 도달합니다. 납입 여력이 분산된다면 미래적금을 50만 원 한도까지 우선 채우시는 것을 강력 추천합니다.
                      </p>
                    ) : (
                      <p>
                        <strong>2. 납입 한도 측면 (50만 원 vs 70만 원):</strong> 도약계좌는 월 최대 70만 원까지 저축할 수 있어, 만기 시 최종 자산 크기 자체는 {formatCurrency(comparison.leapTotalAmount)}원으로 훨씬 큽니다.
                      </p>
                    )}
                    <p>
                      <strong>3. 최적의 결합 전략:</strong> 여유 자금이 많다면 **두 상품에 동시 가입**하는 것도 가능합니다. 월 120만 원(도약계좌 70만 원 + 미래적금 50만 원)을 정기 적립할 경우 5년 뒤 부부나 1인 가구 기준 총 **약 {formatCurrency(comparison.leapTotalAmount + comparison.futureTotalAmount * 1.5)}만 원** 상당의 시드머니를 세금 한 푼 없이 수령할 수 있습니다.
                    </p>
                  </div>
                </div>

                {/* 상세 비교표 */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-4">한눈에 비교하는 2026 정부 정책 적금</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                          <th className="p-3">항목</th>
                          <th className="p-3">청년도약계좌 (5년)</th>
                          <th className="p-3">청년미래적금 (3년)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-gray-700">
                        <tr>
                          <td className="p-3 font-semibold text-gray-900">가입 기간</td>
                          <td className="p-3">60개월 (5년)</td>
                          <td className="p-3">36개월 (3년)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-gray-900">납입 한도</td>
                          <td className="p-3">월 최대 70만 원 (연 840만 원)</td>
                          <td className="p-3">월 최대 50만 원 (연 600만 원)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-gray-900">정부 지원 비율</td>
                          <td className="p-3">개인 소득에 따라 3.0% ~ 6.0% 매칭</td>
                          <td className="p-3">일반 6.0% / 중소기업 청년 12.0% 매칭</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-gray-900">비과세 혜택</td>
                          <td className="p-3">만기 시 이자소득세 15.4% 면제 (전액 비과세)</td>
                          <td className="p-3">만기 시 이자소득세 15.4% 면제 (전액 비과세)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-gray-900">가입 조건</td>
                          <td className="p-3">만 19~34세, 개인소득 7.5천 이하, 가구소득 180% 이하</td>
                          <td className="p-3">만 19~34세, 개인소득 7.5천 이하, 가구소득 180% 이하</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Ads & Subscription */}
            <AdSenseSlot adFormat="auto" />
            <SubscribeCard defaultCategory="saving" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

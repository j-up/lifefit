"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  Info,
  ChevronLeft,
  ChevronRight,
  Baby,
  PiggyBank,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import AdSenseSlot from "@/app/components/AdSenseSlot";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

interface MonthlyBenefit {
  monthIndex: number; // 0-based month index (0: birth month)
  yearIndex: number;  // 0-based year index (0: age 0)
  date: Date;
  voucherFirst: number;  // 첫만남이용권
  parentBenefitCash: number; // 부모급여 (현금)
  parentBenefitVoucher: number; // 부모급여 (보육료 대체분)
  childAllowance: number; // 아동수당
  homeCareAllowance: number; // 가정양육수당
  daycareSupport: number; // 어린이집 보육료 지원 (바우처 상당액)
  paternalLeave: number; // 아빠 육아휴직
  maternalLeave: number; // 엄마 육아휴직
}

export default function ChildBenefitsPage() {
  const [birthDateStr, setBirthDateStr] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [childOrder, setChildOrder] = useState<"first" | "second" | "third">("first");
  const [careType, setCareType] = useState<"home" | "facility">("home");
  
  // 육아휴직 관련 입력
  const [includeLeave, setIncludeLeave] = useState<boolean>(false);
  const [fatherLeaveMonths, setFatherLeaveMonths] = useState<number>(3);
  const [fatherSalaryStr, setFatherSalaryStr] = useState<string>("350"); // 월 통상임금 (만원)
  const [motherLeaveMonths, setMotherLeaveMonths] = useState<number>(3);
  const [motherSalaryStr, setMotherSalaryStr] = useState<string>("300"); // 월 통상임금 (만원)

  // 캘린더 보기 기준 연월
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());

  // 타임라인 데이터 연도 선택
  const [selectedAgeTab, setSelectedAgeTab] = useState<number>(0); // 0세, 1세, 2세 ...

  // 출생일 Date 객체
  const birthDate = useMemo(() => {
    return new Date(birthDateStr);
  }, [birthDateStr]);

  // 96개월(만 8세 생일 직전) 동안의 월별 혜택 계산
  const monthlyData = useMemo<MonthlyBenefit[]>(() => {
    const data: MonthlyBenefit[] = [];
    const fatherSalary = (parseFloat(fatherSalaryStr) || 0) * 10000;
    const motherSalary = (parseFloat(motherSalaryStr) || 0) * 10000;

    for (let m = 0; m < 96; m++) {
      // 혜택 지급일 (보통 매월 25일)
      const payDate = new Date(birthDate);
      payDate.setMonth(birthDate.getMonth() + m);
      payDate.setDate(25);

      const yearIndex = Math.floor(m / 12);
      
      // 1. 첫만남이용권 (출생 첫 달에만 일시금)
      let voucherFirst = 0;
      if (m === 0) {
        voucherFirst = childOrder === "first" ? 2000000 : 3000000;
      }

      // 2. 아동수당 (만 8세 미만, 즉 0~95개월까지 월 10만원)
      const childAllowance = 100000;

      // 3. 부모급여 (만 2세 미만, 즉 0~23개월까지)
      let parentBenefitCash = 0;
      let parentBenefitVoucher = 0;
      let daycareSupport = 0;

      if (m < 12) {
        // 0세 (0~11개월): 월 100만 원 상당
        if (careType === "home") {
          parentBenefitCash = 1000000;
        } else {
          // 어린이집 이용 시 보육료 바우처(약 54만원) 차감 후 차액 약 46만원 현금 지급
          parentBenefitVoucher = 540000;
          parentBenefitCash = 460000;
          daycareSupport = 540000;
        }
      } else if (m < 24) {
        // 1세 (12~23개월): 월 50만 원 상당
        if (careType === "home") {
          parentBenefitCash = 500000;
        } else {
          // 어린이집 이용 시 보육료 바우처(약 54만원) 전액 지원 (현금 추가지급 없음)
          parentBenefitVoucher = 500000;
          daycareSupport = 540000; // 정부 지원 바우처
        }
      }

      // 4. 가정양육수당 (만 2세~7세, 즉 24~85개월까지)
      // 어린이집 미이용(가정 보육) 시에만 월 10만 원 현금 지급
      let homeCareAllowance = 0;
      if (careType === "home" && m >= 24 && m <= 85) {
        homeCareAllowance = 100000;
      } else if (careType === "facility" && m >= 24 && m <= 85) {
        // 어린이집/유치원 이용 시 누리과정 보육료 지원 (바우처 약 28만원 상당)
        daycareSupport = 280000;
      }

      // 5. 육아휴직급여 모의계산
      let paternalLeave = 0;
      let maternalLeave = 0;

      if (includeLeave) {
        // 아빠 육아휴직급여 (출생 초기 1~12개월 사이 사용 가정)
        // 6+6 부모휴직제 반영을 위해 심플하게 평균지급으로 계산 (통상임금 80%, 상한 150만원 적용)
        if (m >= 1 && m <= fatherLeaveMonths) {
          paternalLeave = Math.min(fatherSalary * 0.8, 1500000);
        }
        // 엄마 육아휴직급여
        if (m >= 1 && m <= motherLeaveMonths) {
          maternalLeave = Math.min(motherSalary * 0.8, 1500000);
        }
      }

      data.push({
        monthIndex: m,
        yearIndex,
        date: payDate,
        voucherFirst,
        parentBenefitCash,
        parentBenefitVoucher,
        childAllowance,
        homeCareAllowance,
        daycareSupport,
        paternalLeave,
        maternalLeave,
      });
    }

    return data;
  }, [birthDate, childOrder, careType, includeLeave, fatherLeaveMonths, fatherSalaryStr, motherLeaveMonths, motherSalaryStr]);

  // 요약 메트릭 계산
  const summary = useMemo(() => {
    let totalCash = 0;
    let totalVoucher = 0;
    let totalLeave = 0;

    monthlyData.forEach((d) => {
      totalCash += d.voucherFirst + d.parentBenefitCash + d.childAllowance + d.homeCareAllowance;
      totalVoucher += d.parentBenefitVoucher + d.daycareSupport;
      totalLeave += d.paternalLeave + d.maternalLeave;
    });

    return {
      totalCash,
      totalVoucher,
      totalLeave,
      totalGrand: totalCash + totalVoucher + totalLeave,
    };
  }, [monthlyData]);

  // 캘린더 날짜 필터링
  const calendarBenefits = useMemo(() => {
    return monthlyData.filter((d) => {
      return (
        d.date.getFullYear() === calendarYear &&
        d.date.getMonth() === calendarMonth
      );
    });
  }, [monthlyData, calendarYear, calendarMonth]);

  // 나이별 탭 데이터 그룹화
  const ageGroupData = useMemo(() => {
    const years: Record<number, MonthlyBenefit[]> = {};
    monthlyData.forEach((d) => {
      if (!years[d.yearIndex]) {
        years[d.yearIndex] = [];
      }
      years[d.yearIndex].push(d);
    });
    return years;
  }, [monthlyData]);

  // 캘린더 이전/다음 이동
  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

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

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 mb-3">
            🍼 정부 혜택 타임라인
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            우리 아이 정부 지원금 캘린더
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            자녀의 생년월일만 입력하면 만 8세(96개월)까지 매월 통장으로 들어올 모든 지원금의 종류와 지급 날짜를 맞춤 생성해 드립니다.
          </p>
        </div>

        {/* Form and Summary Container */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Inputs */}
          <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5 h-fit">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">자녀 정보 입력</h2>

            {/* Birthdate */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">출생년월일 (또는 예정일)</label>
              <input
                type="date"
                value={birthDateStr}
                onChange={(e) => setBirthDateStr(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none font-bold text-gray-800"
              />
            </div>

            {/* Child Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">자녀 순위</label>
              <div className="flex gap-2">
                {(["first", "second", "third"] as const).map((order) => (
                  <button
                    key={order}
                    type="button"
                    onClick={() => setChildOrder(order)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      childOrder === order
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-white border-gray-200 text-gray-500"
                    }`}
                  >
                    {order === "first" ? "첫째" : order === "second" ? "둘째" : "셋째 이상"}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">* 첫만남이용권 바우처가 첫째 200만 원, 둘째 이상은 300만 원으로 차등 지급됩니다.</p>
            </div>

            {/* Care Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">보육 상태</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCareType("home")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    careType === "home" ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  가정 보육
                </button>
                <button
                  type="button"
                  onClick={() => setCareType("facility")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    careType === "facility" ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  어린이집/유치원
                </button>
              </div>
              <p className="text-[10px] text-gray-400">
                * 어린이집 이용 시 부모급여는 보육료 바우처로 우선 차감되며, 양육수당 대신 기관 보육료 지원금이 국가에서 직접 보육시설로 지급됩니다.
              </p>
            </div>

            {/* Parental Leave */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">부모 육아휴직 포함</label>
                <input
                  type="checkbox"
                  checked={includeLeave}
                  onChange={(e) => setIncludeLeave(e.target.checked)}
                  className="h-4 w-4 rounded text-rose-600 border-gray-300 focus:ring-rose-500"
                />
              </div>

              {includeLeave && (
                <div className="space-y-3 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
                  {/* Father Leave */}
                  <div className="space-y-1">
                    <span className="font-bold text-gray-700">아빠 육아휴직</span>
                    <div className="flex gap-2">
                      <select
                        value={fatherLeaveMonths}
                        onChange={(e) => setFatherLeaveMonths(parseInt(e.target.value))}
                        className="flex-1 rounded-lg border border-gray-200 p-1.5 text-xs"
                      >
                        {[3, 6, 12].map((m) => (
                          <option key={m} value={m}>{m}개월 사용</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={fatherSalaryStr}
                        onChange={(e) => setFatherSalaryStr(e.target.value)}
                        className="w-20 rounded-lg border border-gray-200 p-1.5 text-right font-bold"
                        placeholder="급여"
                      />
                      <span className="self-center font-bold text-gray-500">만원</span>
                    </div>
                  </div>

                  {/* Mother Leave */}
                  <div className="space-y-1">
                    <span className="font-bold text-gray-700">엄마 육아휴직</span>
                    <div className="flex gap-2">
                      <select
                        value={motherLeaveMonths}
                        onChange={(e) => setMotherLeaveMonths(parseInt(e.target.value))}
                        className="flex-1 rounded-lg border border-gray-200 p-1.5 text-xs"
                      >
                        {[3, 6, 12].map((m) => (
                          <option key={m} value={m}>{m}개월 사용</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={motherSalaryStr}
                        onChange={(e) => setMotherSalaryStr(e.target.value)}
                        className="w-20 rounded-lg border border-gray-200 p-1.5 text-right font-bold"
                        placeholder="급여"
                      />
                      <span className="self-center font-bold text-gray-500">만원</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report & Interactive calendar */}
          <div className="md:col-span-2 space-y-6">
            {/* Total summary board */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-3xl text-white shadow-sm grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-100 font-bold block">총 예상 정부 지원 규모</span>
                <span className="text-xl font-black block">{formatCurrency(summary.totalGrand)}원</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-rose-100 font-bold block">현금 지급액</span>
                <span className="text-sm font-extrabold block">{formatCurrency(summary.totalCash)}원</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-rose-100 font-bold block">보육료 바우처</span>
                <span className="text-sm font-extrabold block">{formatCurrency(summary.totalVoucher)}원</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-rose-100 font-bold block">육아휴직 급여</span>
                <span className="text-sm font-extrabold block">{formatCurrency(summary.totalLeave)}원</span>
              </div>
            </div>

            {/* Monthly Calendar View */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon size={18} className="text-rose-500" />
                  <h3 className="font-bold text-gray-900 text-sm">지급 캘린더 모아보기</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-1 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold text-gray-800">
                    {calendarYear}년 {calendarMonth + 1}월
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {calendarBenefits.length === 0 ? (
                <p className="text-center py-8 text-xs text-gray-400">
                  선택한 월에는 지급받을 예정인 정부 수당 혜택 일정이 없습니다.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] text-rose-500 font-bold">
                    매달 25일은 수당 지급일입니다! (공휴일일 경우 직전 영업일 지급)
                  </p>
                  
                  {calendarBenefits.map((b) => {
                    const ageMonths = b.monthIndex;
                    const years = Math.floor(ageMonths / 12);
                    const months = ageMonths % 12;

                    return (
                      <div key={b.monthIndex} className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-gray-900">25일 지급 예정액</span>
                          <span className="font-medium text-gray-400">아동 생후 {years}년 {months}개월 차</span>
                        </div>
                        
                        <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                          {b.voucherFirst > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">🎉 첫만남이용권 바우처</span>
                              <span className="font-extrabold text-gray-800">+{formatCurrency(b.voucherFirst)}원</span>
                            </div>
                          )}
                          {b.parentBenefitCash > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">💰 부모급여 (현금 지급)</span>
                              <span className="font-extrabold text-rose-600">+{formatCurrency(b.parentBenefitCash)}원</span>
                            </div>
                          )}
                          {b.parentBenefitVoucher > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">🎟️ 부모급여 보육료 바우처 (기관 지급)</span>
                              <span className="font-semibold text-gray-600">+{formatCurrency(b.parentBenefitVoucher)}원</span>
                            </div>
                          )}
                          {b.childAllowance > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">👶 아동수당 (현금 지급)</span>
                              <span className="font-extrabold text-rose-600">+{formatCurrency(b.childAllowance)}원</span>
                            </div>
                          )}
                          {b.homeCareAllowance > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">🏡 가정양육수당 (현금 지급)</span>
                              <span className="font-extrabold text-rose-600">+{formatCurrency(b.homeCareAllowance)}원</span>
                            </div>
                          )}
                          {b.daycareSupport > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">🏫 보육료/누리과정 지원금 (바우처)</span>
                              <span className="font-semibold text-gray-600">+{formatCurrency(b.daycareSupport)}원</span>
                            </div>
                          )}
                          {b.paternalLeave > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">💼 아빠 육아휴직 급여</span>
                              <span className="font-extrabold text-blue-600">+{formatCurrency(b.paternalLeave)}원</span>
                            </div>
                          )}
                          {b.maternalLeave > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">💼 엄마 육아휴직 급여</span>
                              <span className="font-extrabold text-blue-600">+{formatCurrency(b.maternalLeave)}원</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                          <span className="text-xs text-gray-500 font-bold">월 합계</span>
                          <span className="text-base font-black text-rose-600">
                            {formatCurrency(
                              b.voucherFirst +
                              b.parentBenefitCash +
                              b.childAllowance +
                              b.homeCareAllowance +
                              b.paternalLeave +
                              b.maternalLeave
                            )}원
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Age Tabs Timeline */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4">자녀 연령대별 혜택 타임라인</h3>
              
              {/* Age select buttons */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {[0, 1, 2, 3, 5, 7].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setSelectedAgeTab(age)}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedAgeTab === age
                        ? "bg-rose-50 border-rose-100 text-rose-600"
                        : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    만 {age}세
                  </button>
                ))}
              </div>

              {/* Age description details */}
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-3">
                {selectedAgeTab === 0 && (
                  <>
                    <h4 className="font-extrabold text-gray-900 text-sm">만 0세 시기 (출생 ~ 11개월 차)</h4>
                    <p className="leading-relaxed text-gray-600">
                      출생 신고 즉시 <strong>첫만남이용권(일시금 {childOrder === "first" ? "200" : "300"}만 원)</strong> 바우처 카드가 지급되어 산후조리원이나 기저귀/분유 구매에 사용 가능합니다.
                    </p>
                    <p className="leading-relaxed text-gray-600">
                      매달 25일 <strong>부모급여 현금 100만 원</strong>과 <strong>아동수당 현금 10만 원</strong>이 지급되어 월 고정 현금 지원액은 **총 110만 원**입니다. (어린이집 이용 시 보육료 바우처를 제외한 금액을 현금 수령)
                    </p>
                  </>
                )}
                {selectedAgeTab === 1 && (
                  <>
                    <h4 className="font-extrabold text-gray-900 text-sm">만 1세 시기 (12개월 ~ 23개월 차)</h4>
                    <p className="leading-relaxed text-gray-600">
                      부모급여 현금 지원액이 <strong>월 50만 원</strong>으로 조정되며 아동수당은 월 10만 원이 그대로 지급됩니다. (월 총 60만 원 지원)
                    </p>
                    <p className="leading-relaxed text-gray-600">
                      이 시기에 어린이집에 등원하게 되면 부모급여가 전액 보육료 지원 바우처로 전환되어 시설로 직접 자동 이체됩니다.
                    </p>
                  </>
                )}
                {selectedAgeTab >= 2 && (
                  <>
                    <h4 className="font-extrabold text-gray-900 text-sm">만 {selectedAgeTab}세 ~ 만 7세 시기</h4>
                    <p className="leading-relaxed text-gray-600">
                      부모급여가 만료되고, 보육 상태에 따라 지원 방식이 달라집니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>가정 보육 시:</strong> 아동수당 월 10만 원 + 가정양육수당 월 10만 원 (매월 현금 20만 원 입금)</li>
                      <li><strong>어린이집/유치원 이용 시:</strong> 아동수당 월 10만 원 현금 지급 + 보육료 바우처(약 28만 원) 정부 대리 지급</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* General Guide FAQ */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                <Info size={16} className="text-gray-400" />
                육아 지원금 수령 주의사항 FAQ
              </h3>
              
              <div className="text-xs space-y-3.5 leading-relaxed text-gray-600">
                <div>
                  <h4 className="font-extrabold text-gray-800">Q. 출생 신고는 언제 해야 지원금을 온전히 받나요?</h4>
                  <p className="mt-1">
                    자녀 출생일 기준 <strong>60일 이내</strong>에 주소지 읍/면/동 행정복지센터나 온라인 정부24를 통해 수당을 신청하셔야 출생월부터 소급하여 지원금을 지급받을 수 있습니다. 60일이 지나면 신청일로부터 소급 제한이 생길 수 있으니 신속히 신고하세요.
                  </p>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-800">Q. 부모급여와 아동수당, 첫만남이용권은 중복 지급되나요?</h4>
                  <p className="mt-1">
                    <strong>네, 전액 중복 수령이 가능합니다.</strong> 정부에서 저출산 문제를 극복하기 위해 다중 혜택으로 중복 매칭해 드립니다. 자격 기준만 충족하면 모두 신청하여 수령하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Ads */}
            <AdSenseSlot adFormat="auto" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

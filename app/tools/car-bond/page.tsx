"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Car,
  MapPin,
  Calendar,
  Coins,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Circle,
  Share2,
  Calculator,
  ExternalLink,
  Landmark,
  Banknote,
  TrendingUp,
  Info,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

type Region =
  | "seoul"
  | "busan"
  | "daegu"
  | "incheon"
  | "gwangju"
  | "daejeon"
  | "ulsan"
  | "gyeonggi"
  | "etc";

type CarType = "small" | "medium" | "large" | "suv";

type Year = "before2018" | "2019" | "2020" | "2021" | "after2022";

const INTEREST_RATE = 0.018;

const REGION_DATA: Record<
  Region,
  {
    name: string;
    rates: Record<CarType, number>;
    bank: { name: string; url: string };
  }
> = {
  seoul: {
    name: "서울",
    rates: { small: 0.08, medium: 0.10, large: 0.12, suv: 0.11 },
    bank: { name: "신한은행", url: "https://www.shinhan.com/" },
  },
  busan: {
    name: "부산",
    rates: { small: 0.07, medium: 0.09, large: 0.11, suv: 0.10 },
    bank: { name: "BNK부산은행", url: "https://www.busanbank.co.kr/" },
  },
  daegu: {
    name: "대구",
    rates: { small: 0.06, medium: 0.08, large: 0.10, suv: 0.09 },
    bank: { name: "BNK대구은행", url: "https://www.dgb.co.kr/" },
  },
  incheon: {
    name: "인천",
    rates: { small: 0.07, medium: 0.09, large: 0.11, suv: 0.10 },
    bank: { name: "신한은행", url: "https://www.shinhan.com/" },
  },
  gwangju: {
    name: "광주",
    rates: { small: 0.06, medium: 0.08, large: 0.10, suv: 0.09 },
    bank: { name: "JB광주은행", url: "https://www.kjbank.com/" },
  },
  daejeon: {
    name: "대전",
    rates: { small: 0.06, medium: 0.08, large: 0.10, suv: 0.09 },
    bank: { name: "NH농협은행", url: "https://www.nonghyup.com/" },
  },
  ulsan: {
    name: "울산",
    rates: { small: 0.06, medium: 0.08, large: 0.10, suv: 0.09 },
    bank: { name: "NH농협은행", url: "https://www.nonghyup.com/" },
  },
  gyeonggi: {
    name: "경기",
    rates: { small: 0.07, medium: 0.09, large: 0.11, suv: 0.10 },
    bank: { name: "NH농협은행", url: "https://www.nonghyup.com/" },
  },
  etc: {
    name: "기타 지방",
    rates: { small: 0.05, medium: 0.07, large: 0.09, suv: 0.08 },
    bank: { name: "NH농협은행", url: "https://www.nonghyup.com/" },
  },
};

const CAR_TYPE_DATA: Record<CarType, { label: string; desc: string }> = {
  small: { label: "소형", desc: "1,000cc 미만" },
  medium: { label: "중형", desc: "2,000cc 미만" },
  large: { label: "대형", desc: "2,000cc 이상" },
  suv: { label: "SUV·승합", desc: "SUV 및 승합차" },
};

const YEAR_DATA: Record<Year, { label: string; yearNum: number; maturityStatus: string }> = {
  before2018: { label: "2018년 이전", yearNum: 2017, maturityStatus: "만기 후 5년 이상 경과" },
  2019: { label: "2019년", yearNum: 2019, maturityStatus: "만기 도래·환급 가능" },
  2020: { label: "2020년", yearNum: 2020, maturityStatus: "만기 도래·환급 가능" },
  2021: { label: "2021년", yearNum: 2021, maturityStatus: "즉시 환급 가능" },
  after2022: { label: "2022년 이후", yearNum: 2023, maturityStatus: "만기 예정" },
};

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

function calculateBond(
  price: number,
  region: Region,
  carType: CarType,
  year: Year
): {
  principal: number;
  interest: number;
  total: number;
  years: number;
  rate: number;
  isExpired: boolean;
  maturityStatus: string;
} {
  const rate = REGION_DATA[region].rates[carType];
  const principal = price * rate;

  const yearNum = YEAR_DATA[year].yearNum;
  const years = Math.max(0, 2026 - yearNum);

  const interest = principal * (Math.pow(1 + INTEREST_RATE, years) - 1);
  const total = principal + interest;

  const isExpired = year === "before2018";
  const maturityStatus = YEAR_DATA[year].maturityStatus;

  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    total: Math.round(total),
    years,
    rate,
    isExpired,
    maturityStatus,
  };
}

export default function CarBondPage() {
  const [step, setStep] = useState<Step>(1);
  const [region, setRegion] = useState<Region | null>(null);
  const [carType, setCarType] = useState<CarType | null>(null);
  const [year, setYear] = useState<Year | null>(null);
  const [priceStr, setPriceStr] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSharedResult, setIsSharedResult] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("region") as Region | null;
      const t = params.get("type") as CarType | null;
      const y = params.get("year") as Year | null;
      const p = params.get("price");

      if (r && t && y && p !== null) {
        setRegion(r);
        setCarType(t);
        setYear(y);
        setPriceStr(p);
        setStep(5);
        setIsSharedResult(true);
      }
    }
  }, []);

  const price = priceStr === "" ? 0 : parseInt(priceStr, 10) * 10_000;

  const results = useMemo(() => {
    if (!region || !carType || !year || price <= 0) return null;
    return calculateBond(price, region, carType, year);
  }, [price, region, carType, year]);

  const canProceed = useCallback(() => {
    switch (step) {
      case 1:
        return region !== null;
      case 2:
        return carType !== null;
      case 3:
        return year !== null;
      case 4:
        return price > 0;
      default:
        return true;
    }
  }, [step, region, carType, year, price]);

  const nextStep = useCallback(() => {
    if (!canProceed()) return;
    if (step < 5) setStep((s) => (s + 1) as Step);
  }, [canProceed, step]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }, [step]);

  const handleShare = async () => {
    if (!results || !region || !carType || !year) return;
    const resultText = `[LifeFit] 자동차 미환급 채권 환급금 모의계산 🚗\n✅ 내 예상 환급금: 약 ${formatCurrency(results.total)}원\n(원금 ${formatCurrency(results.principal)}원 + 이자 ${formatCurrency(results.interest)}원)`;
    const shareUrl = `https://lifefit.kr/tools/car-bond?region=${region}&type=${carType}&year=${year}&price=${priceStr}`;
    const fullText = `${resultText}\n\n👉 나도 1분 만에 계산해보기:\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 자동차 미환급 채권 환급금 계산기",
          text: `\n${resultText}`,
          url: shareUrl,
        });
      } catch {
        // 사용자 취소 시 무시
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        alert("복사에 실패했습니다.");
      }
    }
  };

  const stepTitles = [
    "차량 등록 지역",
    "차량 유형",
    "차량 구매 시기",
    "차량 구매 가격",
    "예상 환급금",
  ];

  const allRegions: Region[] = [
    "seoul",
    "busan",
    "daegu",
    "incheon",
    "gwangju",
    "daejeon",
    "ulsan",
    "gyeonggi",
    "etc",
  ];

  const allCarTypes: CarType[] = ["small", "medium", "large", "suv"];
  const allYears: Year[] = ["before2018", "2019", "2020", "2021", "after2022"];

  return (
    <main className="min-h-screen bg-[#f2f4f6] flex flex-col items-center px-4 py-6 sm:py-10">
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00c471] text-white mb-3 shadow-lg shadow-green-200">
            <Car size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#191f28] tracking-tight">
            자동차 미환급 채권
          </h1>
          <p className="text-sm text-[#8b95a1] mt-1">
            환급금 예상 계산기
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          {[1, 2, 3, 4, 5].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s === step
                    ? "bg-[#00c471] text-white"
                    : s < step
                    ? "bg-[#e8f9f0] text-[#00c471]"
                    : "bg-white text-[#8b95a1] border border-[#e5e8eb]"
                }`}
              >
                {s < step ? <CheckCircle2 size={16} /> : s}
              </div>
              {idx < 4 && (
                <div
                  className={`w-6 h-0.5 mx-1 ${
                    s < step ? "bg-[#00c471]" : "bg-[#e5e8eb]"
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
            {step === 1 && "차량을 등록한 지자체를 선택해 주세요."}
            {step === 2 && "차량의 배기량 기준 유형을 선택해 주세요."}
            {step === 3 && "차량을 구매한 연도를 선택해 주세요."}
            {step === 4 && "차량 구매 가격을 만원 단위로 입력해 주세요."}
            {step === 5 && "예상 환급 금액을 확인해 보세요."}
          </p>

          {step === 1 && (
            <div className="grid grid-cols-3 gap-3">
              {allRegions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all ${
                    region === r
                      ? "border-[#00c471] bg-[#e8f9f0] text-[#00c471]"
                      : "border-[#e5e8eb] bg-white text-[#4e5968] hover:border-[#b0b8c1]"
                  }`}
                >
                  <MapPin size={20} className="mb-1" />
                  <span className="text-sm font-bold">{REGION_DATA[r].name}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {allCarTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setCarType(t)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    carType === t
                      ? "border-[#00c471] bg-[#e8f9f0]"
                      : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Car
                      size={22}
                      className={
                        carType === t ? "text-[#00c471]" : "text-[#8b95a1]"
                      }
                    />
                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          carType === t ? "text-[#00c471]" : "text-[#191f28]"
                        }`}
                      >
                        {CAR_TYPE_DATA[t].label}
                      </p>
                      <p className="text-xs text-[#8b95a1]">
                        {CAR_TYPE_DATA[t].desc}
                      </p>
                    </div>
                  </div>
                  {carType === t ? (
                    <CheckCircle2 size={22} className="text-[#00c471]" />
                  ) : (
                    <Circle size={22} className="text-[#e5e8eb]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {allYears.map((y) => {
                const isExpired = y === "before2018";
                return (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      year === y
                        ? isExpired
                          ? "border-[#f04452] bg-[#fff0f0]"
                          : "border-[#00c471] bg-[#e8f9f0]"
                        : "border-[#e5e8eb] bg-white hover:border-[#b0b8c1]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar
                        size={22}
                        className={
                          year === y
                            ? isExpired
                              ? "text-[#f04452]"
                              : "text-[#00c471]"
                            : "text-[#8b95a1]"
                        }
                      />
                      <div className="text-left">
                        <p
                          className={`font-bold ${
                            year === y
                              ? isExpired
                                ? "text-[#f04452]"
                                : "text-[#00c471]"
                              : "text-[#191f28]"
                          }`}
                        >
                          {YEAR_DATA[y].label}
                        </p>
                        <p
                          className={`text-xs ${
                            isExpired ? "text-[#f04452]" : "text-[#8b95a1]"
                          }`}
                        >
                          {YEAR_DATA[y].maturityStatus}
                        </p>
                      </div>
                    </div>
                    {year === y ? (
                      <CheckCircle2
                        size={22}
                        className={isExpired ? "text-[#f04452]" : "text-[#00c471]"}
                      />
                    ) : (
                      <Circle size={22} className="text-[#e5e8eb]" />
                    )}
                  </button>
                );
              })}
              <div className="rounded-xl bg-[#fff8db] p-3 text-xs text-[#8b6a00] leading-relaxed flex items-start gap-2">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p>
                  2021년 이전 구매자는 지금 즉시 환급 가능합니다. 2022년 이후
                  구매자는 만기 예정입니다.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="relative">
                <Coins
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b95a1]"
                  size={20}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={priceStr}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) {
                      setPriceStr(val);
                    }
                  }}
                  placeholder="예: 3000"
                  className="w-full h-14 pl-12 pr-16 rounded-2xl bg-[#f2f4f6] text-[#191f28] text-lg font-bold placeholder:text-[#b0b8c1] outline-none focus:ring-2 focus:ring-[#00c471] transition-shadow"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] font-medium">
                  만원
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1500, 2000, 2500, 3000, 3500, 4000, 5000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPriceStr(String(val))}
                    className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-sm text-[#4e5968] font-medium hover:bg-[#e8f9f0] hover:text-[#00c471] transition-colors"
                  >
                    {val}만
                  </button>
                ))}
              </div>
              {price > 0 && (
                <p className="text-sm text-[#00c471] font-medium">
                  입력하신 차량 가격: {formatCurrency(price)}원
                </p>
              )}
            </div>
          )}

          {step === 5 && results && region && carType && year && (
            <div className="space-y-6">
              {isSharedResult && (
                <div className="w-full rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-800 border border-green-100 flex items-center justify-center gap-1.5">
                  <span>💌</span> 친구가 보내온 맞춤 채권 환급 결과지입니다!
                </div>
              )}

              {/* 광고 플레이스홀더 상단 */}
              <div className="w-full h-[90px] bg-[#f2f4f6] rounded-xl border border-dashed border-[#d1d6db] flex items-center justify-center text-xs text-[#b0b8c1]">
                AdSense 광고 영역
              </div>

              {/* 만기/시효 경고 */}
              {results.isExpired && (
                <div className="rounded-2xl bg-[#fff0f0] p-4 text-sm text-[#b91c1c] leading-relaxed border border-[#fecaca]">
                  <div className="flex items-start gap-2 mb-1">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <p className="font-bold">주의: 청구 시효 만료 가능성</p>
                  </div>
                  <p className="pl-6 text-xs leading-relaxed">
                    2018년 이전 구매자의 경우, 만기 후 5년 청구시효가 지나
                    국고로 소멸되었을 가능성이 있습니다. 해당 지자체 금고
                    은행에 반드시 직접 확인해 보세요.
                  </p>
                </div>
              )}

              {!results.isExpired && year === "after2022" && (
                <div className="rounded-2xl bg-[#e8f3ff] p-4 text-sm text-[#1e6fdb] leading-relaxed border border-[#bfdbfe]">
                  <div className="flex items-start gap-2 mb-1">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p className="font-bold">만기 예정 안내</p>
                  </div>
                  <p className="pl-6 text-xs leading-relaxed">
                    2022년 이후 구매자는 아직 채권 만기가 도래하지 않았을 수
                    있습니다. 만기 도래 후 금고 은행에서 환급 신청이
                    가능합니다.
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="text-center py-4">
                <p className="text-sm text-[#8b95a1] mb-1">
                  당신이 돌려받을 수 있는 예상 자동차 채권 환급금
                </p>
                <p className="text-4xl font-extrabold text-[#191f28] tracking-tight">
                  약 {formatCurrency(results.total)}
                  <span className="text-xl font-bold ml-1">원</span>
                </p>
                <p className="text-xs text-[#8b95a1] mt-2">
                  ※ 지역·배기량별 매입 요율 및 연 {Math.round(INTEREST_RATE * 100)}% 복리 이자 모의계산
                </p>
              </div>

              {/* Bar Chart */}
              <div className="bg-[#f8f9fa] rounded-2xl p-4 space-y-4">
                <p className="text-sm font-bold text-[#4e5968]">
                  환급금 구성
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4e5968] font-medium">
                        채권 원금
                      </span>
                      <span className="text-[#191f28] font-bold">
                        {formatCurrency(results.principal)}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                      <div
                        className="h-full bg-[#8b95a1] rounded-full transition-all duration-700"
                        style={{
                          width: `${
                            results.total > 0
                              ? (results.principal / results.total) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4e5968] font-medium">
                        복리 이자 ({results.years}년)
                      </span>
                      <span className="text-[#00c471] font-bold">
                        {formatCurrency(results.interest)}원
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e5e8eb]">
                      <div
                        className="h-full bg-[#00c471] rounded-full transition-all duration-700"
                        style={{
                          width: `${
                            results.total > 0
                              ? (results.interest / results.total) * 100
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
                    채권 매입 원금
                  </p>
                  <p className="text-base font-bold text-[#191f28]">
                    {formatCurrency(results.principal)}원
                  </p>
                </div>
                <div className="bg-[#f8f9fa] rounded-2xl p-4 text-center">
                  <TrendingUp
                    size={20}
                    className="mx-auto mb-2 text-[#00c471]"
                  />
                  <p className="text-xs text-[#8b95a1] mb-0.5">
                    복리 이자
                  </p>
                  <p className="text-base font-bold text-[#00c471]">
                    {formatCurrency(results.interest)}원
                  </p>
                </div>
              </div>

              {/* Input summary */}
              <div className="rounded-2xl bg-[#f2f4f6] p-4 text-xs text-[#4e5968] space-y-2">
                <div className="flex justify-between">
                  <span>지역</span>
                  <span className="font-bold">{REGION_DATA[region].name}</span>
                </div>
                <div className="flex justify-between">
                  <span>차량 유형</span>
                  <span className="font-bold">{CAR_TYPE_DATA[carType].label}</span>
                </div>
                <div className="flex justify-between">
                  <span>구매 시기</span>
                  <span className="font-bold">{YEAR_DATA[year].label}</span>
                </div>
                <div className="flex justify-between">
                  <span>차량 가격</span>
                  <span className="font-bold">{formatCurrency(price)}원</span>
                </div>
                <div className="flex justify-between">
                  <span>매입 요율</span>
                  <span className="font-bold">{(results.rate * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* 광고 플레이스홀더 하단 */}
              <div className="w-full h-[90px] bg-[#f2f4f6] rounded-xl border border-dashed border-[#d1d6db] flex items-center justify-center text-xs text-[#b0b8c1]">
                AdSense 광고 영역
              </div>

              {/* 지자체별 금고 은행 링크 */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#191f28]">
                  지자체별 금고 은행에서 실제 조회하기
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(REGION_DATA).map(([key, data]) => (
                    <a
                      key={key}
                      href={data.bank.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e5e8eb] hover:border-[#00c471] hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Landmark size={16} className="text-[#8b95a1]" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-[#191f28]">
                            {data.name}
                          </p>
                          <p className="text-[10px] text-[#8b95a1]">
                            {data.bank.name}
                          </p>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-[#b0b8c1]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-2xl bg-[#fff8db] p-4 text-xs text-[#8b6a00] leading-relaxed">
                <p className="font-bold mb-1">참고 사항</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>
                    본 계산기는 행안부 고시 기준을 참고한 모의계산 도구이며,
                    실제 환급금과 차이가 있을 수 있습니다.
                  </li>
                  <li>
                    지역개발채권·도시철도채권은 지자체별로 금고 은행이
                    다르므로, 해당 지자체 또는 금고 은행에 직접 문의하세요.
                  </li>
                  <li>
                    만기 후 5년이 지나면 청구 시효가 소멸되어 국고로
                    귀속됩니다.
                  </li>
                </ul>
              </div>
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
                    ? "bg-[#00c471] text-white shadow-md shadow-green-200 hover:bg-[#00a85e]"
                    : "bg-[#e5e8eb] text-[#b0b8c1] cursor-not-allowed"
                }`}
              >
                다음
                <ChevronRight size={18} />
              </button>
            )}
            {step === 5 && (
              <div className="flex w-full gap-2">
                <button
                  onClick={() => {
                    setStep(1);
                    setRegion(null);
                    setCarType(null);
                    setYear(null);
                    setPriceStr("");
                    setIsSharedResult(false);
                    if (typeof window !== "undefined") {
                      window.history.replaceState({}, "", window.location.pathname);
                    }
                  }}
                  className="flex-1 h-12 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-bold text-sm flex items-center justify-center hover:bg-[#e5e8eb] transition-colors"
                >
                  <Calculator size={16} className="mr-1" />
                  {isSharedResult ? "나도 계산해보기" : "다시 계산하기"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 h-12 rounded-2xl bg-[#00c471] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-green-200 hover:bg-[#00a85e] transition-colors"
                >
                  <Share2 size={16} />
                  {isCopied ? "링크 복사 완료!" : "결과 공유하기"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#b0b8c1] mt-6 leading-relaxed">
          본 계산기는 행정안전부 고시 및 지자체 채권 발행 기준을 참고한
          모의계산 도구입니다.
          <br />
          실제 환급금과 차이가 있을 수 있으니 해당 지자체 또는 금고 은행에
          직접 확인하시기 바랍니다.
        </p>

        {/* 하단 SEO 텍스트 */}
        <article className="mt-8 p-5 bg-white rounded-2xl border border-[#e5e8eb] text-sm text-[#4e5968] leading-relaxed">
          <h2 className="text-base font-bold text-[#191f28] mb-3">
            자동차 미환급 채권(지역개발채권·도시철도채권) 환급금 완벽 가이드
          </h2>
          <p className="mb-2">
            자동차를 신규 등록할 때 우리는 지자체에 <strong>지역개발채권</strong> 또는 <strong>도시철도채권</strong>을 의무적으로 매입했습니다. 이 채권은 만기(보통 5년~7년)가 지나면 원금과 이자를 돌려받을 수 있지만, 많은 차주가 이 사실을 잊고 찾아가지 않아 <strong>국고로 소멸</strong>되고 있습니다.
          </p>
          <p className="mb-2">
            특히 <strong>2018년 이전에 차량을 구매하신 분들은 청구 시효(만기 후 5년)가 이미 지났을 가능성</strong>이 높습니다. 하지만 일부 지자체에서는 소멸 직전이라도 확인 후 절차에 따라 환급이 가능한 경우도 있으니, 해당 지자체 금고 은행(서울은 신한은행, 부산은 BNK부산은행 등)에 반드시 문의해 보세요.
          </p>
          <p className="mb-2">
            2019년~2021년에 차량을 구매하신 분들은 지금이 바로 환급받을 수 있는 <strong>골든타임</strong>입니다. 각 지자체 금고 은행의 모바일 앱이나 인터넷 뱅킹에서 "미환급 채권 조회" 메뉴를 통해 본인 명의의 채권을 쉽게 확인할 수 있습니다.
          </p>
          <p>
            본 계산기는 차량 등록 지역, 배기량(소형·중형·대형·SUV), 구매 시기, 차량 가격을 입력하면 지역별 매입 요율과 복리 이자를 적용해 <strong>예상 환급금</strong>을 산정해 드립니다. 정확한 금액은 해당 지자체 및 금고 은행에서 최종 확인하시기 바랍니다.
          </p>
        </article>
      </div>
    </main>
  );
}

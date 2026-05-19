"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";

type AnswerKey = "age" | "residence" | "income" | "asset" | "subscription";

type Answers = Record<AnswerKey, boolean | null>;

interface StepInfo {
  key: AnswerKey;
  title: string;
  question: string;
  guide: string;
}

const STEPS: StepInfo[] = [
  {
    key: "age",
    title: "Step 1. 연령 조건",
    question: "만 19세 ~ 34세 이하입니까?",
    guide: "2026년 기준 1992년생부터 2007년생까지 해당합니다.",
  },
  {
    key: "residence",
    title: "Step 2. 거주 조건",
    question: "부모님과 별도 거주하는 무주택자입니까?",
    guide:
      "주민등록상 부모님과 별도 세대를 구성하고 있어야 하며, 전국 무주택자여야 합니다.",
  },
  {
    key: "income",
    title: "Step 3. 소득 조건",
    question: "월 소득이 기준 중위소득 60% 이하입니까?",
    guide:
      "1인 가구 기준 월 약 195만 원 이하(세전 기준, 2026년 추정 기준중위소득 반영).",
  },
  {
    key: "asset",
    title: "Step 4. 자산 조건",
    question: "원가구 및 청년 가구의 자산 기준을 충족합니까?",
    guide:
      "청년 본인 자산 1.35억 원 이하, 자동차 3,558만 원 이하 (2026년 기준).",
  },
  {
    key: "subscription",
    title: "Step 5. 청약 통장",
    question: "청년 주택드림 청약 통장 가입 또는 전환 대상입니까?",
    guide: "기존 청약저축/청약부금 보유 시 전환 가능 여부를 확인합니다.",
  },
];

export default function HomePage() {
  const [step, setStep] = useState<number>(0); // 0: intro, 1~5: questions, 6: result
  const [answers, setAnswers] = useState<Answers>({
    age: null,
    residence: null,
    income: null,
    asset: null,
    subscription: null,
  });

  const handleAnswer = (value: boolean) => {
    const currentKey = STEPS[step - 1].key;
    setAnswers((prev) => ({ ...prev, [currentKey]: value }));
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setAnswers({
      age: null,
      residence: null,
      income: null,
      asset: null,
      subscription: null,
    });
    setStep(0);
  };

  const progress = useMemo(() => {
    if (step === 0) return 0;
    if (step === 6) return 100;
    return ((step - 1) / STEPS.length) * 100;
  }, [step]);

  const result = useMemo(() => {
    const { age, residence, income, asset, subscription } = answers;
    const core =
      age === true &&
      residence === true &&
      income === true &&
      asset === true;
    const three =
      age === true && residence === true && income === true;
    const two = age === true && residence === true;

    let rentSupportScore = 0;
    let rentSupportLabel = "";

    if (core) {
      rentSupportScore = 95;
      rentSupportLabel = "청년월세 특별지원 대상자";
    } else if (three) {
      rentSupportScore = 60;
      rentSupportLabel = "추가 확인 필요 (자산 기준)";
    } else if (two) {
      rentSupportScore = 30;
      rentSupportLabel = "일부 조건만 충족";
    } else {
      rentSupportScore = 5;
      rentSupportLabel = "비대상자에 가까움";
    }

    return {
      rentSupportScore,
      rentSupportLabel,
      dreamEligible: core,
      subscriptionReady: subscription === true,
    };
  }, [answers]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 청년 주거지원 대상자 판별기",
            url: "https://lifefit.kr/tools/fit-youth",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            description: "2026년 청년월세 특별지원 및 주거지원 혜택 대상 여부를 중위소득 및 재산 기준으로 빠르게 판별해 드립니다.",
          }),
        }}
      />
      <div className="w-full max-w-md">
        {/* 메인으로 가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
        >
          ← 메인으로 돌아가기
        </Link>
        {/* 진행률 표시 */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 메인 카드 */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
          {step === 0 && <IntroScreen key="intro" onStart={() => setStep(1)} />}

          {step >= 1 && step <= 5 && (
            <QuestionScreen
              key={step}
              stepIndex={step}
              stepData={STEPS[step - 1]}
              onAnswer={handleAnswer}
              onPrev={handlePrev}
              canGoBack={step > 1}
            />
          )}

          {step === 6 && (
            <ResultScreen
              key="result"
              rentSupportScore={result.rentSupportScore}
              rentSupportLabel={result.rentSupportLabel}
              dreamEligible={result.dreamEligible}
              subscriptionReady={result.subscriptionReady}
              answers={answers}
              onReset={handleReset}
            />
          )}
        </div>

        {/* 푸터 면책 조항 */}
        <p className="mt-6 text-center text-xs leading-relaxed text-gray-400">
          본 서비스는 참고용이며, 정확한 대상 여부는 관할 주민센터 또는
          LH·SH에서 확인하세요.
        </p>
      </div>
    </main>
  );
}

/* ===================== 서브 컴포넌트 ===================== */

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
        🏠
      </div>
      <h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
        2026 청년 주거지원
        <br />
        한눈에 확인하기
      </h1>
      <p className="mb-8 text-base leading-relaxed text-gray-500">
        청년월세 특별지원과 청년 주택드림 청약 통장
        <br />
        내가 대상인지 1분 만에 알아보세요.
      </p>
      <button
        onClick={onStart}
        className="w-full rounded-xl bg-blue-600 py-4 text-base font-semibold text-white shadow-sm transition-transform hover:bg-blue-700 active:scale-[0.98]"
      >
        시작하기
      </button>
    </div>
  );
}

function QuestionScreen({
  stepIndex,
  stepData,
  onAnswer,
  onPrev,
  canGoBack,
}: {
  stepIndex: number;
  stepData: StepInfo;
  onAnswer: (v: boolean) => void;
  onPrev: () => void;
  canGoBack: boolean;
}) {
  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {stepData.title}
        </span>
        <h2 className="mt-3 text-xl font-bold leading-snug text-gray-900">
          {stepData.question}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-gray-500">
          {stepData.guide}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAnswer(true)}
          className="flex w-full items-center justify-center rounded-xl border-2 border-blue-100 bg-blue-50 py-4 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-100 active:scale-[0.98]"
        >
          예 (Yes)
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-gray-50 py-4 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-100 active:scale-[0.98]"
        >
          아니오 (No)
        </button>
      </div>

      {canGoBack && (
        <button
          onClick={onPrev}
          className="mt-4 w-full py-3 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
        >
          ← 이전 질문으로 돌아가기
        </button>
      )}
    </div>
  );
}

function ResultScreen({
  rentSupportScore,
  rentSupportLabel,
  dreamEligible,
  subscriptionReady,
  answers,
  onReset,
}: {
  rentSupportScore: number;
  rentSupportLabel: string;
  dreamEligible: boolean;
  subscriptionReady: boolean;
  answers: Answers;
  onReset: () => void;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const resultText = `[LifeFit] 2026 청년 주거지원 판별 결과 🏠\n✅ 청년월세 특별지원: ${results.rentSupportLabel}\n✅ 청년 주택드림 청약: ${results.dreamEligible ? "통장 가입 가능" : "조건 일부 미충족"}`;
    const shareUrl = "https://lifefit.kr/tools/fit-youth";
    const fullText = `${resultText}\n\n👉 나도 1분 만에 대상자인지 확인하기:\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "LifeFit 청년 주거지원 판별기",
          text: resultText,
          url: shareUrl,
        });
      } catch (err) {
        // 사용자 취소 시 에러 무시
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        alert("복사에 실패했습니다.");
      }
    }
  };

  return (
    <div className="animate-fade-in">


      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
          {rentSupportScore >= 95 ? "🎉" : rentSupportScore >= 60 ? "🔍" : "📋"}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">판별 결과</h2>
        <p className="mt-1 text-base text-gray-500">
          입력하신 조건을 바탕으로 분석한 결과예요
        </p>
      </div>

      {/* 결과 카드 1: 청년월세 특별지원 */}
      <div className="mb-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            청년월세 특별지원
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${
              rentSupportScore >= 95
                ? "bg-green-100 text-green-700"
                : rentSupportScore >= 60
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {rentSupportScore}%
          </span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {rentSupportScore >= 95
            ? "당신은 청년월세 특별지원 대상자입니다"
            : rentSupportScore >= 60
              ? "청년월세 특별지원 대상자일 확률이 높습니다"
              : "청년월세 특별지원 대상자일 확률이 낮습니다"}
        </div>
        <p className="mt-1 text-sm text-gray-500">{rentSupportLabel}</p>
      </div>

      {/* 결과 카드 2: 청년 주택드림 청약 */}
      <div className="mb-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            청년 주택드림 청약
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${
              dreamEligible
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {dreamEligible ? "가입 대상" : "제한 있음"}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {dreamEligible
            ? "청년 주택드림 통장 가입 대상입니다"
            : "청년 주택드림 통장 가입 조건을 일부 미충족합니다"}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {subscriptionReady
            ? "기존 통장 전환 또는 신규 가입이 가능합니다."
            : "통장 보유/전환 여부는 별도 확인이 필요합니다."}
        </p>
      </div>

      {/* 요약 테이블 */}
      <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <h3 className="mb-3 text-sm font-bold text-gray-700">내 답변 요약</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-500">연령 (19~34세)</span>
            <span
              className={
                answers.age
                  ? "font-semibold text-blue-600"
                  : "font-semibold text-gray-400"
              }
            >
              {answers.age === true
                ? "충족"
                : answers.age === false
                  ? "미충족"
                  : "-"}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">별도 거주 무주택</span>
            <span
              className={
                answers.residence
                  ? "font-semibold text-blue-600"
                  : "font-semibold text-gray-400"
              }
            >
              {answers.residence === true
                ? "충족"
                : answers.residence === false
                  ? "미충족"
                  : "-"}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">소득 기준 중위 60% 이하</span>
            <span
              className={
                answers.income
                  ? "font-semibold text-blue-600"
                  : "font-semibold text-gray-400"
              }
            >
              {answers.income === true
                ? "충족"
                : answers.income === false
                  ? "미충족"
                  : "-"}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">자산 기준 충족</span>
            <span
              className={
                answers.asset
                  ? "font-semibold text-blue-600"
                  : "font-semibold text-gray-400"
              }
            >
              {answers.asset === true
                ? "충족"
                : answers.asset === false
                  ? "미충족"
                  : "-"}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">청약통장 대상</span>
            <span
              className={
                answers.subscription
                  ? "font-semibold text-blue-600"
                  : "font-semibold text-gray-400"
              }
            >
              {answers.subscription === true
                ? "해당"
                : answers.subscription === false
                  ? "비해당"
                  : "-"}
            </span>
          </li>
        </ul>
      </div>



      {/* 제휴 마케팅 CTA 버튼 — 내부 랜딩 페이지로 연결 */}
      <Link
        href="/tools/fit-youth/banks"
        className="mb-3 flex w-full items-center justify-center rounded-xl bg-gray-900 py-4 text-base font-semibold text-white shadow-sm transition-transform hover:bg-gray-800 active:scale-[0.98]"
      >
        청년 우대형 통장 개설 가능한 은행 알아보기 →
      </Link>

      <div className="flex w-full gap-2 mb-2">
        <button
          onClick={onReset}
          className="flex-1 rounded-xl border-2 border-gray-200 bg-white py-4 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 active:scale-[0.98]"
        >
          다시 확인하기
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-blue-600 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:scale-[0.98]"
        >
          <Share2 size={18} />
          {isCopied ? "링크 복사 완료!" : "결과 공유하기"}
        </button>
      </div>

      {/* 하단 SEO 텍스트 (시맨틱 태그 및 가독성 최적화) */}
      <article className="mt-8 p-5 bg-white rounded-2xl border border-gray-200 text-sm text-gray-600 leading-relaxed text-left">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          2026년 청년월세 특별지원 및 주거지원 소득/자산 요건 안내
        </h2>
        <p className="mb-2">
          본 애플리케이션은 국토교통부의 <strong>2026년 청년월세 특별지원 기준</strong>을 토대로 제작된 모의계산 및 판별 도구입니다.
        </p>
        <p className="mb-2">
          청년월세 특별지원은 만 19세~34세 독립 거주 무주택 청년 중, 청년가구 중위소득 60% 이하이면서 원가구 중위소득 100% 이하인 대상에게 <strong>최대 12개월간 매월 20만 원의 월세</strong>를 지원하는 제도입니다. (2026년 기준)
        </p>
        <p>
          지원 대상에 선정되기 위해서는 소득 요건 외에도 총재산 가액 1억 2천2백만 원 이하(청년 독립가구 기준) 등 세부 자산 기준을 충족해야 합니다. 모의계산 결과는 참고용이며, 최종 대상 여부는 복지로(bokjiro.go.kr) 또는 마이홈 포털에서 확정 확인이 필요합니다.
        </p>
      </article>
    </div>
  );
}

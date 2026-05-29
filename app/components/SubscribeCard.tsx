"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, BellRing, Loader2 } from "lucide-react";

interface SubscribeCardProps {
  defaultCategory?: "housing" | "tax" | "welfare" | "saving" | "car";
  referrer?: string;
}

const CATEGORY_MAP = [
  { id: "housing", label: "🏠 주거/청약 혜택" },
  { id: "tax", label: "💵 세금/N잡러 절세" },
  { id: "welfare", label: "👶 복지/수당 정책" },
  { id: "saving", label: "📈 목돈/파킹통장" },
  { id: "car", label: "🚗 차량/미환급금" },
];

export default function SubscribeCard({
  defaultCategory,
  referrer = "",
}: SubscribeCardProps) {
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // defaultCategory가 들어오면 기본값으로 선택 처리
  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategories([defaultCategory]);
    } else {
      setSelectedCategories(["housing", "tax", "welfare", "saving", "car"]);
    }
  }, [defaultCategory]);

  const handleCategoryToggle = (id: string) => {
    if (selectedCategories.includes(id)) {
      // 최소 1개는 선택되도록 제한
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== id));
      }
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. 프론트엔드 유효성 검증 (Regex 활용)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("올바른 이메일 주소(예: user@example.com)를 입력해 주세요.");
      return;
    }

    if (selectedCategories.length === 0) {
      setErrorMessage("최소 1개 이상의 관심 카테고리를 선택해 주세요.");
      return;
    }

    if (!agreePrivacy) {
      setErrorMessage("개인정보 수집 및 이용 약관에 동의해 주세요.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          categories: selectedCategories,
          referrer: referrer || window.location.pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "알림 신청 처리 중 오류가 발생했습니다.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "서버 통신 실패. 잠시 후 다시 시도해 주세요.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-[#00c471]/30 bg-gradient-to-br from-[#e8f9f0] to-[#f0fdf4] p-8 text-center shadow-md animate-fade-in my-8">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00c471]/10 blur-xl" />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00c471] text-white shadow-lg shadow-[#00c471]/20 mb-4 animate-bounce">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-[#191f28] tracking-tight">
          알림 신청이 완료되었습니다! 🎉
        </h3>
        <p className="mt-2 text-sm text-[#4e5968] leading-relaxed max-w-md mx-auto">
          적어주신 이메일(<span className="font-semibold text-blue-600 font-mono">{email}</span>)로 
          정부 정책 변동 사항, 신설 혜택, 세금 일정 변경 시 <strong>가장 신속하게</strong> 핵심 요약 소식을 보내드리겠습니다.
        </p>
        <div className="mt-5 text-[11px] text-[#8b95a1]">
          언제든지 수신 이메일 내에서 원클릭으로 구독을 해제하실 수 있습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#00c471]/20 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-[#00c471]/40 my-8">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-50/50 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#e8f9f0]/40 blur-2xl" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00c471] to-emerald-400 text-white shadow-md shadow-[#00c471]/10">
          <BellRing size={22} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#191f28]">
            정책 변동 및 신청 기간 실시간 알림 서비스
          </h3>
          <p className="text-xs text-[#8b95a1] mt-0.5">
            자꾸 바뀌는 세법 및 지원금 기준, 매번 찾아볼 필요 없이 개정 즉시 가장 먼저 받아보세요.
          </p>
        </div>
      </div>

      {/* Category selection */}
      <div className="relative mb-6">
        <label className="block text-xs font-bold text-[#4e5968] mb-3">
          알림 받고 싶은 관심 분야 선택 (중복 가능)
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_MAP.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryToggle(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isChecked
                    ? "bg-[#e8f9f0] border-[#00c471] text-[#00c471] shadow-sm shadow-[#00c471]/5"
                    : "bg-gray-50 border-gray-200 text-[#4e5968] hover:bg-gray-100/70"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubscribe} className="relative space-y-4">
        {/* Privacy Consent Checkbox (Mandatory for AdSense and Personal Info Protection Act) */}
        <div className="flex items-start gap-2 px-1">
          <input
            type="checkbox"
            id="agree-privacy"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-gray-300 text-[#00c471] focus:ring-[#00c471] cursor-pointer"
            required
          />
          <label htmlFor="agree-privacy" className="text-xs text-[#4e5968] leading-normal font-semibold cursor-pointer">
            [필수] {" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-[#00c471] underline font-bold hover:text-[#00b064]"
            >
              개인정보 수집 및 이용
            </Link>{" "}
            에 동의합니다. (이메일 및 관심 카테고리 수집)
          </label>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="relative flex-1">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="알림을 받을 이메일 주소를 입력해 주세요"
              className="w-full h-12 pl-11 pr-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00c471] focus:bg-white transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="h-12 px-6 rounded-2xl bg-[#00c471] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#00c471]/10 hover:bg-[#00b064] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 whitespace-nowrap"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                신청하는 중...
              </>
            ) : (
              "실시간 알림 신청하기"
            )}
          </button>
        </div>

        {/* Error Feedback */}
        {(status === "error" || errorMessage) && (
          <p className="text-xs font-bold text-red-500 mt-2 animate-shake">
            ⚠️ {errorMessage || "신청 처리 중 문제가 발생했습니다. 다시 시도해 주세요."}
          </p>
        )}
      </form>
      
      <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
        ※ 광고성 스팸을 보내지 않으며, 오직 사용자가 선택하신 복지·세무 관련 혜택 변동 소식만 전달합니다.
      </p>
    </div>
  );
}

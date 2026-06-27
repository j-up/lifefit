"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, GraduationCap, Briefcase, Baby, Home, ArrowRight } from "lucide-react";

type Stage = "youth" | "worker" | "parent" | "housing";

interface ToolItem {
  name: string;
  href: string;
  desc: string;
  tag: string;
  icon: string;
  badge?: string;
  theme: "blue" | "teal" | "purple" | "indigo" | "rose" | "emerald" | "amber";
}

const TOOLS_BY_STAGE: Record<Stage, ToolItem[]> = {
  youth: [
    {
      name: "청년미래적금 계산기",
      href: "/tools/future-savings",
      desc: "2026년 신설 청년미래적금 가입조건 판별 및 최대 만기 수령액 모의 계산",
      tag: "우대금리 진단",
      icon: "✨",
      badge: "인기 🔥",
      theme: "blue",
    },
    {
      name: "도약계좌 vs 미래적금 비교기",
      href: "/tools/savings-comparison",
      desc: "5년 만기 청년도약계좌와 3년 만기 청년미래적금의 실제 세후 수령액 비교",
      tag: "수익 극대화",
      icon: "📊",
      badge: "신규 ✨",
      theme: "indigo",
    },
    {
      name: "청년월세 특별지원 진단기",
      href: "/tools/fit-youth",
      desc: "월세 최대 20만 원 정부 특별지원금 대상 조건 1분 만에 자격 판별",
      tag: "주거 복지",
      icon: "🏠",
      theme: "purple",
    },
  ],
  worker: [
    {
      name: "적금 선납이연 플랜 계산기",
      href: "/tools/savings-plan",
      desc: "6-1-5, 1-11 법칙을 활용하여 파킹통장 연계로 세후 이자 2배 불리기",
      tag: "재테크 꿀팁",
      icon: "💰",
      badge: "추천 ⭐",
      theme: "indigo",
    },
    {
      name: "N잡러 세금·건보료 계산기",
      href: "/tools/njob-tax",
      desc: "종합소득세 신고 후 건강보험료 폭탄 및 직장인 피부양자 자격 유지 비법",
      tag: "세금 절세",
      icon: "💸",
      theme: "teal",
    },
    {
      name: "K-패스 vs 기후동행카드 비교기",
      href: "/tools/kpass-climate",
      desc: "내 대중교통 이용 패턴과 월 이동 횟수를 비교하여 최적의 교통카드 선택",
      tag: "고정비 절약",
      icon: "🚌",
      theme: "blue",
    },
  ],
  parent: [
    {
      name: "우리 아이 지원금 종합 계산기",
      href: "/tools/child-benefits",
      desc: "자녀 생일 입력 시 부모급여, 아동수당, 첫만남이용권 등 모든 지원금 일정 캘린더 생성",
      tag: "육아 복지",
      icon: "📅",
      badge: "신규 ✨",
      theme: "rose",
    },
    {
      name: "육아기 단축근무 급여 계산기",
      href: "/tools/short-work",
      desc: "단축근무 진행 시 고용보험 지원금과 회사 지급액을 합산한 실제 월 실수령액 모의계산",
      tag: "급여 계산",
      icon: "👶",
      badge: "실시간 급상승 📈",
      theme: "blue",
    },
    {
      name: "보육비 비과세 한도 계산기",
      href: "/tools/child-tax-benefit",
      desc: "회사에서 받는 보육수당(월 20만원 한도)의 세금 비과세 감면 혜택 계산",
      tag: "연말정산 꿀팁",
      icon: "🍼",
      theme: "emerald",
    },
  ],
  housing: [
    {
      name: "청년 버팀목 전세자금대출 한도 계산기",
      href: "/tools/beotimmok-loan",
      desc: "2026년 완화된 소득 기준과 보증금 조건에 따른 한도 및 최저 우대 금리 진단",
      tag: "버팀목 대출",
      icon: "💸",
      theme: "blue",
    },
    {
      name: "LH 청년 전세임대 조건 진단기",
      href: "/tools/lh-rent",
      desc: "임대 보증금 지원 조건 및 본인 부담금 비율, 신청 자격 순위 자가 진단",
      tag: "전세 임대",
      icon: "🏡",
      theme: "indigo",
    },
    {
      name: "자동차 채권 환급금 모의조회",
      href: "/tools/car-bond",
      desc: "새 차 살 때 강제 매입한 도시철도/지역개발채권의 숨은 미환급금 조회 방법",
      tag: "숨은 돈 찾기",
      icon: "🚗",
      theme: "emerald",
    },
  ],
};

const STAGE_CONFIG = [
  { key: "youth" as Stage, label: "대학생/청년", icon: GraduationCap, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { key: "worker" as Stage, label: "직장인/N잡러", icon: Briefcase, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
  { key: "parent" as Stage, label: "예비 부모/육아", icon: Baby, color: "text-rose-600 bg-rose-50 border-rose-100" },
  { key: "housing" as Stage, label: "주거/대출/차량", icon: Home, color: "text-purple-600 bg-purple-50 border-purple-100" },
];

export default function MiniFinder() {
  const [activeStage, setActiveStage] = useState<Stage>("youth");

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "blue":
        return {
          bg: "hover:bg-blue-50/40 hover:border-blue-200",
          iconBg: "bg-blue-100 text-blue-600",
          tagBg: "bg-blue-50 text-blue-700",
          arrowColor: "text-blue-500",
        };
      case "teal":
        return {
          bg: "hover:bg-teal-50/40 hover:border-teal-200",
          iconBg: "bg-teal-100 text-teal-600",
          tagBg: "bg-teal-50 text-teal-700",
          arrowColor: "text-teal-500",
        };
      case "purple":
        return {
          bg: "hover:bg-purple-50/40 hover:border-purple-200",
          iconBg: "bg-purple-100 text-purple-600",
          tagBg: "bg-purple-50 text-purple-700",
          arrowColor: "text-purple-500",
        };
      case "rose":
        return {
          bg: "hover:bg-rose-50/40 hover:border-rose-200",
          iconBg: "bg-rose-100 text-rose-600",
          tagBg: "bg-rose-50 text-rose-700",
          arrowColor: "text-rose-500",
        };
      case "emerald":
        return {
          bg: "hover:bg-emerald-50/40 hover:border-emerald-200",
          iconBg: "bg-emerald-100 text-emerald-600",
          tagBg: "bg-emerald-50 text-emerald-700",
          arrowColor: "text-emerald-500",
        };
      case "indigo":
      default:
        return {
          bg: "hover:bg-indigo-50/40 hover:border-indigo-200",
          iconBg: "bg-indigo-100 text-indigo-600",
          tagBg: "bg-indigo-50 text-indigo-700",
          arrowColor: "text-indigo-500",
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white text-base shadow-sm">
            🎯
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
              나에게 맞는 계산기 3초 만에 찾기
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              현재 내 상황에 딱 부합하는 정부 수당 및 금융 혜택 계산기를 골라보세요.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full self-start md:self-auto">
          <Sparkles size={12} />
          <span>맞춤형 진단 기능</span>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 mb-6">
        {STAGE_CONFIG.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.key;
          return (
            <button
              key={stage.key}
              onClick={() => setActiveStage(stage.key)}
              className={`flex items-center justify-center md:justify-start gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                isActive
                  ? stage.color + " shadow-sm scale-[1.02]"
                  : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              <span>{stage.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended tools list */}
      <div className="grid gap-4 md:grid-cols-3">
        {TOOLS_BY_STAGE[activeStage].map((tool, idx) => {
          const theme = getThemeClasses(tool.theme);
          return (
            <Link
              key={idx}
              href={tool.href}
              className={`group flex flex-col justify-between p-5 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${theme.bg}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${theme.tagBg}`}>
                    {tool.tag}
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                  <span className="text-lg">{tool.icon}</span>
                  {tool.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed min-h-[40px]">
                  {tool.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 group-hover:text-gray-500 font-medium">시뮬레이션 시작</span>
                <ArrowRight size={14} className={`transform group-hover:translate-x-1 transition-transform ${theme.arrowColor}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

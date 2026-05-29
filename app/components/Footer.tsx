"use client";

import Link from "next/link";
import { ShieldAlert, FileText, Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-left">
          {/* Column 1: 계산 도구 모음 */}
          <div>
            <h3 className="mb-4 font-extrabold text-gray-900 tracking-tight">계산기 도구</h3>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li>
                <Link href="/tools/savings-plan" className="hover:text-blue-600 transition-colors">
                  적금 선납이연 플랜 계산기
                </Link>
              </li>
              <li>
                <Link href="/tools/future-savings" className="hover:text-blue-600 transition-colors">
                  청년미래적금 자격&amp;수령액
                </Link>
              </li>
              <li>
                <Link href="/tools/tax-calculator" className="hover:text-blue-600 transition-colors">
                  2026 이자 세금 비교 계산기
                </Link>
              </li>
              <li>
                <Link href="/tools/short-work" className="hover:text-blue-600 transition-colors">
                  육아기 단축근무 급여 계산기
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: 기타 계산 도구 */}
          <div>
            <h3 className="mb-4 font-extrabold text-gray-900 tracking-tight">생활 & 세금</h3>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li>
                <Link href="/tools/child-tax-benefit" className="hover:text-blue-600 transition-colors">
                  보육수당 자녀별 비과세 계산
                </Link>
              </li>
              <li>
                <Link href="/tools/fit-youth" className="hover:text-blue-600 transition-colors">
                  청년 주거지원 대상자 판별기
                </Link>
              </li>
              <li>
                <Link href="/tools/njob-tax" className="hover:text-blue-600 transition-colors">
                  N잡러 건보료 폭탄 계산기
                </Link>
              </li>
              <li>
                <Link href="/tools/car-bond" className="hover:text-blue-600 transition-colors">
                  자동차 미환급 채권 계산기
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 소개 */}
          <div>
            <h3 className="mb-4 font-extrabold text-gray-900 tracking-tight">LifeFit</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              내 삶에 딱 맞는 정부 지원금과 복지 혜택, 재테크 이자 계산을 1분 만에 쉽고 빠르게 찾아주는 신뢰도 높은 계산기 종합 서비스입니다.
            </p>
          </div>

          {/* Column 4: 법적 및 고객 정책 */}
          <div>
            <h3 className="mb-4 font-extrabold text-gray-900 tracking-tight">법적 고지 & 문의</h3>
            <ul className="space-y-2.5 text-gray-500 font-medium">
              <li>
                <Link
                  href="/privacy"
                  className="flex items-center gap-1.5 font-bold text-gray-700 hover:text-blue-600 transition-colors underline decoration-blue-200"
                >
                  <ShieldAlert size={14} className="text-blue-600 shrink-0" />
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="flex items-center gap-1.5 font-bold text-gray-700 hover:text-blue-600 transition-colors underline decoration-indigo-200"
                >
                  <FileText size={14} className="text-indigo-600 shrink-0" />
                  이용약관 및 면책조항
                </Link>
              </li>
              <li className="text-xs text-gray-400 leading-normal pt-1.5">
                제휴 및 피드백 문의:
                <br />
                <a href="mailto:support@lifefit.kr" className="text-blue-500 font-bold hover:underline font-mono">
                  support@lifefit.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Warning inside Footer (CRITICAL for financial/benefit tools) */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-400">
            <Scale size={13} className="text-gray-300 shrink-0 mt-0.5" />
            <span>
              <strong>면책 고지:</strong> 본 서비스의 모의 계산 결과는 정부 관계기관 고시 자료를 참고해 시뮬레이션한 수치로 실제 청구액 및 혜택 수령액과 차이가 날 수 있습니다. LifeFit은 계산 내용의 정확도나 활용으로 인해 발생한 결과에 대해 법적 보증이나 보상을 책임지지 않습니다. 정확한 계산은 주관 공공기관 및 관할 금고 은행 등에서 확인하시기 바랍니다.
            </span>
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-50 pt-6 text-center text-xs text-gray-400 font-medium">
          <p>© 2026 LifeFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

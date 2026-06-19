import Link from "next/link";
import { FileText, Landmark, AlertTriangle, Copyright } from "lucide-react";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "이용약관 및 면책조항 | LifeFit",
  description: "LifeFit 서비스의 이용 약관 및 시뮬레이션 계산기에 대한 중요 면책 고지 사항을 꼭 숙지하고 서비스를 이용해 주세요.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">


      {/* Main Container */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-12 shadow-sm">
          {/* Title Area */}
          <div className="border-b border-gray-100 pb-8 text-center sm:text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <FileText size={28} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              이용약관 및 면책조항
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              최종 수정일: 2026년 5월 29일
            </p>
          </div>

          {/* Intro */}
          <div className="mt-8 text-sm leading-relaxed text-gray-600 space-y-4">
            <p>
              LifeFit(이하 "서비스")은 복잡한 정부의 지원 정책, 세금 및 금융 혜택을 대중이 쉽게 인지하고 이해할 수 있도록 돕는 <strong>공익 목적의 시뮬레이션 도구</strong>입니다. 사용자가 서비스를 이용함에 있어 숙지해야 할 중요한 서비스 약관 및 법적 한계를 아래와 같이 밝힙니다.
            </p>
          </div>

          {/* Disclaimer (Section 1) - CRITICAL FOR FINANCE SITES */}
          <section className="mt-10 bg-amber-50/50 rounded-2xl border border-amber-100 p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-amber-900 border-l-4 border-amber-500 pl-3">
              <AlertTriangle size={18} className="text-amber-600" />
              1. 중요: 서비스 이용에 관한 법적 면책고지 (Disclaimer)
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-amber-950 space-y-4 font-medium">
              <p className="leading-relaxed">
                LifeFit이 제공하는 모든 계산 도구(적금 선납이연 플랜, 미래적금 자격, 이자 세금 비교, 육아 단축근무 급여, 보육 비과세, 청년 주거지원 판별, N잡러 건보료, 자동차 미환급 채권 등)의 모의 결과는 **행정안전부, 국세청, 고용노동부, 국토교통부 등 정부 유관 부서의 고시 정보 및 시점 기준**을 참고하여 제작된 단순 참고용 시뮬레이션 결과입니다.
              </p>
              <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs space-y-2 text-amber-900 font-semibold leading-relaxed shadow-sm">
                <p>
                  가. **법적 보장 부재**: 본 모의 계산 결과는 실제 개개인의 상황(상세 소득, 소득세율 구간, 직장 형태, 실제 매입 채권 요율 등)과 법률 개정 시점에 따라 실제 지급받거나 청구받을 금액과 다를 수 있습니다. 따라서 어떠한 경우에도 공식적인 법적·세무적·재정적 효력이나 보장을 대용할 수 없습니다.
                </p>
                <p>
                  나. **직접 조회 권장**: 실제 혜택 청구나 세금 신고, 채권 환급 등은 반드시 주관 정부24, 관할 주민센터, 소속 지자체, 담당 금융기관(금고 은행 등)을 통해 최종 조회를 행하고 신청 절차를 진행하셔야 합니다.
                </p>
                <p>
                  다. **책임 한계**: 본 서비스는 사용자가 모의 계산의 결과를 바탕으로 의사결정을 내려 취한 행동, 발생한 손실, 과태료, 신청 기한 소멸, 또는 부주의로 인한 일체 피해에 대하여 **민형사상 어떠한 법적 책임도 부담하지 않습니다.**
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">
              <Landmark size={18} className="text-indigo-600" />
              2. 서비스의 목적 및 내용 변경
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-3">
              <p>
                서비스는 정부 정책의 변동 사항이 발생하거나 관계 법령이 변경되는 경우, 계산 수식이나 도구의 내용을 사전 고지 없이 업데이트하거나 보완할 수 있습니다.
              </p>
              <p>
                이 과정에서 발생할 수 있는 데이터의 일시적 오류나 계산식 지연에 관해서는 신속한 복구를 위해 최선을 다하나, 상시 무결성을 보장하지는 않습니다.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">
              <Copyright size={18} className="text-indigo-600" />
              3. 지식재산권 (저작권)
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-3">
              <p>
                LifeFit 서비스가 제공하는 독자적인 계산 알고리즘, 복잡한 공식의 디지털 논리 코드 구현물, 디자인 레이아웃, 오리지널 가이드 콘텐츠 등에 대한 저작권 및 지식재산권은 **LifeFit**에 전적으로 귀속됩니다.
              </p>
              <p>
                사용자는 본 서비스의 결과를 단순 개인 목적으로만 복사·출력하여 사용할 수 있으며, 당사의 명시적 서면 서면 동의 없이 본 웹사이트의 코드 및 계산 로직을 무단 파싱, 복제, 배포, 상업적으로 모방하여 사용하는 행위를 금합니다.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">
              <FileText size={18} className="text-indigo-600" />
              4. 이용자의 의무 및 제한 사항
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-2">
              <p>
                이용자는 본 서비스를 합법적이고 건전한 목적으로만 이용해야 합니다. 당사 서버에 비정상적인 부하를 주거나, API를 무단 해킹 및 변조하기 위한 매크로, 크롤러의 무차별적 작동 등 시스템 성능 저하를 유발하는 일체 행위를 수행할 수 없습니다.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mt-10 border-t border-gray-100 pt-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              ⚖️ 준거법 및 관할 법원
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              본 약관의 해석 및 당사 서비스와 이용자 간에 발생한 분쟁에 관해서는 대한민국 법률을 준거법으로 하며, 분쟁으로 인한 소송 발생 시 민사소송법상의 관할 법원을 소송 관할 법원으로 지정합니다.
            </p>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              ※ 이용약관에 의문 사항이 있으시거나 오류를 제보하고 싶으신 분은 <a href="mailto:support@lifefit.kr" className="text-blue-600 hover:underline">support@lifefit.kr</a>로 편하게 문의 접수해 주시기 바랍니다.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

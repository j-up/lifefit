import Link from "next/link";
import { ShieldCheck, Mail, Cookie, UserCheck } from "lucide-react";

export const metadata = {
  title: "개인정보처리방침 | LifeFit",
  description: "LifeFit 서비스의 개인정보처리방침을 확인하고, 당사가 귀하의 데이터를 안전하게 보호하고 처리하는 방법을 알아보세요.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">


      {/* Main Container */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-12 shadow-sm">
          {/* Title Area */}
          <div className="border-b border-gray-100 pb-8 text-center sm:text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              개인정보처리방침
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              최종 수정일: 2026년 5월 29일
            </p>
          </div>

          {/* Intro */}
          <div className="mt-8 text-sm leading-relaxed text-gray-600 space-y-4">
            <p>
              LifeFit(이하 "서비스")은 정보주체의 개인정보를 소중히 다루며, 대한민국의 개인정보보호법 및 관계 법령을 준수합니다. 본 방침은 서비스를 이용하시는 사용자분들이 본인의 정보가 어떤 목적으로 어떻게 이용되며, 안전한 보호를 위해 어떤 조치가 취해지고 있는지 명확히 알리기 위해 수립되었습니다.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
              <UserCheck size={18} className="text-blue-600" />
              1. 수집하는 개인정보 항목 및 수집 방법
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-3">
              <p>
                서비스는 회원가입 없이 복지 및 금융 계산 도구를 무상으로 제공합니다. 다만, <strong>실시간 정책 변동 알림 서비스(구독)</strong> 신청 시 아래와 같이 최소한의 필요한 개인정보만을 수집하고 있습니다.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-left text-xs text-gray-500">
                  <thead className="bg-gray-50 text-gray-700 font-bold">
                    <tr>
                      <th className="border border-gray-200 p-3">구분</th>
                      <th className="border border-gray-200 p-3">수집 항목</th>
                      <th className="border border-gray-200 p-3">수집 목적</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50/50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-700">필수 항목</td>
                      <td className="border border-gray-200 p-3 font-mono">이메일 주소, 관심 카테고리</td>
                      <td className="border border-gray-200 p-3">복지 및 금융 정책 개정 정보 발송, 맞춤형 혜택 정보 안내</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-700">자동 수집 항목</td>
                      <td className="border border-gray-200 p-3">접속 로그, 쿠키(Cookie), 접속 IP 정보, 브라우저 유형 및 기기 정보</td>
                      <td className="border border-gray-200 p-3">비정상적 접근 차단, 사용 패턴 통계 분석을 통한 서비스 개선, 맞춤 광고 제공</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
              <Mail size={18} className="text-blue-600" />
              2. 개인정보의 보유 및 이용 기간
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-3">
              <p>
                서비스는 원칙적으로 사용자의 개인정보 수집 목적이 달성되면 해당 정보를 <strong>지체 없이 파기</strong>합니다.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>이메일 알림 신청자 정보</strong>: 알림 구독을 유지하는 기간 동안 한시적으로 보관하며, 사용자가 이메일 내부의 <strong>[구독 해제]</strong> 링크를 클릭하여 수신을 거부하거나 정보 삭제를 요청하는 경우 **즉시 즉각적으로 영구 파기** 처리됩니다.
                </li>
                <li>
                  <strong>기타 로그 데이터</strong>: 내부 보안 수립 및 접속 통계 분석을 위해 최대 6개월간 보관 후 자동 소멸됩니다.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
              <ShieldCheck size={18} className="text-blue-600" />
              3. 개인정보의 제3자 제공 및 위탁에 관한 사항
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-3">
              <p>
                서비스는 원칙적으로 사용자의 개인정보를 제3자에게 외부에 제공하거나 누설하지 않습니다. 다만, 서비스 고도화 및 안정적인 데이터 저장을 위해 아래와 같이 전문 클라우드 인프라 기업에 처리를 위탁하고 있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>위탁 대상자</strong>: Supabase, Inc. (데이터베이스 서비스 제공)
                </li>
                <li>
                  <strong>위탁 업무 내용</strong>: 알림 서비스 데이터 및 신청자 데이터의 보안 저장 및 관리
                </li>
                <li>
                  <strong>위탁 기간</strong>: 개인정보 보유 및 이용 기간과 동일 (구독 해제 시 삭제)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 - AD SENSE COOKIE DISCLOSURE (CRITICAL FOR APPROVAL) */}
          <section className="mt-10 bg-blue-50/40 rounded-2xl border border-blue-100 p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
              <Cookie size={18} className="text-blue-600" />
              4. 구글 애드센스(Google AdSense) 및 쿠키 사용 안내
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-4">
              <p>
                본 서비스는 정보 제공 및 무료 도구 운영의 지속 가능성을 위하여 구글사에서 제공하는 광고 서비스인 <strong>Google AdSense</strong>를 통한 광고 게재를 수행하고 있습니다. 이에 따라 개인화 광고 수집 및 분석을 위한 쿠키를 사용합니다.
              </p>
              <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                <p>
                  <strong>가. 쿠키(Cookie)란?</strong>
                  <br />
                  쿠키는 웹사이트를 운영하는 데 이용되는 서버가 사용자의 브라우저에 보내는 아주 작은 텍스트 파일로, 사용자의 디바이스(PC, 스마트폰 등) 하드디스크에 저장됩니다.
                </p>
                <p>
                  <strong>나. 구글 광고 및 DoubleClick 쿠키 정책</strong>
                  <br />
                  구글을 포함한 제3자 제공업체는 사용자가 당사 웹사이트 또는 기타 웹사이트를 이전에 방문한 기록을 바탕으로 맞춤형 광고를 게재하기 위해 쿠키를 사용합니다. 구글 및 파트너사는 광고 쿠키를 사용하여 본 사이트 및 인터넷 상의 다른 사이트 방문을 토대로 사용자에게 가장 유용한 광고를 맞춤 표시합니다.
                </p>
                <p>
                  <strong>다. 쿠키 설정 및 거부(개인화 광고 차단) 방법</strong>
                  <br />
                  사용자는 구글의 맞춤형 광고 게재를 비활성화하거나 차단할 권리를 가지고 있습니다.
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <strong>구글 계정 광고 설정</strong>: 사용자는 구글{" "}
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 underline"
                      >
                        광고 설정 페이지
                      </a>
                      를 방문하여 개인 맞춤형 광고를 끌 수 있습니다.
                    </li>
                    <li>
                      <strong>제3자 광고업체 쿠키 차단</strong>:{" "}
                      <a
                        href="https://www.aboutads.info"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 underline"
                      >
                        AboutAds.info
                      </a>
                      를 방문하여 맞춤 광고 게재용 제3자 제공업체의 쿠키 사용을 해제할 수 있습니다.
                    </li>
                    <li>
                      <strong>웹 브라우저 제어</strong>: 사용하는 브라우저 설정(Chrome의 경우 설정 &gt; 개인정보 및 보안 &gt; 인터넷 사용 기록 삭제 또는 쿠키 차단)을 통해 모든 쿠키 저장을 직접 제어 및 차단할 수 있습니다.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
              <ShieldCheck size={18} className="text-blue-600" />
              5. 정보주체의 권리 및 의무와 행사 방법
            </h2>
            <div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-2">
              <p>
                사용자는 언제든지 당사 서비스에 수집된 본인의 개인정보 열람을 요청하거나, 정정 및 삭제 처리를 요구할 수 있습니다.
              </p>
              <p>
                알림 구독 서비스의 경우, 뉴스레터 하단의 <strong>[수신거부/구독해제]</strong> 링크를 통하여 정보 수정을 직접 1초 만에 수행하실 수 있으며, 아래 기재된 공식 이메일 창구로 연락해 주시면 접수 후 지체 없이 처리해 드립니다.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mt-10 border-t border-gray-100 pt-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              👤 개인정보 관리 책임 부서 및 담당자
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              귀하의 개인정보를 안전하게 보호하고 관련 불만 사항이나 문의를 처리하기 위하여 아래와 같이 전담 창구를 지정하고 있습니다.
            </p>
            <div className="mt-3 rounded-2xl bg-gray-50 p-4 text-xs space-y-1.5 text-gray-600 font-medium">
              <p>• <strong>담당 부서</strong>: LifeFit 고객 소통팀</p>
              <p>• <strong>문의 이메일</strong>: <a href="mailto:support@lifefit.kr" className="text-blue-600 hover:underline">support@lifefit.kr</a></p>
              <p>• <strong>문의 방식</strong>: 365일 24시간 접수 가능 (통상 영업일 기준 48시간 이내 회신)</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400">
        <p>© 2026 LifeFit. All rights reserved.</p>
      </footer>
    </div>
  );
}

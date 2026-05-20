import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 자동차 미환급 채권 계산기 | 내 숨은 돈 찾기",
  description:
    "차량 구매 시 의무 매입한 지역개발채권·도시철도채권의 예상 환급금을 확인하세요. 2026년 기준 지역별 요율과 복리 이자를 반영한 정확한 모의계산.",
  keywords: [
    "자동차 채권 환급금",
    "미환급 채권 조회",
    "지역개발채권 환급",
    "도시철도채권 환급",
    "자동차 채권 계산기",
    "2026 자동차 채권",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/car-bond",
  },
  openGraph: {
    title: "2026 자동차 미환급 채권 환급금 모의계산기",
    description: "내 차 살 때 낸 채권, 지금 돌려받을 수 있는지 1분 만에 확인해보세요.",
    url: "https://lifefit.kr/tools/car-bond",
    images: [
      {
        url: "/og-car-bond.png",
        width: 1200,
        height: 630,
        alt: "자동차 미환급 채권 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

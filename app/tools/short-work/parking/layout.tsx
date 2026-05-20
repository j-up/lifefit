import { Metadata } from "next";

export const metadata: Metadata = {
  title: "육아 단축근무기 파킹통장 활용 가이드 | 2026 재테크 전략",
  description:
    "2026년 육아기 근로시간 단축 급여, 어떻게 굴려야 할까? 단기 자금 운용에 최적인 파킹통장 비교 및 금리 혜택 정보를 확인하고 현명한 자산 관리 전략을 세워보세요.",
  openGraph: {
    title: "육아 단축근무기 파킹통장 활용 가이드 | LifeFit",
    description: "단축근무로 인한 소득 변화, 스마트한 파킹통장 활용으로 극복하세요.",
    url: "https://lifefit.kr/tools/short-work/parking",
    images: [{ url: "https://lifefit.kr/og-short-work-parking.png" }],
  },
};

export default function ParkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

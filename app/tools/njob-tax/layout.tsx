import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 N잡러 건보료 폭탄 계산기 | 종합소득세 & 피부양자 탈락 리스크",
  description:
    "부업이나 프리랜서 수입이 있다면 꼭 확인하세요! 2026년 기준 종합소득세 신고 후 건강보험료 인상액과 피부양자 자격 박탈 위험을 진단해 드립니다.",
  keywords: [
    "N잡러 건보료",
    "건보료 폭탄",
    "피부양자 박탈 조건",
    "부업 종합소득세",
    "프리랜서 건강보험료",
    "2026 건보료 계산",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/njob-tax",
  },
  openGraph: {
    title: "2026 N잡러·프리랜서 건보료 및 세금 리스크 진단기",
    description: "종소세 신고 전, 내 건보료가 얼마나 오를지 1분 만에 미리 확인하고 대비하세요.",
    url: "https://lifefit.kr/tools/njob-tax",
    images: [
      {
        url: "/og-njob-tax.png",
        width: 1200,
        height: 630,
        alt: "N잡러 건보료 폭탄 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

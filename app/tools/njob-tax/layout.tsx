import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 N잡러 종합소득세 및 건보료 폭탄 계산기 | 피부양자 박탈 모의계산",
  description:
    "직장인 부업, 3.3% 프리랜서라면 필독! 2026년 최신 세법 기준, 5월 종합소득세 신고 후 내 건강보험료 인상액과 피부양자 탈락 리스크를 1분 만에 정확히 모의계산합니다.",
  keywords:
    "2026 N잡러 종합소득세 계산기, 프리랜서 건강보험료 폭탄, 부업 피부양자 박탈 기준, 3.3% 세금 건보료, 투잡 세금 모의계산, 스마트스토어 건보료, 투잡 건강보험료",
  alternates: {
    canonical: "https://lifefit.kr/tools/njob-tax",
  },
  openGraph: {
    title: "2026 N잡러 건보료 폭탄 계산기 | 피부양자 탈락 모의계산",
    description:
      "부업으로 번 돈, 건보료로 다 나간다? 2026년 기준 종소세 신고 후 피부양자 박탈 및 건보료 인상 위험을 지금 바로 모의계산해보세요.",
    url: "https://lifefit.kr/tools/njob-tax",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-njob-tax.png",
        width: 1200,
        height: 630,
        alt: "건보료 폭탄 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 N잡러 건보료 폭탄 계산기 | 피부양자 탈락 모의계산",
    description:
      "부업으로 번 돈, 건보료로 다 나간다? 건보료 인상 위험을 1분 만에 모의계산해보세요.",
    images: ["https://lifefit.kr/og-njob-tax.png"],
  },
};

export default function NJobTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "부업 소득이 얼마가 넘으면 건강보험료가 오르나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "직장 외 부업 소득(이자·배당·임대·사업·기타소득 합계)이 연 2,000만 원을 초과하면 초과분에 대해 추가 건강보험료가 부과됩니다. 2025년부터는 금융소득 기준이 하향될 수 있으므로 최신 규정 확인이 필요합니다.",
        },
      },
      {
        "@type": "Question",
        name: "피부양자에서 박탈되는 기준은 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2026년 기준 사업소득이 연 500만 원 초과, 또는 금융·임대 등 합산 소득이 연 2,000만 원 초과 시 피부양자에서 제외됩니다. 재산세 과세 표준 5.4억 원 초과 시에도 제외될 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "3.3% 프리랜서는 건강보험료를 어떻게 내나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "3.3% 원천징수 대상 프리랜서(사업소득)는 5월 종합소득세 신고 후 확정된 소득을 기준으로 건강보험료가 재산정됩니다. 직장가입자 피부양자인 경우 연 소득 500만 원 초과 시 지역가입자로 전환되어 별도 건보료가 부과됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "N잡러 종합소득세 신고는 언제 해야 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "매년 5월 1일~31일이 종합소득세 신고 기간입니다. 직장 외 소득(프리랜서, 스마트스토어, 유튜브 수익 등)이 있는 경우 반드시 신고해야 하며, 신고 시 결정된 소득을 기준으로 11월부터 건강보험료가 정산됩니다.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

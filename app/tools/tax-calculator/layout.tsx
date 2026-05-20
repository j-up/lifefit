import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 이자 세금 비교 계산기 | 예적금 과세 vs 저율과세 vs 비과세",
  description:
    "2026년 최신 세법 기준, 시중은행과 상호금융(신협, 새마을금고)의 이자 세금을 1분 만에 비교하세요. 연봉 7,000만 원 초과 시 상호금융 저율과세 인상 리스크까지 정확히 모의계산합니다.",
  keywords:
    "2026 이자 세금 계산기, 예적금 세금 비교, 상호금융 저율과세 2026, 신협 이자 세금, 새마을금고 이자 세금, 비과세 종합저축, 이자소득세 계산기, 2026년 이자세율",
  alternates: {
    canonical: "https://lifefit.kr/tools/tax-calculator",
  },
  openGraph: {
    title: "2026 이자 세금 비교 계산기 | 예적금 실수령액 확인",
    description:
      "내 예적금 이자, 세금 떼면 얼마일까? 2026년 바뀌는 상호금융 세율을 반영하여 시중은행과 한눈에 비교해보세요.",
    url: "https://lifefit.kr/tools/tax-calculator",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-tax-calculator.png",
        width: 1200,
        height: 630,
        alt: "이자 세금 비교 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 이자 세금 비교 계산기 | 예적금 실수령액 확인",
    description:
      "2026년 상호금융 세율 인상분 반영! 내 예적금 이자 세금을 지금 바로 비교해보세요.",
    images: ["https://lifefit.kr/og-default.png"],
  },
};

export default function TaxCalculatorLayout({
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
        name: "일반 시중은행의 이자 세율은 얼마인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "일반적으로 시중은행(국민, 신한 등)의 이자소득세는 14%이며, 여기에 지방소득세 1.4%가 더해져 총 15.4%의 세금이 부과됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "상호금융(신협, 새마을금고 등) 저율과세 혜택은 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "상호금융 기관에서 1인당 3,000만 원 한도로 예적금을 가입하면 이자소득세 14%가 면제되고, 농어촌특별세(1.4% 또는 2026년부터 조건부 5.0%)만 부과되는 혜택입니다.",
        },
      },
      {
        "@type": "Question",
        name: "2026년부터 바뀌는 이자 세금 규칙은 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2026년부터는 연봉(총급여)이 7,000만 원을 초과하는 고소득자가 상호금융 저율과세 혜택을 받을 경우, 기존 1.4%가 아닌 5.0%의 세율이 적용될 예정입니다.",
        },
      },
      {
        "@type": "Question",
        name: "비과세 종합저축은 누구나 가입할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "만 65세 이상 거주자, 장애인, 국가유공자, 기초생활수급자 등 특정 자격을 갖춘 경우에 한해 1인당 5,000만 원 한도로 세금이 전혀 붙지 않는(0%) 비과세 종합저축 가입이 가능합니다.",
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

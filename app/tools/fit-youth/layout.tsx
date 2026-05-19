import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 청년 주거지원 대상자 판별기 | 청년월세 특별지원 모의계산",
  description:
    "나는 청년월세 특별지원 대상일까? 2026년 기준 중위소득 및 재산 요건을 1분 만에 분석하여 월 20만 원 월세 지원 대상자인지 정확히 모의계산해 드립니다.",
  keywords:
    "2026 청년 주거지원, 청년월세 특별지원 대상자, 청년월세지원 모의계산, 청년월세 소득기준, 청년 주거지원 판별기, 중위소득 60% 계산, LH 청년월세",
  alternates: {
    canonical: "https://lifefit.kr/tools/fit-youth",
  },
  openGraph: {
    title: "2026 청년 주거지원 대상자 판별기 | 청년월세 모의계산",
    description:
      "복잡한 중위소득 60% 조건, 1분이면 확인 끝! 2026년 청년월세 특별지원 대상자인지 빠르고 정확하게 판별해 드립니다.",
    url: "https://lifefit.kr/tools/fit-youth",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-fit-youth.png",
        width: 1200,
        height: 630,
        alt: "2026 청년 주거지원 대상자 판별기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 청년 주거지원 대상자 판별기 | 청년월세 모의계산",
    description:
      "복잡한 중위소득 60% 조건, 1분이면 확인 끝! 청년월세 특별지원 대상자인지 판별해 보세요.",
    images: ["https://lifefit.kr/og-fit-youth.png"],
  },
};

export default function FitYouthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "2026 청년 주거지원 대상자 판별기",
        url: "https://lifefit.kr/tools/fit-youth",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description:
          "2026년 청년월세 특별지원 기준으로 대상자 여부를 1분 만에 판별하는 웹 애플리케이션",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "청년월세 특별지원 대상자 기준이 어떻게 되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "2026년 기준 만 19~34세 청년이 부모와 별도 거주하며, 본인 가구 소득이 기준 중위소득 60% 이하, 재산이 1.22억 원 이하인 경우 지원받을 수 있습니다. 월세 60만 원 이하인 독립 거주자가 대상입니다.",
            },
          },
          {
            "@type": "Question",
            name: "청년월세 지원금은 얼마나 받나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "청년월세 특별지원은 최대 월 20만 원씩 최장 12개월, 총 240만 원까지 지원받을 수 있습니다. 실제 월세액이 20만 원 미만인 경우 실제 월세액을 지원합니다.",
            },
          },
          {
            "@type": "Question",
            name: "청년 주거지원 신청은 어디서 하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "복지로(www.bokjiro.go.kr) 또는 주민센터(행정복지센터)에서 신청 가능합니다. 신청 기간은 수시로 모집하며, LH청약센터에서도 일부 주거지원 프로그램을 신청할 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "기준 중위소득 60%는 얼마인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "2026년 1인 가구 기준 중위소득 60%는 약 133만 원입니다. 2인 가구는 약 221만 원, 3인 가구는 약 284만 원 수준입니다. 위 계산기에서 가구원 수별 기준을 정확히 확인하실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {children}
    </>
  );
}

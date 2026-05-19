import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 육아기 근로시간 단축 급여 계산기 | 실수령액 모의계산",
  description:
    "2026년 확대된 육아기 근로시간 단축 제도! 줄어든 월급만큼 고용보험에서 얼마나 지원받을 수 있는지, 내 예상 실수령액을 1분 만에 완벽하게 모의계산해 보세요.",
  keywords:
    "2026 육아기 근로시간 단축 급여 계산기, 단축근무 급여, 육아휴직 급여 계산, 육아 단축근무 실수령액, 2026 단축근무 급여 모의계산, 고용보험 육아수당",
  alternates: {
    canonical: "https://lifefit.kr/tools/short-work",
  },
  openGraph: {
    title: "2026 육아기 근로시간 단축 급여 계산기 | 실수령액 모의계산",
    description:
      "단축근무 신청 전 필수 확인! 내 월급 기준으로 회사 지급액과 고용보험 지원금을 합산한 예상 실수령액을 정확히 모의계산합니다.",
    url: "https://lifefit.kr/tools/short-work",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-short-work.png",
        width: 1200,
        height: 630,
        alt: "2026 육아기 단축근무 급여 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 육아기 단축근무 급여 계산기 | 실수령액 모의계산",
    description:
      "단축근무 신청 전 필수 확인! 예상 실수령액을 1분 만에 계산해 보세요.",
    images: ["https://lifefit.kr/og-short-work.png"],
  },
};

export default function ShortWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "2026 육아기 근로시간 단축 급여 계산기",
        url: "https://lifefit.kr/tools/short-work",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description:
          "2026년 확대된 육아기 근로시간 단축 제도 기준으로 예상 실수령액을 모의계산하는 웹 애플리케이션",
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
            name: "육아기 근로시간 단축 급여는 누가 받나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "자녀가 만 12세 이하(입학 초등학교 6학년 이하)이고 고용보험에 180일 이상 가입된 근로자라면 신청할 수 있습니다. 주 15~35시간으로 단축 근무가 가능합니다.",
            },
          },
          {
            "@type": "Question",
            name: "육아기 단축근무 시 얼마를 받나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "2026년 기준 단축 후 최초 12개월은 통상임금 상한액(250만 원)의 100%를 기준으로 지원하고, 이후에는 80%를 기준으로 지원합니다. 회사 지급액과 합하면 원래 월급의 80~90% 수준을 유지할 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "육아기 단축근무는 최대 몇 년이나 사용할 수 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "육아기 근로시간 단축은 자녀 1명당 최대 3년까지 사용할 수 있습니다. 양쪽 모두 사용 가능하나, 동일 자녀에 대해서는 동시에 사용할 수 없고 순차적으로만 이용 가능합니다.",
            },
          },
          {
            "@type": "Question",
            name: "회사에서 육아기 단축근무를 거절하면 어떻게 되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "300인 이상 기업은 정당한 사유 없이 거절할 수 없습니다. 300인 미만 기업은 대체 인력 채용이 어려울 때 거절할 수 있으나 거절 사유서를 지급해야 합니다. 부당한 거절 시 고용노동부 상담(1350)에 문의하세요.",
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

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 자동차 미환급 채권 환급금 계산기 | 지역개발채권·도시철도채권",
  description:
    "차량 구매 시 의무 매입한 지역개발채권·도시철도채권, 찾아가지 않아 소멸 위기! 내 자동차 채권 환급금을 1분 만에 예상 금액으로 모의계산하고 지자첼별 환급 절차를 확인하세요.",
  keywords:
    "2026 자동차 채권 환급금 조회, 미환급 채권 계산기, 지역개발채권 만기 소멸, 차 채권 돌려받기, 도시철도채권 환급, 자동차 채권 청구 시효, 지역개발채권 조회",
  alternates: {
    canonical: "https://lifefit.kr/tools/car-bond",
  },
  openGraph: {
    title: "2026 자동차 미환급 채권 환급금 계산기 | 지역개발채권·도시철도채권",
    description:
      "차량 구매 시 의무 매입한 채권, 만기 후 5년이 지나면 국고로 소멸됩니다. 지금 바로 내 예상 환급금을 확인하고 지자첼별 환급 절차를 알아보세요.",
    url: "https://lifefit.kr/tools/car-bond",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-car-bond.png",
        width: 1200,
        height: 630,
        alt: "자동차 미환급 채권 환급금 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 자동차 미환급 채권 환급금 계산기 | 지역개발채권·도시철도채권",
    description:
      "차량 구매 시 의무 매입한 채권, 만기 후 5년이 지나면 국고로 소멸됩니다. 지금 바로 내 예상 환급금을 확인하세요.",
    images: ["https://lifefit.kr/og-car-bond.png"],
  },
};

export default function CarBondLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "2026 자동차 미환급 채권 환급금 계산기",
        url: "https://lifefit.kr/tools/car-bond",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description:
          "차량 구매 시 의무 매입한 지역개발채권·도시철도채권의 예상 환급금을 지역·배기량·구매 시기별로 모의계산하는 웹 애플리케이션",
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
            name: "자동차 채권 환급금이란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "자동차를 신규 등록할 때 지자체(서울·부산 등)에 의무적으로 매입한 지역개발채권 또는 도시철도채권을 말합니다. 만기(5~7년)가 지나면 원금과 이자를 돌려받을 수 있지만, 많은 차주가 찾아가지 않아 소멸되고 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "자동차 채권 환급 청구 시효는 얼마인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "만기 후 5년간 청구하지 않으면 국고(지자체 재정)로 귀속되어 소멸됩니다. 2018년 이전에 차량을 구매하신 분들은 이미 청구 시효가 지났을 가능성이 높으므로 해당 지자체 금고 은행에 반드시 확인해 보세요.",
            },
          },
          {
            "@type": "Question",
            name: "자동차 채권 환급금은 어디에서 받을 수 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "차량 등록 지자체가 지정한 금고 은행(서울은 신한은행, 부산은 부산은행, 대구는 대구은행 등)에서 신청할 수 있습니다. 대부분의 은행은 모바일 앱이나 인터넷 뱅킹을 통해 미환급 채권 조회 서비스를 제공하고 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "자동차 채권 매입 비율은 어떻게 되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "지역과 배기량에 따라 차량 가액의 약 4%~12% 수준에서 차등 적용됩니다. 서울·경기 등 대도시와 대형·SUV 차량일수록 매입 비율이 높습니다. 본 계산기는 지역·배기량·구매 시기를 입력하면 예상 환급금을 산정해 드립니다.",
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

import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifefit.kr"),
  title: {
    default: "LifeFit - 2026 복지 혜택 계산기 & 정부 정책 가이드",
    template: "%s | LifeFit",
  },
  description:
    "육아기 단축근무 급여, 청년 월세 지원, N잡러 건보료 등 2026년 최신 정부 정책과 복지 혜택을 한눈에 확인하세요. 1분 모의 계산으로 내게 맞는 지원금을 알아보세요.",
  keywords: [
    "2026 복지 혜택",
    "육아기 단축근무 급여 계산기",
    "청년 월세 지원",
    "청년 주거지원",
    "N잡러 건보료",
    "정부 정책",
    "복지 계산기",
    "LifeFit",
  ],
  alternates: {
    canonical: "https://lifefit.kr",
    types: {
      "application/rss+xml": "https://lifefit.kr/rss.xml",
    },
  },
  openGraph: {
    title: "LifeFit (라이프핏) - 2026 청년·육아 복지 지원금 가이드 및 계산기",
    description:
      "2026년 청년 월세 지원부터 육아기 단축근무 급여 계산까지! 복잡한 정부 정책을 LifeFit에서 가장 쉽고 빠르게 확인하세요.",
    url: "https://lifefit.kr",
    siteName: "LifeFit",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "LifeFit - 2026 복지 혜택 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeFit (라이프핏) - 2026 청년·육아 복지 지원금 가이드 및 계산기",
    description:
      "2026년 청년 월세 지원부터 육아기 단축근무 급여 계산까지! 복잡한 정부 정책을 LifeFit에서 가장 쉽고 빠르게 확인하세요.",
    images: ["/og-default.png"],
  },
  verification: {
    google: "8ORgAQ1y7T1TywdMGnJt933zXw8x_-9l6Q5_8x1qR48",
  },
  other: {
    "naver-site-verification": "aa637d9690fb33c87a56f84cdffa1c4f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832182931355116"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="kakao-sdk"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* JSON-LD: Organization + WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://lifefit.kr/#organization",
                  name: "LifeFit",
                  url: "https://lifefit.kr",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://lifefit.kr/favicon.ico",
                  },
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://lifefit.kr/#website",
                  url: "https://lifefit.kr",
                  name: "LifeFit",
                  description:
                    "2026년 최신 정부 정책과 복지 혜택 계산기",
                  publisher: {
                    "@id": "https://lifefit.kr/#organization",
                  },
                  inLanguage: "ko-KR",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://lifefit.kr/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

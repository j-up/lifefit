import type { Metadata } from "next";
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
  title: "LifeFit - 생활을 더 건강하고 풍요롭게",
  description: "육아기 단축근무, 청년 주거지원 등 각종 복지 혜택과 정부 정책 정보를 한눈에 확인하세요.",
  alternates: {
    canonical: "https://lifefit.kr",
  },
  openGraph: {
    title: "LifeFit (라이프핏) - 청년·육아 복지 지원금 가이드 및 계산기",
    description: "2026년 청년 월세 지원부터 육아기 단축근무 급여 계산까지! 복잡한 정부 정책을 LifeFit에서 가장 쉽고 빠르게 확인하세요.",
    url: "https://lifefit.kr",
    siteName: "LifeFit",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeFit (라이프핏) - 청년·육아 복지 지원금 가이드 및 계산기",
    description: "2026년 청년 월세 지원부터 육아기 단축근무 급여 계산까지! 복잡한 정부 정책을 LifeFit에서 가장 쉽고 빠르게 확인하세요.",
  },
  verification: {
    google: "8ORgAQ1y7T1TywdMGnJt933zXw8x_-9l6Q5_8x1qR48",
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832182931355116"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

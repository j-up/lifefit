"use client";

import { useEffect, useState } from "react";

interface AdSenseSlotProps {
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdSenseSlot({
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || process.env.NODE_ENV === "development") return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error("AdSense initialization error:", err);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className={`my-6 min-h-[120px] bg-gray-50/50 rounded-2xl animate-pulse ${className}`} />
    );
  }

  // 개발 환경에서는 고급스러운 프리뷰 박스를 노출하여 레이아웃 디자인 검수 지원
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`my-6 p-6 rounded-2xl border border-dashed border-blue-200 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 text-center flex flex-col items-center justify-center min-h-[120px] relative overflow-hidden group transition-all hover:border-blue-300 ${className}`}
      >
        <div className="absolute top-2 right-2 rounded bg-blue-100 text-[10px] font-bold text-blue-600 px-1.5 py-0.5 uppercase tracking-wider">
          AdSense Preview
        </div>
        <span className="text-xl mb-1 text-blue-500 font-semibold group-hover:scale-105 transition-transform">
          📢 Google AdSense
        </span>
        <span className="text-xs text-gray-400 font-medium">
          [반응형 광고 영역] 퍼블리셔 ID: <code className="bg-gray-100 px-1 rounded text-blue-600 font-mono text-[10px]">ca-pub-7832182931355116</code>
        </span>
        <span className="text-[10px] text-gray-300 mt-1">
          ※ 프로덕션 배포 시 구글 실광고로 자동 전환됩니다.
        </span>
      </div>
    );
  }

  return (
    <div className={`adsense-wrapper my-6 overflow-hidden flex justify-center items-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7832182931355116"
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}

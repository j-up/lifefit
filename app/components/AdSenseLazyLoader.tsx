"use client";

import { useEffect } from "react";

export default function AdSenseLazyLoader() {
  useEffect(() => {
    let loaded = false;
    let timeoutId: NodeJS.Timeout;
    
    const loadAdSense = () => {
      if (loaded) return;
      loaded = true;

      try {
        const script = document.createElement("script");
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832182931355116";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      } catch (err) {
        console.error("Failed to lazy load AdSense:", err);
      }

      cleanup();
    };

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
    };

    // 1. 사용자 인터랙션 발생 시 즉시 로드
    window.addEventListener("scroll", loadAdSense, { passive: true });
    window.addEventListener("touchstart", loadAdSense, { passive: true });
    window.addEventListener("mousemove", loadAdSense, { passive: true });

    // 2. 크롤러 봇인 경우 즉시 로드, 일반 환경은 3.5초 후 자동 폴백 로드 (검토 통과용)
    const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|lighthouse/i.test(
      navigator.userAgent
    );
    
    if (isBot) {
      loadAdSense();
    } else {
      timeoutId = setTimeout(loadAdSense, 3500);
    }

    return cleanup;
  }, []);

  return null;
}


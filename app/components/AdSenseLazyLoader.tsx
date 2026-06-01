"use client";

import { useEffect } from "react";

export default function AdSenseLazyLoader() {
  useEffect(() => {
    let loaded = false;
    
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
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
    };

    window.addEventListener("scroll", loadAdSense, { passive: true });
    window.addEventListener("touchstart", loadAdSense, { passive: true });
    window.addEventListener("mousemove", loadAdSense, { passive: true });

    return cleanup;
  }, []);

  return null;
}

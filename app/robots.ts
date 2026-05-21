import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 일반 크롤러: 공개 콘텐츠 허용, 내부 경로 차단
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",       // API 라우트 차단
          "/admin/",     // 관리자 페이지 차단
          "/_next/",     // Next.js 내부 파일 차단
        ],
      },
    ],
    sitemap: "https://lifefit.kr/sitemap.xml",
  };
}

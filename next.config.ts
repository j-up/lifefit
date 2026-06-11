import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // 트레일링 슬래시 없음으로 통일 (canonical 중복 방지)
  trailingSlash: false,

  async redirects() {
    return [
      // 파킹통장 경로 최적화 (SEO 301 리다이렉트)
      {
        source: "/tools/short-work/parking",
        destination: "/tools/parking",
        permanent: true,
      },
      // www → non-www 리디렉션 (중복 도메인 방지)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.lifefit.kr",
          },
        ],
        destination: "https://lifefit.kr/:path*",
        permanent: true,
      },
      // HTTP → HTTPS 강제 리디렉션 (중복 URL 방지)
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://lifefit.kr/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lifefit.kr",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // 1. 육아 수당 계산기 서브도메인 (baby.lifefit.kr 또는 로컬 테스트용 baby.localhost:3000)
  if (
    hostname.includes("baby.lifefit.kr") ||
    hostname.includes("baby.localhost")
  ) {
    if (url.pathname === "/") {
      url.pathname = "/tools/short-work";
    } else if (
      !url.pathname.startsWith("/tools/") &&
      !url.pathname.startsWith("/_next/") &&
      !url.pathname.includes(".")
    ) {
      url.pathname = `/tools/short-work${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // 2. 청년 월세 지원 서브도메인 (youth.lifefit.kr 또는 로컬 테스트용 youth.localhost:3000)
  if (
    hostname.includes("youth.lifefit.kr") ||
    hostname.includes("youth.localhost")
  ) {
    if (url.pathname === "/") {
      url.pathname = "/tools/fit-youth";
    } else if (
      !url.pathname.startsWith("/tools/") &&
      !url.pathname.startsWith("/_next/") &&
      !url.pathname.includes(".")
    ) {
      url.pathname = `/tools/fit-youth${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // 3. 메인 도메인 (lifefit.kr)은 원래대로 블로그 노출
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico, sitemap.xml, robots.txt, *.png, *.svg 등 (메타데이터 및 정적 에셋)
     */
    "/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

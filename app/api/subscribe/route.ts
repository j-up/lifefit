import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, categories, referrer } = body;

    // 1. 유효성 검증 (서버 사이드)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "올바른 이메일 주소 형식이 아닙니다." },
        { status: 400 }
      );
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: "최소 하나 이상의 카테고리를 선택해 주세요." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    // 2. Supabase 환경변수가 없을 경우 (개발 모드 및 예외 대응 Mock 처리)
    if (!supabaseUrl || !supabaseAnonKey) {
      console.info("--- [LifeFit Subscription Mock Data] ---");
      console.info(`Email: ${email}`);
      console.info(`Categories: ${categories.join(", ")}`);
      console.info(`Referrer: ${referrer || "Direct"}`);
      console.info("----------------------------------------");

      // 개발 및 배포 환경에서의 유연한 동작을 위해 200 OK 모크 반환
      return NextResponse.json({
        success: true,
        message: "로컬 시뮬레이션: 알림 신청이 성공적으로 로깅되었습니다.",
        isMock: true,
      });
    }

    // 3. Supabase REST API 호출 (패키지 의존성을 최소화하여 안전하고 신속하게 처리)
    const targetUrl = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/subscriptions`;
    
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        email,
        categories,
        referrer: referrer || null,
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Supabase REST API Error:", errText);
      throw new Error("구독 처리 중 외부 데이터베이스 에러가 발생했습니다.");
    }

    return NextResponse.json({
      success: true,
      message: "정부 정책 변동 및 혜택 알림 신청이 완료되었습니다.",
    });

  } catch (error: any) {
    console.error("Subscription API Handler Error:", error);
    return NextResponse.json(
      { error: error.message || "서버 통신 중 알 수 없는 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

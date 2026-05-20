import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Authorization 헤더 보안 검증 (Admin Secret 검사)
    const authHeader = request.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: "서버에 ADMIN_SECRET 환경 변수가 세팅되지 않았습니다. 관리가 필요합니다." },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== adminSecret) {
      return NextResponse.json(
        { error: "인증 토큰이 유효하지 않습니다. 권한이 없습니다." },
        { status: 401 }
      );
    }

    // 2. 요청 Body 파싱 및 유효성 검증
    const body = await request.json();
    const { subject, category, targetLink, contentHtml } = body;

    if (!subject || !category || !targetLink || !contentHtml) {
      return NextResponse.json(
        { error: "필수 인자가 누락되었습니다 (subject, category, targetLink, contentHtml)." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    // 3. 의존성 누락 시 Mock 모드 작동 (개발 & 초기 셋업 단계용 안전 폴백)
    if (!supabaseUrl || !supabaseAnonKey || !resendApiKey) {
      console.info("--- [LifeFit Bulk Broadcast Mock Simulation] ---");
      console.info(`Target Category: ${category}`);
      console.info(`Email Subject: ${subject}`);
      console.info(`Link URL: ${targetLink}`);
      console.info("-------------------------------------------------");
      
      const mockEmails = ["test1@lifefit.kr", "test2@lifefit.kr", "user_demo@gmail.com"];
      console.info(`Simulating mail broadcast to ${mockEmails.length} mock subscribers...`);
      mockEmails.forEach((email) => console.info(`-> Sent Mock Email to: ${email}`));
      console.info("--- [Simulation Complete] ---");

      return NextResponse.json({
        success: true,
        message: "로컬 시뮬레이션: 메일 일괄 발송이 가상으로 성공하였습니다.",
        isMock: true,
        totalSubscribers: mockEmails.length,
        sentCount: mockEmails.length,
        failedCount: 0,
      });
    }

    // 4. Supabase DB에서 해당 관심 카테고리를 가진 구독자들 이메일 리스트 조회
    // categories 필드가 text[] 배열이므로 PostgREST의 'cs' (Contains) 연산자를 사용해 정밀 조회
    const selectUrl = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/subscriptions?categories=cs.{${category}}&select=email`;

    const dbResponse = await fetch(selectUrl, {
      method: "GET",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Accept": "application/json",
      },
    });

    if (!dbResponse.ok) {
      const errText = await dbResponse.text();
      console.error("Supabase SELECT Error:", errText);
      throw new Error(`구독자 목록을 가져오지 못했습니다. DB 에러: ${errText}`);
    }

    const subscribers: { email: string }[] = await dbResponse.json();

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: "조회된 카테고리의 활성 구독자가 존재하지 않아 발송을 종료합니다.",
        totalSubscribers: 0,
        sentCount: 0,
      });
    }

    const emailFrom = process.env.EMAIL_FROM || "LifeFit 알림 <onboarding@resend.dev>";
    const uniqueEmails = Array.from(new Set(subscribers.map((s) => s.email.trim())));

    // 5. 각 이메일 주소별로 고급 HTML 이메일 템플릿 조립 후 Resend API 개별 비동기 발송
    // Promise.allSettled를 써서 일부 실패하더라도 전체가 중단되지 않고 견고하게 집계되도록 처리
    const sendPromises = uniqueEmails.map(async (email) => {
      // 구독자 맞춤 HTML 조립 (헤더, 본문, 링크 버튼, 하단 수신거부 문구 포함)
      const fullHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 30px 20px; border: 1px solid #f2f4f6; border-radius: 16px; background-color: #ffffff;">
          <!-- Header Logo -->
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 24px; font-weight: 800; color: #3182f6; letter-spacing: -0.5px;">LifeFit</span>
            <div style="font-size: 11px; color: #8b95a1; margin-top: 4px;">생활 밀착형 혜택 정보 플랫폼</div>
          </div>
          
          <!-- Content Card -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #f1f5f9;">
            <h2 style="font-size: 18px; font-weight: 800; color: #191f28; margin-top: 0; margin-bottom: 12px; line-height: 1.4;">
              📢 ${subject}
            </h2>
            <div style="font-size: 14px; color: #4e5968; line-height: 1.6; margin-bottom: 20px;">
              ${contentHtml}
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center;">
              <a href="${targetLink}" target="_blank" style="display: inline-block; background-color: #00c471; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 196, 113, 0.15);">
                자세한 내용 바로 확인하기 →
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; font-size: 11px; color: #8b95a1; line-height: 1.6; border-top: 1px solid #f2f4f6; padding-top: 20px; margin-top: 20px;">
            <p style="margin: 0 0 6px 0;">본 메일은 LifeFit 서비스에서 유저님이 정책 및 지원금 소식 실시간 알림을 신청하셨기에 발송된 알림 서비스 메일입니다.</p>
            <p style="margin: 0;">원치 않으실 경우 언제든 이메일 내에서 수신을 거부하실 수 있습니다. | <a href="#" style="color: #8b95a1; text-decoration: underline;">수신거부(Unsubscribe)</a></p>
            <p style="margin: 8px 0 0 0; font-weight: bold;">© 2026 LifeFit. All rights reserved.</p>
          </div>
        </div>
      `;

      const resendUrl = "https://api.resend.com/emails";
      const response = await fetch(resendUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: email,
          subject: subject,
          html: fullHtml,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Resend 발송 에러: ${errBody}`);
      }

      return email;
    });

    const results = await Promise.allSettled(sendPromises);

    // 6. 결과 집계 리포팅
    const sentList: string[] = [];
    const failedList: { email: string; reason: string }[] = [];

    results.forEach((res, index) => {
      const email = uniqueEmails[index];
      if (res.status === "fulfilled") {
        sentList.push(res.value);
      } else {
        failedList.push({
          email,
          reason: res.reason?.message || "알 수 없는 전송 실패",
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: "일괄 메일 전송 프로세스가 완료되었습니다.",
      totalSubscribers: uniqueEmails.length,
      sentCount: sentList.length,
      failedCount: failedList.length,
      failures: failedList,
    });

  } catch (error: any) {
    console.error("Bulk Broadcast API Error:", error);
    return NextResponse.json(
      { error: error.message || "메일 일괄 전송 중 예상하지 못한 시스템 내부 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

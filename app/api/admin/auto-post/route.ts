import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Authorization 보안 검증
    const authHeader = request.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: "서버에 ADMIN_SECRET 환경 변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== adminSecret) {
      return NextResponse.json(
        { error: "인증 토큰이 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 2. Body 파싱 및 유효성 검증
    const body = await request.json();
    const { rawPressRelease, category, model, sendNotification } = body;
    const selectedModel = model || "gemini-2.5-flash";

    if (!rawPressRelease || !category) {
      return NextResponse.json(
        { error: "필수 데이터(rawPressRelease, category)가 누락되었습니다." },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    // 3. 환경변수 없을 시 Mock 모드 처리 (개발 / 로컬 검증 최적화)
    if (!geminiApiKey || !supabaseUrl || !supabaseAnonKey || !resendApiKey) {
      console.info("--- [LifeFit AI Auto-Post Mock Mode] ---");
      console.info(`Category: ${category}`);
      console.info(`Press Release Snippet: ${rawPressRelease.substring(0, 100)}...`);
      console.info("----------------------------------------");

      const mockSlug = `mock-ai-policy-${Date.now()}`;
      const mockPost = {
        slug: mockSlug,
        title: `[AI 생성] 2026 복지 혜택 개정 가이드`,
        summary: `정부 보도자료를 분석하여 도출된 복지 혜택 핵심 일람입니다.`,
        content: `<h2>새로운 정책이 적용됩니다!</h2><p>본 내용은 모크용 인공지능이 생성한 테스트 글입니다. 보도자료 내용이 성공적으로 요약되었습니다.</p>`,
        category: category,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop",
        read_time: "3분",
        date: new Date().toISOString().split("T")[0],
      };

      return NextResponse.json({
        success: true,
        message: "로컬 시뮬레이션: AI 자동 포스팅 및 실시간 메일 전송이 가상 성공했습니다.",
        isMock: true,
        post: mockPost,
        broadcastSummary: {
          totalSubscribers: 5,
          sentCount: 5,
        }
      });
    }

    // 4. Gemini API 호출을 통한 지능형 기사 작성 (JSON Schema 적용)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${geminiApiKey}`;

    const promptText = `
당신은 최고의 정부 정책 분석 전문가이자 베스트셀러 경제/복지 에디터입니다.
다음 정부 보도자료 원문을 꼼꼼히 분석하여, 일반 서민/청년/직장인들이 한눈에 혜택을 이해하고 실생활에 100% 활용할 수 있는 "초고품질 가이드 기사"를 작성해 주세요. 
단순 요약이 아닌, 독창적인 인사이트와 조언이 가득 담긴 기사여야 합니다.

[보도자료 원문]:
${rawPressRelease}

---
[요구 사양]:
1. content는 의미 있는 깊이를 가진 상세한 내용이어야 하며, 반드시 다음 요소들을 포함하여 "전문가가 작성한 고부가가치 콘텐츠"로 만들어야 합니다:
   - **도입부**: 왜 이 정책이 중요한지, 누가 가장 큰 혜택을 받는지 흥미로운 스토리텔링으로 시작할 것.
   - **핵심 요약 (3가지 포인트)**: 바쁜 독자를 위해 가장 중요한 변경점이나 혜택 요약.
   - **상세 분석 및 신청 방법**: 혜택 대상, 금액, 신청 시기, 필수 서류 등을 구체적으로 서술할 것.
   - **에디터의 꿀팁 (Expert's Tip)**: 보도자료에 나오지 않는 실질적인 활용 팁이나 주의사항(예: "이런 분들은 꼭 이렇게 신청하세요", "이 혜택과 중복 가능한 혜택") 등 독창적인 의견을 추가할 것.
   - **자주 묻는 질문 (FAQ)**: 3개 이상의 구체적인 Q&A를 작성하여 독자의 궁금증을 해소해 줄 것.
2. content는 순수 HTML 형식이어야 합니다. 제목 태그(<h2>, <h3>)와 문단 태그(<p>), 강조(<strong>), 목록(<ul>, <li>), 인용구(<blockquote>), 구분선(<hr>) 등을 조화롭게 활용해 가독성을 극한으로 올려주세요. 본문 내에 불필요한 마크다운 기호(\`\`\`html 등)는 배제하고 순수 HTML 문자열만 제공하세요. 전체 분량은 최소 1,000자(한국어 기준) 이상이어야 합니다.
3. slug는 이 포스트의 성격을 영어 단어 2~4개의 조합으로 나타낸 URL 친화적 문자열(예: 'youth-rent-benefit-2026')로 생성해 주세요.
4. image는 이 글에 가장 어울리는 고품질 Unsplash 대표 이미지 URL을 선택해 줘. 아래 테마 중 어울리는 주소를 그대로 제공해야 해:
   - 세금/절세/금융 테마: https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop
   - 육아/아동/가족/복지 테마: https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=1200&h=630&fit=crop
   - 청년/주거/부동산/월세 테마: https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=630&fit=crop
   - 일반 생활/직장/기타 복지 테마: https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop
`;

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: promptText }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            summary: { type: "STRING" },
            content: { type: "STRING" },
            slug: { type: "STRING" },
            image: { type: "STRING" }
          },
          required: ["title", "summary", "content", "slug", "image"]
        }
      }
    };

    const aiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("Gemini API Error:", errText);
      throw new Error(`Gemini 콘텐츠 생성 실패: ${errText}`);
    }

    const aiData = await aiResponse.json();
    const generatedJsonText = aiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedJsonText) {
      throw new Error("Gemini에서 정상적인 JSON 응답을 받아오지 못했습니다.");
    }

    const parsedPost = JSON.parse(generatedJsonText);

    // 5. Supabase 'posts' 테이블에 AI 생성 콘텐츠 인서트
    const todayStr = new Date().toISOString().split("T")[0];
    const newPostData = {
      slug: parsedPost.slug.trim(),
      title: parsedPost.title.trim(),
      summary: parsedPost.summary.trim(),
      content: parsedPost.content.trim(),
      category: category,
      image: parsedPost.image.trim(),
      read_time: "3분",
      date: todayStr,
      created_at: new Date().toISOString(),
    };

    const insertUrl = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/posts`;
    const dbResponse = await fetch(insertUrl, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(newPostData),
    });

    if (!dbResponse.ok) {
      const errText = await dbResponse.text();
      console.error("Supabase Post Insert Error:", errText);
      throw new Error(`DB 저장 중 에러가 발생했습니다: ${errText}`);
    }

    // 6. 실시간 구독자 연쇄 알림 메일링 자동 트리거 (Cascade Trigger) - 선택적 실행
    let sentCount = 0;
    let totalSubscribers = 0;

    if (sendNotification) {
      const targetCategoryMap: Record<string, string> = {
        "주거·복지": "housing",
        "세금·복지": "tax",
        "복지·육아": "welfare",
        "목돈·자산": "saving",
        "자동차·채권": "car",
      };
      const alertCategory = targetCategoryMap[category] || "housing";

      const subscribersUrl = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/subscriptions?categories=cs.{${alertCategory}}&select=email`;
      const subResponse = await fetch(subscribersUrl, {
        method: "GET",
        headers: {
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Accept": "application/json",
        },
      });

      if (subResponse.ok) {
        const subscribers: { email: string }[] = await subResponse.json();
        if (subscribers && subscribers.length > 0) {
          totalSubscribers = subscribers.length;
          const uniqueEmails = Array.from(new Set(subscribers.map((s) => s.email.trim())));
          
          const emailFrom = process.env.EMAIL_FROM || "LifeFit 알림 <onboarding@resend.dev>";
          const targetLink = `https://lifefit.kr/posts/${newPostData.slug}`;

          const sendPromises = uniqueEmails.map(async (email) => {
            const fullHtml = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 30px 20px; border: 1px solid #f2f4f6; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <span style="font-size: 24px; font-weight: 800; color: #3182f6; letter-spacing: -0.5px;">LifeFit</span>
                  <div style="font-size: 11px; color: #8b95a1; margin-top: 4px;">생활 밀착형 혜택 정보 플랫폼</div>
                </div>
                
                <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #f1f5f9;">
                  <h2 style="font-size: 18px; font-weight: 800; color: #191f28; margin-top: 0; margin-bottom: 12px; line-height: 1.4;">
                    📢 [신규 정책 가이드] ${newPostData.title}
                  </h2>
                  <div style="font-size: 14px; color: #4e5968; line-height: 1.6; margin-bottom: 20px;">
                    <p>안녕하세요! 파트너님의 맞춤 알림 기준에 맞는 <strong>새로운 정부 혜택/정책 가이드</strong>가 LifeFit 플랫폼에 신규 작성되었습니다.</p>
                    <p style="background-color: #ffffff; padding: 12px; border-radius: 8px; border-left: 4px solid #3182f6; font-style: italic;">
                      "${newPostData.summary}"
                    </p>
                  </div>
                  
                  <div style="text-align: center;">
                    <a href="${targetLink}" target="_blank" style="display: inline-block; background-color: #00c471; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 196, 113, 0.15);">
                      가이드 즉시 확인하러 가기 →
                    </a>
                  </div>
                </div>
                
                <div style="text-align: center; font-size: 11px; color: #8b95a1; line-height: 1.6; border-top: 1px solid #f2f4f6; padding-top: 20px; margin-top: 20px;">
                  <p style="margin: 0 0 6px 0;">본 메일은 LifeFit 서비스에서 실시간 알림을 동의하셨기에 자동 발송되었습니다.</p>
                  <p style="margin: 0;"><a href="#" style="color: #8b95a1; text-decoration: underline;">수신거부(Unsubscribe)</a></p>
                </div>
              </div>
            `;

            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: emailFrom,
                to: email,
                subject: `[LifeFit 알림] ${newPostData.title}`,
                html: fullHtml,
              }),
            });
          });

          const results = await Promise.allSettled(sendPromises);
          sentCount = results.filter((r) => r.status === "fulfilled").length;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "AI 정책 요약 포스팅 작성 및 구독자 메일 배포 연동이 원클릭 성공했습니다.",
      post: newPostData,
      broadcastSummary: {
        totalSubscribers,
        sentCount,
        failedCount: totalSubscribers - sentCount,
      }
    });

  } catch (error: any) {
    console.error("AI Auto-Post API Error:", error);
    return NextResponse.json(
      { error: error.message || "AI 자동 포스팅 작업 처리 도중 치명적인 내부 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

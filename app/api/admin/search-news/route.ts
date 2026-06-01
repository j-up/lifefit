import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Authorization 보안 검증
    const authHeader = request.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category } = await request.json();
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // Mock Mode if no API Key
    if (!geminiApiKey) {
      return NextResponse.json({
        success: true,
        isMock: true,
        news: {
          title: `[가상 뉴스] 2026년 ${category} 지원금 대폭 확대 발표`,
          content: `행정안전부와 보건복지부는 2026년 하반기부터 ${category} 관련 지원 예산을 기존 대비 20% 증액하기로 결정했습니다. 특히 청년층과 취약계층을 위한 맞춤형 혜택이 강화될 예정입니다...`,
          source: "정부 보도자료 (가상)"
        }
      });
    }

    // Gemini API 호출 - 최신 뉴스 서치 시뮬레이션 및 초안 작성
    // 실제 Google Search Grounding을 사용하려면 google_search_retrieval 툴을 페이로드에 포함해야 함
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
    
    const prompt = `
당신은 대한민국 정부 정책 전문 리서처입니다.
카테고리: [${category}] 에 해당하는 2026년 최신 정책 소식 또는 보도자료 내용을 1개 찾아서 요약해 주세요.
반드시 사실에 기반한 최신 트렌드(지식 컷오프 내외의 예측 포함)를 반영하여, 블로그 포스팅을 하기 위한 '보도자료 원문' 형태로 작성해 주세요.

출력 형식 (JSON):
{
  "title": "뉴스 제목",
  "content": "상세 보도내용 (블로그 포스팅의 재료가 될 원문 텍스트)",
  "source": "출처 (예: 국토교통부, 보건복지부 등)"
}
`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              content: { type: "STRING" },
              source: { type: "STRING" }
            }
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Response:", JSON.stringify(data));
      throw new Error(data.error?.message || `Gemini API Error (Status: ${response.status})`);
    }

    const candidates = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidates) {
      console.error("Gemini Response structure is invalid:", JSON.stringify(data));
      throw new Error("Gemini API가 유효하지 않은 응답 구조를 반환했습니다.");
    }

    const newsJson = JSON.parse(candidates);

    return NextResponse.json({
      success: true,
      news: newsJson
    });

  } catch (error: any) {
    console.error("search-news Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

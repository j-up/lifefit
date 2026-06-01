import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 400 });
    }

    const targetModels = ["gemini-2.5-flash", "gemini-3.5-flash", "gemini-2.5-pro"];

    const testPromises = targetModels.map(async (modelName) => {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }],
            generationConfig: { maxOutputTokens: 5 }
          })
        });

        const data = await response.json();

        if (response.ok) {
          return { model: modelName, status: "OK", message: "정상 작동" };
        } else {
          const code = data.error?.code || response.status;
          const msg = data.error?.message || "";
          
          if (code === 503 || msg.includes("high demand") || msg.includes("Spikes in demand")) {
            return { model: modelName, status: "CONGESTED", message: "구글 서버 포화 (503 혼잡)" };
          } else if (code === 403 || code === 400 || msg.includes("API key")) {
            return { model: modelName, status: "UNAUTHORIZED", message: "API 키 권한 만료 또는 형식 오류" };
          } else if (code === 404) {
            return { model: modelName, status: "NOT_FOUND", message: "모델 미지원" };
          } else {
            return { model: modelName, status: "ERROR", message: msg || `에러 발생 (코드: ${code})` };
          }
        }
      } catch (err: any) {
        return { model: modelName, status: "ERROR", message: err.message };
      }
    });

    const results = await Promise.all(testPromises);
    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

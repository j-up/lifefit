"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Play, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Mail, 
  FileText, 
  Lock, 
  Sparkles, 
  Database,
  RefreshCw,
  Home
} from "lucide-react";

interface LogEntry {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState("");
  const [category, setCategory] = useState("주거·복지");
  const [rawPressRelease, setRawPressRelease] = useState(
    `[보도자료] 2026년 청년 전세자금대출 지원 대상 및 한도 전격 확대
  
국토교통부는 청년층의 주거 부담을 덜어주기 위해 2026년 7월 1일부터 청년 전용 버팀목 전세자금대출의 지원 대상 소득 기준과 대출 한도를 대폭 완화한다고 밝혔다.

이번 개정안에 따르면, 대출 신청이 가능한 청년의 부부합산 소득 기준이 기존 연 6천만 원 이하에서 연 8천만 원 이하로 상향 조정된다. 단독 가구의 경우 연 5천만 원 이하에서 연 6천5백만 원 이하로 완화된다.

또한, 보증금 기준과 대출 한도도 함께 확대된다. 임차보증금 기준은 기존 3억 원 이하 주택에서 최대 4.5억 원 이하 주택으로 상향되며, 대출 한도는 기존 2억 원에서 최대 3억 원까지로 대폭 늘어난다.

대출 금리는 청년층의 이자 부담 완화를 위해 연 1.8% ~ 2.7% 수준을 유지하며, 다자녀 가구나 신혼부부의 경우 추가 우대금리(최대 0.5%p)를 적용받을 수 있어 실질 금리는 더 낮아질 전망이다.

국토교통부 관계자는 "이번 조치를 통해 약 5만 명의 청년 가구가 추가로 혜택을 볼 수 있을 것으로 기대된다"며 "앞으로도 청년들의 안정적인 주거 사다리 구축을 위해 다양한 지원책을 마련하겠다"고 덧붙였다.`
  );

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<any>(null);

  const addLog = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp: time, message, type }]);
  };

  const handleRunTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSecret) {
      alert("관리자 비밀키(ADMIN_SECRET)를 입력해 주세요.");
      return;
    }
    if (!rawPressRelease.trim()) {
      alert("보도자료 원문을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setResult(null);
    setLogs([]);

    addLog("🚀 AI 자동 포스팅 및 연쇄 이메일 발송 작업을 개시합니다...", "info");
    addLog("🔒 관리자 보안 토큰 검증 단계 진행 중...", "info");

    try {
      // 1. API 호출
      addLog("📡 백엔드 API (/api/admin/auto-post)에 요청을 전달하는 중...", "info");
      
      const response = await fetch("/api/admin/auto-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminSecret.trim()}`
        },
        body: JSON.stringify({
          rawPressRelease,
          category
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "서버 에러가 발생했습니다.");
      }

      addLog("🟢 백엔드 요청 응답 수신 성공!", "success");

      if (data.isMock) {
        addLog("⚠️ [Mock 모드 감지] 서버에 필수 API 키가 설정되지 않아 로컬 시뮬레이션으로 수행되었습니다.", "warning");
        addLog("📝 AI 포스팅 가상 생성 성공!", "success");
        addLog(`📂 가상 포스트 생성: slug = ${data.post?.slug}`, "info");
        addLog(`✉️ 가상 이메일 방송 완료: 총 ${data.broadcastSummary?.totalSubscribers}명 발송`, "success");
      } else {
        addLog("✨ [실전 모드] Google Gemini 1.5 Flash가 보도자료를 성공적으로 분석했습니다!", "success");
        addLog(`📂 Supabase DB 저장 성공: slug = ${data.post?.slug}`, "success");
        addLog(`✉️ Resend 이메일 발송 완료: 총 ${data.broadcastSummary?.totalSubscribers}명 중 ${data.broadcastSummary?.sentCount}명 발송 성공!`, "success");
      }

      setResult(data);
      addLog("🎉 모든 태스크가 완벽히 종결되었습니다!", "success");

    } catch (err: any) {
      console.error(err);
      addLog(`❌ 치명적 오류 발생: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Dynamic Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-blue-500 tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              LifeFit Admin
            </Link>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
              AI Console v1.0
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            사용자 화면 가기
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Title Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent sm:text-4xl">
            AI 자동 포스팅 & 실시간 뉴스레터 연쇄 발송
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            정부의 신규 보도자료를 입력하면 AI가 SEO 최적화 블로그 가이드를 자동 제작하여 DB에 저장하고, 해당 카테고리 구독자 전원에게 뉴스레터를 즉시 발송합니다.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleRunTest} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
              {/* ADMIN_SECRET Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                  <Lock className="h-4 w-4 text-blue-400" />
                  관리자 보안 비밀키 (ADMIN_SECRET)
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="password"
                    required
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    placeholder="임시값: lifefit_admin_secret_key_2026_super_secure"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-100"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  * 로컬 테스트 시에는 <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-400 font-mono">.env.local</code>에 설정한 값을 입력해주세요.
                </p>
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                  <Database className="h-4 w-4 text-indigo-400" />
                  글 카테고리 선택
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-300"
                >
                  <option value="주거·복지">주거·복지 (housing)</option>
                  <option value="세금·복지">세금·복지 (tax)</option>
                  <option value="복지·육아">복지·육아 (welfare)</option>
                  <option value="목돈·자산">목돈·자산 (saving)</option>
                  <option value="자동차·채권">자동차·채권 (car)</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  * 선택된 카테고리를 관심사로 등록한 구독자에게만 이메일 알림이 매칭 전송됩니다.
                </p>
              </div>

              {/* Press Release Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  정부 보도자료 원본 텍스트
                </label>
                <textarea
                  required
                  rows={10}
                  value={rawPressRelease}
                  onChange={(e) => setRawPressRelease(e.target.value)}
                  placeholder="행정안전부, 보건복지부, 국세청 등의 공식 보도자료 텍스트를 그대로 붙여넣으세요..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-200 leading-relaxed font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    AI 엔진 요약 및 연쇄 알림 처리 중...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current text-white" />
                    AI 자동 포스팅 & 뉴스레터 일괄 발송 시작
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Logger & Results */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Logger */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 shadow-xl overflow-hidden flex flex-col h-[320px] font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-900 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
                    <TerminalIcon className="h-3 w-3 text-slate-400" />
                    LIFEFIT-AI-CONSOLE.log
                  </span>
                </div>
                {loading && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                )}
              </div>

              {/* Terminal Logs Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                {logs.length === 0 ? (
                  <div className="text-slate-600 italic h-full flex items-center justify-center">
                    대기 중... 관리자 비밀키 입력 후 작동 버튼을 클릭해 주세요.
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                      <span
                        className={
                          log.type === "success"
                            ? "text-emerald-400 font-bold"
                            : log.type === "warning"
                              ? "text-yellow-400"
                              : log.type === "error"
                                ? "text-rose-400 font-bold animate-pulse"
                                : "text-blue-300"
                        }
                      >
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Response result dashboard */}
            {result && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl animate-fadeIn space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-200">성공적으로 종결됨</h3>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">생성된 글 제목</span>
                    <span className="text-sm font-semibold text-slate-200 leading-snug">{result.post?.title}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">블로그 요약</span>
                    <span className="text-xs text-slate-400 leading-relaxed block mt-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
                      {result.post?.summary}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">카테고리</span>
                      <span className="text-xs font-semibold text-indigo-400 mt-0.5 block">{result.post?.category}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">발행 날짜</span>
                      <span className="text-xs font-semibold text-slate-300 mt-0.5 block">{result.post?.date}</span>
                    </div>
                  </div>

                  {/* Broadcast Stats */}
                  <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4">
                    <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2.5">
                      <Mail className="h-3.5 w-3.5 text-blue-400" />
                      실시간 메일 알림 배포 요약
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800/50">
                        <div className="text-[10px] text-slate-500">전체 구독자</div>
                        <div className="text-sm font-extrabold text-slate-300 mt-0.5">
                          {result.broadcastSummary?.totalSubscribers}명
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800/50">
                        <div className="text-[10px] text-slate-500 text-emerald-500/90">발송 성공</div>
                        <div className="text-sm font-extrabold text-emerald-400 mt-0.5">
                          {result.broadcastSummary?.sentCount}명
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800/50">
                        <div className="text-[10px] text-slate-500 text-rose-500/90">실패/제외</div>
                        <div className="text-sm font-extrabold text-rose-400 mt-0.5">
                          {result.isMock ? 0 : (result.broadcastSummary?.failedCount ?? 0)}명
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <Link
                      href={`/posts/${result.post?.slug}`}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-4 py-2.5 text-xs font-bold transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      작성된 AI 블로그 가이드 즉시 보러가기
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

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
  Home,
  Search,
  ChevronRight,
  Send,
  Loader2
} from "lucide-react";

interface LogEntry {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [authError, setAuthError] = useState("");
  const [category, setCategory] = useState("주거·복지");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [sendNotification, setSendNotification] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchedNews, setSearchedNews] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<any>(null);

  const addLog = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp: time, message, type }]);
  };

  // 0. 비밀키 서버 검증
  const handleVerifyPasskey = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!adminSecret.trim()) return;

    setVerifying(true);
    setAuthError("");

    try {
      const response = await fetch("/api/admin/verify-passkey", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminSecret.trim()}`
        }
      });

      if (response.ok) {
        setIsAuthorized(true);
      } else {
        setAuthError("비밀키가 일치하지 않습니다. 다시 확인해 주세요.");
      }
    } catch (err) {
      setAuthError("서버와의 통신에 실패했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  // 1. AI 뉴스 서치
  const handleSearchNews = async () => {
    setSearching(true);
    setResult(null);
    setSearchedNews(null);
    setLogs([]);

    addLog(`🔍 [${category}] 관련 최신 정책 및 뉴스를 AI가 서치 중입니다...`, "info");

    try {
      const response = await fetch("/api/admin/search-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminSecret}`
        },
        body: JSON.stringify({ category, model: selectedModel })
      });

      if (response.status === 401) {
        setIsAuthorized(false);
        throw new Error("세션이 만료되었거나 비밀키가 올바르지 않습니다.");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setSearchedNews(data.news);
      addLog("✨ AI가 적절한 정책 보도자료 초안을 찾아냈습니다. 아래에서 검토해 주세요.", "success");
    } catch (err: any) {
      addLog(`❌ 서치 실패: ${err.message}`, "error");
    } finally {
      setSearching(false);
    }
  };

  // 1.5 API 모델 리스트 상태 진단
  const handleDiagnoseModels = async () => {
    setLogs([]);
    addLog("🔍 현재 API 키로 사용 가능한 Google Gemini 모델 목록을 조회 중입니다...", "info");

    try {
      const response = await fetch("/api/admin/list-models", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${adminSecret}`
        }
      });

      if (response.status === 401) {
        setIsAuthorized(false);
        throw new Error("세션이 만료되었거나 비밀키가 올바르지 않습니다.");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "모델 목록 조회 실패");

      if (data.models && data.models.length > 0) {
        addLog("✨ 사용 가능한 모델 목록 조회가 성공했습니다!", "success");
        data.models.forEach((m: any) => {
          const name = m.name.replace("models/", "");
          const status = m.supportedGenerationMethods.includes("generateContent") ? "🟢 지원됨" : "🔴 미지원";
          addLog(`- ${name} (${status})`, "info");
        });
      } else {
        addLog("⚠️ 사용 가능한 모델 목록이 비어 있습니다.", "warning");
      }
    } catch (err: any) {
      addLog(`❌ 진단 실패: ${err.message}`, "error");
    }
  };

  // 2. 포스팅 및 메일 발송 실행
  const handleRunAutomation = async () => {
    if (!searchedNews) return;

    setLoading(true);
    setResult(null);
    setLogs([]);

    const startMsg = sendNotification
      ? "🚀 승인된 내용을 바탕으로 AI 자동 포스팅 및 뉴스레터 발송을 시작합니다..."
      : "🚀 승인된 내용을 바탕으로 AI 자동 포스팅을 시작합니다...";
    addLog(startMsg, "info");

    try {
      const response = await fetch("/api/admin/auto-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminSecret}`
        },
        body: JSON.stringify({
          rawPressRelease: searchedNews.content,
          category,
          model: selectedModel,
          sendNotification: sendNotification
        })
      });

      if (response.status === 401) {
        setIsAuthorized(false);
        throw new Error("비밀키 인증에 실패했습니다.");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      if (data.isMock) {
        addLog("⚠️ [Mock 모드] API 키 미설정으로 시뮬레이션 완료", "warning");
      } else {
        addLog(`📂 포스팅 완료: ${data.post?.slug}`, "success");
        if (sendNotification) {
          addLog(`✉️ 메일 발송 완료: ${data.broadcastSummary?.sentCount}명`, "success");
        }
      }

      setResult(data);
      addLog("🎉 모든 프로세스가 성공적으로 종결되었습니다!", "success");
    } catch (err: any) {
      addLog(`❌ 작업 실패: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // 인증 전 화면 (Password Gate)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 selection:bg-blue-600 selection:text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="w-full max-w-[400px] relative">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500 mb-4 shadow-2xl shadow-blue-500/20">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight italic flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-400" />
              LifeFit Admin
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">관리자 전용 콘솔 접속을 위해 비밀키를 입력하세요.</p>
          </div>
          <form onSubmit={handleVerifyPasskey} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Security Passkey</label>
              <input
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="ADMIN_SECRET 입력"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-sm text-white placeholder-slate-700 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                autoFocus
                required
              />
              {authError && <p className="text-[11px] text-rose-500 font-bold ml-1 animate-shake">{authError}</p>}
            </div>
            <button 
              type="submit"
              disabled={verifying}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 active:scale-[0.98] transition-all transform disabled:opacity-50"
            >
              {verifying ? <Loader2 size={18} className="animate-spin" /> : <TerminalIcon size={18} />}
              콘솔 접속하기
            </button>
            <Link href="/" className="block text-center text-xs text-slate-500 hover:text-slate-400 transition-colors pt-2">← 메인 페이지로 돌아가기</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-blue-500 tracking-tight flex items-center gap-2 italic">
              <Sparkles className="h-5 w-5 text-blue-400" /> LifeFit Admin
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
            <Home className="h-3.5 w-3.5" /> 사용자 화면 가기
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent sm:text-4xl">
            AI 정책 자동 큐레이션 시스템
          </h1>
          <p className="mt-2 text-sm text-slate-400">카테고리를 선택하고 AI를 통해 최신 정책 뉴스를 서치한 후, 승인 시 즉시 포스팅 및 뉴스레터 발송이 진행됩니다.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Control Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">글 카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-300"
                  >
                    <option value="주거·복지">🏠 주거·복지 (housing)</option>
                    <option value="세금·복지">💵 세금·복지 (tax)</option>
                    <option value="복지·육아">👶 복지·육아 (welfare)</option>
                    <option value="목돈·자산">📈 목돈·자산 (saving)</option>
                    <option value="자동차·채권">🚗 자동차·채권 (car)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">AI 모델 선택</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-300"
                  >
                    <option value="gemini-2.5-flash">🟢 Gemini 2.5 Flash (안정적/권장)</option>
                    <option value="gemini-3.5-flash">⚡ Gemini 3.5 Flash (최신/에이전트 특화)</option>
                    <option value="gemini-1.5-pro">💎 Gemini 1.5 Pro (고성능 코어 분석)</option>
                    <option value="gemini-2.5-pro">🔥 Gemini 2.5 Pro (최상위 추론 성능)</option>
                  </select>
                </div>

                <button
                  onClick={handleSearchNews}
                  disabled={searching || loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-4 text-sm font-bold text-slate-900 shadow-lg hover:bg-white disabled:opacity-50 transition-all transform active:scale-[0.98]"
                >
                  {searching ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  AI 최신 뉴스 및 정책 서치하기
                </button>
              </div>

              {/* Terminal Logger */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 shadow-xl overflow-hidden flex flex-col h-[280px] font-mono text-[10px]">
                <div className="px-3 py-2 border-b border-slate-900 bg-slate-900/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-slate-600 font-bold uppercase tracking-tighter">System Console</span>
                  </div>
                  <button 
                    onClick={handleDiagnoseModels}
                    className="text-[9px] bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-blue-400 font-bold px-2 py-0.5 rounded transition-all cursor-pointer"
                  >
                    API 모델 진단
                  </button>
                </div>
                <div className="p-3 flex-1 overflow-y-auto space-y-1">
                  {logs.map((log, i) => (
                    <div key={i}><span className="text-slate-700 mr-1.5">[{log.timestamp}]</span>
                    <span className={log.type === "success" ? "text-emerald-500" : log.type === "error" ? "text-rose-500" : "text-blue-400"}>{log.message}</span></div>
                  ))}
                  {logs.length === 0 && <div className="text-slate-800 italic">명령 대기 중...</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Review & Result Panel */}
          <div className="lg:col-span-7 space-y-6">
            {searchedNews ? (
              <div className="rounded-2xl border border-blue-500/30 bg-blue-600/5 p-6 backdrop-blur-xl shadow-xl animate-fadeIn space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    <h3 className="font-bold text-slate-200">AI 서치 결과 초안</h3>
                  </div>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Review Required</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">추출된 제목</label>
                    <div className="text-lg font-bold text-slate-100 leading-snug">{searchedNews.title}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">정책 내용 (Source Content)</label>
                    <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl text-sm text-slate-400 leading-relaxed max-h-[300px] overflow-y-auto font-sans whitespace-pre-wrap">
                      {searchedNews.content}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold uppercase text-[9px] bg-slate-800 px-1.5 py-0.5 rounded">출처</span>
                    {searchedNews.source}
                  </div>

                  {/* Notification Toggle Checkbox */}
                  <div className="flex items-center gap-2.5 bg-slate-950/40 p-4 rounded-xl border border-slate-800 mt-2 hover:border-slate-700/80 transition-colors">
                    <input
                      type="checkbox"
                      id="sendNotification"
                      checked={sendNotification}
                      onChange={(e) => setSendNotification(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950 cursor-pointer"
                    />
                    <label htmlFor="sendNotification" className="text-xs text-slate-300 font-semibold cursor-pointer select-none flex-1">
                      📢 포스팅 등록 시 구독자 알림 이메일 발송하기
                    </label>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={handleRunAutomation}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all active:scale-[0.98]"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      이 내용으로 포스팅 등록하기
                    </button>
                    <button
                      onClick={() => setSearchedNews(null)}
                      disabled={loading}
                      className="px-4 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            ) : result ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-600/5 p-6 backdrop-blur-xl shadow-xl animate-fadeIn space-y-6">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 size={24} />
                  <h3 className="text-xl font-bold">배포가 완료되었습니다!</h3>
                </div>
                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-slate-200">{result.post?.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">{result.post?.summary}</div>
                </div>
                <Link
                  href={`/posts/${result.post?.slug}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-white"
                >
                  <ExternalLink size={16} /> 작성된 가이드 확인하기
                </Link>
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-600">
                <FileText size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">왼쪽에서 카테고리를 선택하고</p>
                <p className="text-sm font-medium">뉴스 서치를 시작해 주세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

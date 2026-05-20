import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | LifeFit",
  description:
    "요청하신 페이지를 찾을 수 없습니다. LifeFit 메인 페이지에서 복지 혜택 계산기와 정책 가이드를 확인하세요.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="mb-6 text-6xl font-extrabold text-gray-200">404</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mb-8 text-base text-gray-500">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          메인 페이지로 이동하기
        </Link>
      </div>
    </div>
  );
}

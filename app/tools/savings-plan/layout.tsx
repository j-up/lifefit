import { Metadata } from "next";

export const metadata: Metadata = {
  title: "적금 선납이연 계산기 | LifeFit",
  description: "6-1-5, 1-11, 6-6 등 다양한 적금 선납이연 방식에 따른 이자 수익을 비교하고 정확한 입금 일정을 확인하세요.",
  keywords: ["선납이연", "적금계산기", "6-1-5", "1-11", "6-6", "재테크", "이자계산기"],
  openGraph: {
    title: "적금 선납이연 계산기 | LifeFit",
    description: "가장 유리한 적금 입금 계획을 세우고 이자를 극대화하세요.",
    images: [{ url: "/og-default.png" }],
  },
};

export default function SavingsPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

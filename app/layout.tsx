import type { Metadata } from "next";
import "./shell.css";

export const metadata: Metadata = {
  title: "박주현 · 김소연 결혼합니다",
  description: "2026년 11월 21일 토요일 오전 10시 30분, 오드힐하우스",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

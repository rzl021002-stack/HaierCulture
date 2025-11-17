import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "海尔文化展 | Haier Culture Exhibition",
  description: "海尔企业文化的数字化展厅，展示七大战略阶段和文化价值观",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-slate-900 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

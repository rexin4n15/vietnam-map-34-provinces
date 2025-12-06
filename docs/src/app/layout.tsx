import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Vietnam Map 34 Provinces - Documentation",
  description: "Bản đồ Việt Nam với 34 tỉnh/thành phố và 3,321 xã/phường theo QĐ 19/2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased text-slate-200`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <footer className="text-center py-8 text-slate-400 text-sm mt-16">
          <p>Made with ❤️ by <a href="https://github.com/xdev-asia-labs" className="text-sky-400 hover:underline">xdev-asia-labs</a></p>
          <p className="mt-1">Data source: <a href="https://github.com/phucanhle/vn-xaphuong-2025" target="_blank" className="text-sky-400 hover:underline">QĐ 19/2025/QĐ-TTg</a></p>
        </footer>
      </body>
    </html>
  );
}

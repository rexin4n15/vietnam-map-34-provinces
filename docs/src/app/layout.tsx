import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    template: '%s | Vietnam Map 34 Provinces',
    default: 'Vietnam Map 34 Provinces - Bản đồ Hành chính Việt Nam 2025',
  },
  description: "Bản đồ Việt Nam tương tác với 34 tỉnh/thành phố và 3,321 xã/phường theo QĐ 19/2025. Thư viện React Components hỗ trợ Drilldown, Highcharts và TypeScript.",
  keywords: ["vietnam map", "bản đồ việt nam", "34 tỉnh thành", "quyết định 19/2025", "react map component", "highcharts vietnam"],
  authors: [{ name: "xdev-asia-labs" }],
  creator: "xdev-asia-labs",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗺️</text></svg>",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vietnam-map-34-provinces.vercel.app",
    title: "Vietnam Map 34 Provinces - Bản đồ Hành chính Việt Nam 2025",
    description: "Bản đồ Việt Nam tương tác với 34 tỉnh/thành phố và 3,321 xã/phường theo QĐ 19/2025. Hỗ trợ React, TypeScript và Drilldown.",
    siteName: "Vietnam Map 34 Provinces",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnam Map 34 Provinces",
    description: "Bản đồ Việt Nam tương tác với 34 tỉnh/thành phố và 3,321 xã/phường mới nhất.",
  }
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

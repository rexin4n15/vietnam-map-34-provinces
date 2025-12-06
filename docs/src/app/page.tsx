import Link from "next/link";
import { getStats } from "@/lib/provinces";

export default function HomePage() {
  const stats = getStats();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center py-16">
        <div className="flex justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
            v1.0.0
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
            QĐ 19/2025
          </span>
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Vietnam Map 34 Provinces
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Interactive map component với {stats.total} tỉnh/thành phố và {stats.totalCommunes.toLocaleString()} xã/phường
          theo cấu trúc hành chính mới.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs/vanilla"
            className="px-6 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600"
          >
            Get Started →
          </Link>
          <a
            href="https://github.com/xdev-asia-labs/vietnam-map-34-provinces"
            target="_blank"
            className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: stats.total, label: "Tỉnh/TP" },
          { value: stats.cities, label: "TP Trực thuộc TW" },
          { value: stats.merged, label: "Đã hợp nhất" },
          { value: stats.totalCommunes.toLocaleString(), label: "Xã/Phường" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-sky-400">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🗺️",
              title: "34 Provinces",
              desc: "Data chuẩn theo QĐ 19/2025 với mã BNV + TMS",
            },
            {
              icon: "📍",
              title: "3,321 Communes",
              desc: "Danh sách xã/phường mới sau sáp nhập",
            },
            {
              icon: "⚡",
              title: "Framework Agnostic",
              desc: "Vanilla JS, React, Vue, Angular",
            },
            {
              icon: "🔍",
              title: "Drilldown",
              desc: "Click vào tỉnh để xem danh sách xã",
            },
            {
              icon: "📦",
              title: "TypeScript",
              desc: "Full type support với interfaces",
            },
            {
              icon: "🎨",
              title: "Customizable",
              desc: "Colors, styles, tooltips, labels",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Install */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Quick Install</h2>
        <div className="max-w-lg mx-auto bg-slate-800 rounded-lg p-4 font-mono text-sm">
          <span className="text-slate-500">$</span>{" "}
          <span className="text-green-400">npm install</span>{" "}
          <span className="text-sky-400">@xdev-asia/vietnam-map-34-provinces</span>{" "}
          <span className="text-sky-400">highcharts</span>
        </div>
      </section>

      {/* Docs Links */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Documentation</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { href: "/docs/vanilla", label: "Vanilla JS", color: "yellow" },
            { href: "/docs/react", label: "React", color: "cyan" },
            { href: "/docs/vue", label: "Vue", color: "green" },
            { href: "/docs/angular", label: "Angular", color: "red" },
          ].map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-sky-500/50 transition-colors"
            >
              <div className="font-semibold">{doc.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

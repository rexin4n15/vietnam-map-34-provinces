import Link from "next/link";
import { getStats } from "@/lib/provinces";
import { CodeBlock } from "@/components/CodeBlock";

export default function HomePage() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Updated for Administrative Division 2025
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Interactive Vietnam Map <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-blue-500">
              for React Applications
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A premium, high-performance React component implementing the new <strong>34 provinces</strong> structure.
            Drilldown support for <strong>{stats.totalCommunes.toLocaleString()}</strong> communes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/docs/react"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all text-center"
            >
              Get Started
            </Link>
            <div className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-800/50 border border-white/10 text-slate-300 font-mono text-sm flex items-center justify-center gap-3 hover:bg-slate-800/80 transition-colors cursor-copy group">
              <span className="text-slate-500 select-none">$</span>
              npm install @xdev-asia/vietnam-map-34-provinces
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12">
            {[
              { value: stats.total, label: "New Provinces" },
              { value: "3,321", label: "Communes" },
              { value: "React 18+", label: "Compatible" },
              { value: "100%", label: "TypeScript" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-32 bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Simple Integration</h2>
            <p className="text-slate-400 text-lg">
              Just import the component and pass your data. We handle the complex localized topology,
              merge logic (QĐ 19/2025), and drilldown interactions automatically.
            </p>
            <ul className="space-y-3">
              {[
                "Automatic QĐ 19/2025 province merging",
                "Built-in Drilldown to Commune level",
                "Fully typed with TypeScript",
                "Customizable styles & tooltips"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-sky-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-xs text-slate-500 ml-2">App.tsx</span>
              </div>
              <CodeBlock
                language="tsx"
                code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

export default function Dashboard() {
  return (
    <div className="h-[600px] bg-slate-900 rounded-xl">
      <VietnamMap 
        onProvinceClick={(p) => console.log(p)}
        colorAxis={{
          minColor: '#1e293b',
          maxColor: '#0ea5e9'
        }}
      />
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "34 New Provinces",
              desc: "Accurate geography based on the latest NQ 60-NQ/TW and QĐ 19/2025 administrative reforms.",
              gradient: "from-purple-500/20 to-blue-500/20",
              border: "group-hover:border-purple-500/50"
            },
            {
              title: "High Performance",
              desc: "Optimized GeoJSON rendering using Highcharts engine for smooth 60fps interactions.",
              gradient: "from-blue-500/20 to-teal-500/20",
              border: "group-hover:border-sky-500/50"
            },
            {
              title: "Data Drilldown",
              desc: "Interactive drilldown from province to commune level with no extra configuration needed.",
              gradient: "from-teal-500/20 to-green-500/20",
              border: "group-hover:border-teal-500/50"
            }
          ].map((card, i) => (
            <div key={i} className={`group relative p-1 rounded-2xl bg-linear-to-br ${card.gradient} bg-opacity-0 transition-all duration-500`}>
              <div className={`h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 transition-colors ${card.border}`}>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

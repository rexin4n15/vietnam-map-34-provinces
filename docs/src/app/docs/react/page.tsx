import { CodeBlock } from "@/components/CodeBlock";

export default function ReactDocsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    React
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">React Integration</h1>
                <p className="text-slate-400">Hướng dẫn sử dụng component VietnamMap với React 18+</p>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📦 Installation</h2>
                <CodeBlock
                    language="bash"
                    code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts highcharts-react-official`}
                />
                <div className="mt-4 p-4 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sm">
                    <strong>Note:</strong> React wrapper yêu cầu thêm <code>react</code>, <code>react-dom</code>,
                    <code>highcharts-react-official</code>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🚀 Basic Usage</h2>
                <CodeBlock
                    language="tsx"
                    code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function App() {
  return (
    <div style={{ height: '600px' }}>
      <VietnamMap />
    </div>
  );
}

export default App;`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">⚙️ With Props</h2>
                <CodeBlock
                    language="tsx"
                    code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function App() {
  const handleProvinceClick = (province) => {
    console.log('Clicked:', province.name);
  };

  return (
    <VietnamMap
      height={600}
      data={[
        { 'hc-key': 'vn-new-ha-noi', value: 5000 },
        { 'hc-key': 'vn-new-ho-chi-minh', value: 8000 }
      ]}
      onProvinceClick={handleProvinceClick}
      showLabels={true}
      showZoomControls={true}
    />
  );
}`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🔧 Using Core Utilities</h2>
                <CodeBlock
                    language="tsx"
                    code={`import { useState, useEffect } from 'react';
import { 
  getProvinceCommunes, 
  getProvinceStats,
  NEW_34_PROVINCES 
} from '@xdev-asia/vietnam-map-34-provinces/core';

function ProvinceStats() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const s = getProvinceStats();
    setStats(s);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <p>Total provinces: {stats.totalProvinces}</p>
      <p>Total communes: {stats.totalCommunes}</p>
      <p>Largest: {stats.largestProvince.name}</p>
    </div>
  );
}`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📋 Props Reference</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Prop</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Default</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { prop: "data", type: "array", def: "-", desc: "Province data array" },
                                { prop: "height", type: "number", def: "500", desc: "Chart height in px" },
                                { prop: "showLabels", type: "boolean", def: "true", desc: "Show province labels" },
                                { prop: "showZoomControls", type: "boolean", def: "true", desc: "Show zoom buttons" },
                                { prop: "onProvinceClick", type: "function", def: "-", desc: "Click callback" },
                                { prop: "onProvinceHover", type: "function", def: "-", desc: "Hover callback" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5">
                                    <td className="py-3 px-4"><code>{row.prop}</code></td>
                                    <td className="py-3 px-4 text-slate-400">{row.type}</td>
                                    <td className="py-3 px-4 text-slate-400">{row.def}</td>
                                    <td className="py-3 px-4 text-slate-400">{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                <a href="/docs/vanilla" className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">
                    ← Vanilla JS
                </a>
                <a href="/docs/vue" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
                    Vue.js →
                </a>
            </div>
        </div>
    );
}

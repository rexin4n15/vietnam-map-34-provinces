import { CodeBlock } from "@/components/CodeBlock";

export default function ReactDocsPage() {
  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              React 18+
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
              TypeScript
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            Tích hợp React
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Hướng dẫn đầy đủ cách sử dụng component Bản đồ Việt Nam trong ứng dụng React với đầy đủ type safety và hỗ trợ hooks.
          </p>
        </header>

        <div className="space-y-16">
          {/* Installation */}
          <section id="installation" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">01</span>
              Cài đặt
            </h2>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <CodeBlock
                language="bash"
                code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts highcharts-react-official`}
              />
              <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/10 text-green-200/80 text-sm flex gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                <p>
                  Thư viện yêu cầu <code>highcharts</code> và <code>highcharts-react-official</code> là peer dependencies.
                  Đảm bảo bạn đã cài đặt React 18 trở lên.
                </p>
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section id="usage" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">02</span>
              Sử dụng Cơ bản
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-slate-400 leading-relaxed">
                  Import component <code>VietnamMap</code> và đặt vào ứng dụng của bạn.
                  Bản đồ tự động xử lý topology 34 tỉnh thành và trạng thái loading.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>Responsive chiều cao/chiều rộng</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>Tự động fill container</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-xs font-mono text-slate-500">SimpleExample.tsx</div>
                <CodeBlock
                  language="tsx"
                  code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

export default function App() {
  return (
    <div style={{ height: '600px' }}>
      <VietnamMap />
    </div>
  );
}`}
                />
              </div>
            </div>
          </section>

          {/* Interactive Props */}
          <section id="props" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">03</span>
              Tương tác & Props
            </h2>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-1 backdrop-blur-sm">
              <CodeBlock
                language="tsx"
                code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function InteractiveMap() {
  return (
    <VietnamMap
      height={600}
      data={[
        { 'hc-key': 'vn-new-ha-noi', value: 5000 },
        { 'hc-key': 'vn-new-ho-chi-minh', value: 8000 }
      ]}
      onProvinceClick={(province) => {
        console.log('Đã chọn:', province.name);
      }}
      colorAxis={{
        minColor: '#e0f2fe',
        maxColor: '#0284c7'
      }}
    />
  );
}`}
              />
            </div>
          </section>

          {/* Hooks & Utils */}
          <section id="hooks" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">04</span>
              Core Utilities
            </h2>
            <div className="grid gap-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Truy xuất Dữ liệu trực tiếp</h3>
                <p className="text-slate-400 mb-4">
                  Bạn có thể truy xuất dữ liệu thô của tỉnh và xã thông qua các tiện ích core.
                  Hữu ích để xây dựng giao diện tìm kiếm hoặc danh sách tùy chỉnh.
                </p>
                <CodeBlock
                  language="tsx"
                  code={`import { 
  getProvinceStats,
  searchCommunes,
  NEW_34_PROVINCES 
} from '@xdev-asia/vietnam-map-34-provinces/core';

// 1. Lấy thống kê
const stats = getProvinceStats();
console.log(\`Tổng số xã: \${stats.totalCommunes}\`);

// 2. Tìm kiếm xã phường
const results = searchCommunes('Ba Đình');

// 3. Danh sách tất cả tỉnh thành
const hcm = NEW_34_PROVINCES.find(p => p.code === '29'); // Mã TP.HCM Mới`}
                />
              </div>
            </div>
          </section>

          {/* Props Table */}
          <section id="api" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-white">API Reference</h2>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-300 font-medium">
                  <tr>
                    <th className="py-4 px-6">Prop</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Default</th>
                    <th className="py-4 px-6">Mô tả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { prop: "data", type: "array", def: "[]", desc: "Mảng dữ liệu khớp với 'hc-key'" },
                    { prop: "height", type: "number | string", def: "600", desc: "Chiều cao của container bản đồ" },
                    { prop: "showZoomControls", type: "boolean", def: "true", desc: "Hiển thị nút zoom +/-" },
                    { prop: "onProvinceClick", type: "(p) => void", def: "-", desc: "Callback khi click vào tỉnh" },
                    { prop: "colorAxis", type: "object", def: "-", desc: "Cấu hình dải màu Highcharts" },
                    { prop: "options", type: "object", def: "-", desc: "Ghi đè cấu hình Highcharts gốc" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-mono text-sky-300">{row.prop}</td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">{row.type}</td>
                      <td className="py-4 px-6 text-slate-500 font-mono text-xs">{row.def}</td>
                      <td className="py-4 px-6 text-slate-300">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

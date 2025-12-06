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

          {/* Custom Data */}
          <section id="custom-data" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">04</span>
              Custom Data & Tooltip
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Hiển thị dữ liệu riêng cho từng tỉnh</h3>
                <p className="text-slate-400 mb-4">
                  Truyền data với bất kỳ fields nào bạn muốn. Tất cả custom fields sẽ được pass vào tooltipFormatter và onProvinceClick.
                </p>
                <CodeBlock
                  language="tsx"
                  code={`function CustomDataMap() {
  const provinceData = [
    {
      name: 'Hà Nội',
      value: 8500000,
      population: 8500000,
      area: 3344,
      gdp: 150000,
      hospitals: 120,
      universities: 85
    },
    {
      name: 'Hồ Chí Minh',
      value: 9000000,
      population: 9000000,
      area: 9650,
      gdp: 280000,
      hospitals: 200,
      universities: 95
    }
    // ... các tỉnh khác
  ];

  return (
    <VietnamMap
      data={provinceData}
      tooltipFormatter={(point) => \`
        <div style="padding: 12px; min-width: 220px;">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">
            📍 \${point.name}
          </div>
          <table style="width: 100%; font-size: 12px;">
            <tr>
              <td>Dân số:</td>
              <td style="text-align: right;"><b>\${point.population?.toLocaleString()}</b></td>
            </tr>
            <tr>
              <td>Diện tích:</td>
              <td style="text-align: right;"><b>\${point.area} km²</b></td>
            </tr>
            <tr>
              <td>GDP:</td>
              <td style="text-align: right;"><b>\${point.gdp?.toLocaleString()} tỷ</b></td>
            </tr>
            <tr>
              <td>Bệnh viện:</td>
              <td style="text-align: right;"><b>\${point.hospitals}</b></td>
            </tr>
          </table>
        </div>
      \`}
      onProvinceClick={(province) => {
        console.log('Province data:', province);
        // province chứa tất cả custom fields
      }}
    />
  );
}`}
                />
              </div>
            </div>
          </section>

          {/* Load from API */}
          <section id="api-data" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">05</span>
              Load Data từ API
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Fetch và transform data</h3>
                <CodeBlock
                  language="tsx"
                  code={`import { useState, useEffect } from 'react';

function APIDataMap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/provinces/statistics');
        const apiData = await res.json();
        
        // Transform data
        const transformed = apiData.map(item => ({
          name: item.province_name,
          value: item.total_cases,
          activeCases: item.active,
          recovered: item.recovered,
          vaccinationRate: item.vaccination_rate
        }));
        
        setData(transformed);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <VietnamMap
      data={data}
      tooltipFormatter={(point) => \`
        <div>
          <b>\${point.name}</b><br/>
          Tổng ca: \${point.value}<br/>
          Đang điều trị: \${point.activeCases}<br/>
          Đã khỏi: \${point.recovered}
        </div>
      \`}
    />
  );
}`}
                />
              </div>
            </div>
          </section>

          {/* State Management */}
          <section id="state-management" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">06</span>
              State Management
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Kết hợp với Redux/Zustand</h3>
                <CodeBlock
                  language="tsx"
                  code={`// store/useMapStore.ts
import { create } from 'zustand';

export const useMapStore = create((set) => ({
  selectedProvince: null,
  data: [],
  setSelectedProvince: (province) => set({ selectedProvince: province }),
  setData: (data) => set({ data })
}));

// Component
function MapWithStore() {
  const { data, selectedProvince, setSelectedProvince } = useMapStore();

  return (
    <div className="grid grid-cols-2 gap-4">
      <VietnamMap
        data={data}
        onProvinceClick={setSelectedProvince}
      />
      {selectedProvince && (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{selectedProvince.name}</h2>
          <p>Dân số: {selectedProvince.population?.toLocaleString()}</p>
          <p>GDP: {selectedProvince.gdp?.toLocaleString()} tỷ</p>
        </div>
      )}
    </div>
  );
}`}
                />
              </div>
            </div>
          </section>

          {/* Hooks & Utils */}
          <section id="hooks" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">07</span>
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
  getProvinceCommunes,
  searchCommunes,
  getNewProvinceName,
  NEW_34_PROVINCES 
} from '@xdev-asia/vietnam-map-34-provinces/core';

// 1. Lấy thống kê tổng quan
const stats = getProvinceStats();
console.log(\`Tổng số xã: \${stats.totalCommunes}\`);
console.log(\`Tỉnh lớn nhất: \${stats.largestProvince.name}\`);

// 2. Lấy danh sách xã/phường của tỉnh
const communes = getProvinceCommunes('Hà Nội');
console.log(\`Hà Nội có \${communes.length} xã/phường\`);

// 3. Tìm kiếm xã phường
const results = searchCommunes('Ba Đình');
// [{ province: 'Hà Nội', commune: { code: 10101003, name: 'Phường Ba Đình' } }]

// 4. Convert tên tỉnh cũ sang mới
const newName = getNewProvinceName('Hà Giang'); // → "Tuyên Quang"

// 5. Danh sách tất cả tỉnh thành
const hcm = NEW_34_PROVINCES.find(p => p.code === '29');`}
                />
              </div>
            </div>
          </section>

          {/* TypeScript */}
          <section id="typescript" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">08</span>
              TypeScript Support
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Type-safe với custom data</h3>
                <CodeBlock
                  language="tsx"
                  code={`import type { ProvinceData } from '@xdev-asia/vietnam-map-34-provinces/react';

// Define custom interface
interface HealthcareData extends ProvinceData {
  name: string;
  value: number;
  hospitals: number;
  doctors: number;
  beds: number;
}

function TypedMap() {
  const [data, setData] = useState<HealthcareData[]>([]);
  
  const handleClick = (province: HealthcareData) => {
    // TypeScript biết province có field hospitals, doctors, beds
    console.log(\`\${province.name} có \${province.hospitals} bệnh viện\`);
  };
  
  return (
    <VietnamMap
      data={data}
      onProvinceClick={handleClick}
      tooltipFormatter={(point: HealthcareData) => \`
        <div>
          <b>\${point.name}</b><br/>
          Bệnh viện: \${point.hospitals}<br/>
          Bác sĩ: \${point.doctors}<br/>
          Giường bệnh: \${point.beds}
        </div>
      \`}
    />
  );
}`}
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
                    { prop: "data", type: "any[]", def: "-", desc: "Dữ liệu cho từng tỉnh với name, value và custom fields" },
                    { prop: "height", type: "number | string", def: "600", desc: "Chiều cao của container bản đồ" },
                    { prop: "showLabels", type: "boolean", def: "true", desc: "Hiển thị tên tỉnh trên bản đồ" },
                    { prop: "showZoomControls", type: "boolean", def: "true", desc: "Hiển thị nút zoom +/-" },
                    { prop: "enableDrilldown", type: "boolean", def: "true", desc: "Cho phép click để xem cấp xã/phường" },
                    { prop: "tooltipFormatter", type: "(point) => string", def: "-", desc: "Custom tooltip, nhận point data return HTML" },
                    { prop: "onProvinceClick", type: "(province) => void", def: "-", desc: "Callback khi click vào tỉnh" },
                    { prop: "hoverColor", type: "string", def: "#fbbf24", desc: "Màu sắc khi hover" },
                    { prop: "borderColor", type: "string", def: "#ffffff", desc: "Màu viền giữa các tỉnh" },
                    { prop: "colorAxis", type: "ColorAxisOptions", def: "-", desc: "Cấu hình gradient màu (minColor, maxColor)" },
                    { prop: "className", type: "string", def: "-", desc: "CSS class cho container wrapper" },
                    { prop: "options", type: "Highcharts.Options", def: "-", desc: "Override toàn bộ config Highcharts" },
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
            <div className="mt-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sm text-sky-200">
              💡 <strong>Tip:</strong> Tất cả custom fields trong <code>data</code> sẽ được pass vào <code>tooltipFormatter</code> và <code>onProvinceClick</code>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">09</span>
              Best Practices
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Optimization</h3>
                <CodeBlock
                  language="tsx"
                  code={`import { useMemo, useCallback } from 'react';

function OptimizedMap({ rawData }) {
  // Memoize transformed data
  const mapData = useMemo(() => {
    return rawData.map(item => ({
      name: item.province_name,
      value: item.total,
      ...item
    }));
  }, [rawData]);
  
  // Memoize callbacks
  const handleClick = useCallback((province) => {
    console.log('Clicked:', province.name);
  }, []);
  
  const tooltipFormatter = useMemo(() => {
    return (point) => \`<div><b>\${point.name}</b>: \${point.value}</div>\`;
  }, []);

  return (
    <VietnamMap
      data={mapData}
      onProvinceClick={handleClick}
      tooltipFormatter={tooltipFormatter}
    />
  );
}`}
                />
              </div>

              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Error Handling</h3>
                <CodeBlock
                  language="tsx"
                  code={`function SafeMap({ data }) {
  const [error, setError] = useState(null);
  
  // Validate data
  const validatedData = useMemo(() => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
      }
      
      return data.filter(item => {
        if (!item.name || typeof item.value !== 'number') {
          console.warn('Invalid item:', item);
          return false;
        }
        return true;
      });
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [data]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return <VietnamMap data={validatedData} />;
}`}
                />
              </div>

              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Responsive Design</h3>
                <CodeBlock
                  language="tsx"
                  code={`function ResponsiveMap() {
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setHeight(400);
      } else if (window.innerWidth < 1024) {
        setHeight(500);
      } else {
        setHeight(600);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full">
      <VietnamMap
        height={height}
        showLabels={window.innerWidth >= 768}
      />
    </div>
  );
}`}
                />
              </div>
            </div>
          </section>

          {/* Next.js Integration */}
          <section id="nextjs" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-mono">10</span>
              Next.js Integration
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Dynamic Import (SSR disabled)</h3>
                <p className="text-slate-400 mb-4">
                  Highcharts cần chạy client-side. Sử dụng dynamic import với ssr: false
                </p>
                <CodeBlock
                  language="tsx"
                  code={`// app/map/page.tsx
'use client';

import dynamic from 'next/dynamic';

const VietnamMap = dynamic(
  () => import('@xdev-asia/vietnam-map-34-provinces/react').then(m => m.VietnamMap),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] flex items-center justify-center">
        Đang tải bản đồ...
      </div>
    )
  }
);

export default function MapPage() {
  return (
    <main>
      <h1>Bản đồ Việt Nam</h1>
      <VietnamMap height={600} />
    </main>
  );
}`}
                />
              </div>

              <div className="p-6 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Server-side Data Fetching</h3>
                <CodeBlock
                  language="tsx"
                  code={`// app/map/page.tsx
import dynamic from 'next/dynamic';

const VietnamMap = dynamic(
  () => import('@xdev-asia/vietnam-map-34-provinces/react').then(m => m.VietnamMap),
  { ssr: false }
);

export default async function MapPage() {
  // Fetch data server-side
  const data = await fetch('https://api.example.com/provinces', {
    next: { revalidate: 3600 } // Cache 1 hour
  }).then(r => r.json());

  return <VietnamMap data={data} height={600} />;
}`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

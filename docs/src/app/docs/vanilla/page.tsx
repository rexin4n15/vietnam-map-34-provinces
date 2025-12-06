import { CodeBlock } from "@/components/CodeBlock";

export default function VanillaDocsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    Vanilla JS
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">Vanilla JavaScript</h1>
                <p className="text-slate-400">Framework-agnostic - hoạt động với mọi project JavaScript</p>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📦 Installation</h2>

                <h3 className="font-semibold mt-6 mb-2">npm/yarn</h3>
                <CodeBlock
                    language="bash"
                    code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts`}
                />

                <h3 className="font-semibold mt-6 mb-2">CDN</h3>
                <CodeBlock
                    language="html"
                    code={`<script src="https://code.highcharts.com/maps/highmaps.js"></script>
<script src="https://code.highcharts.com/maps/modules/drilldown.js"></script>
<script src="https://unpkg.com/@xdev-asia/vietnam-map-34-provinces"></script>`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🚀 Quick Start</h2>
                <CodeBlock
                    language="javascript"
                    code={`import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

// Basic usage
const map = createVietnamMap('#container');

// With options
const map = createVietnamMap('#container', {
  height: 600,
  drilldown: { enabled: true },
  onProvinceClick: (province) => console.log(province)
});`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">⚙️ Full Options</h2>
                <CodeBlock
                    language="javascript"
                    code={`const map = createVietnamMap('#container', {
  // === DRILLDOWN ===
  drilldown: {
    enabled: true,
    onDrilldown: (province) => console.log('Viewing:', province.name),
    onDrillup: () => console.log('Back to country'),
    onLoading: (loading) => showSpinner(loading)
  },
  
  // === CALLBACKS ===
  onProvinceClick: (province) => handleClick(province),
  onProvinceHover: (province) => updateTooltip(province),
  onCommuneClick: (commune) => handleCommuneClick(commune),
  onReady: (instance) => console.log('Map ready!'),
  
  // === APPEARANCE ===
  height: 600,
  backgroundColor: 'transparent',
  
  colors: {
    min: '#E1F5FE',
    max: '#01579B',
    stops: [[0, '#E1F5FE'], [0.5, '#4FC3F7'], [1, '#01579B']]
  },
  
  style: {
    borderColor: '#ffffff',
    borderWidth: 0.5,
    hoverColor: '#fbbf24',
    hoverBorderColor: '#d97706'
  },
  
  dataLabels: {
    enabled: true,
    fontSize: '10px',
    color: '#1e293b'
  },
  
  tooltip: {
    enabled: true,
    backgroundColor: 'rgba(255,255,255,0.95)',
    formatter: (point) => \`<b>\${point.name}</b>: \${point.value}\`
  },
  
  // === DATA ===
  data: [
    { 'hc-key': 'vn-new-ha-noi', value: 5000 },
    { 'hc-key': 'vn-new-ho-chi-minh', value: 8000 }
  ],
  
  // === NAVIGATION ===
  navigation: true,
  doubleClickZoom: true
});`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🔧 Methods</h2>
                <CodeBlock
                    language="javascript"
                    code={`// Zoom to province
map.zoomToProvince('vn-new-ha-noi');

// Reset zoom
map.resetZoom();

// Update data
map.updateData([
  { 'hc-key': 'vn-new-ha-noi', value: 10000 }
]);

// Drilldown to province
await map.drilldownTo('Hà Nội');

// Return to country view
map.drillUp();

// Get current province
const current = map.getCurrentProvince();

// Destroy
map.destroy();`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📊 Core Utilities</h2>
                <CodeBlock
                    language="javascript"
                    code={`import { 
  NEW_34_PROVINCES,
  getProvinceStats,
  getProvinceCommunes,
  searchCommunes,
  getNewProvinceName
} from '@xdev-asia/vietnam-map-34-provinces/core';

// Get all provinces
console.log(NEW_34_PROVINCES);

// Get statistics
const stats = getProvinceStats();
console.log(stats.totalProvinces);  // 34
console.log(stats.totalCommunes);   // 3321

// Get communes for a province
const communes = getProvinceCommunes('Hà Nội');
console.log(communes.length); // 126

// Search communes
const results = searchCommunes('Ba Đình');
// [{ province: 'Hà Nội', commune: { code: 10101003, name: 'Phường Ba Đình' } }]

// Convert old province name to new
const newName = getNewProvinceName('Hà Giang');
console.log(newName); // 'Tuyên Quang'`}
                />
            </section>

            <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                <a href="/docs/angular" className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">
                    ← Angular
                </a>
                <a href="/docs/react" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
                    React →
                </a>
            </div>
        </div>
    );
}

import { CodeBlock } from "@/components/CodeBlock";

export default function VanillaDocsPage() {
    return (
        <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-16 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            Vanilla JS
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                            Framework-agnostic
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                        Vanilla JavaScript
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                        Sử dụng bản đồ Việt Nam với Vanilla JavaScript, không cần framework. Phù hợp cho jQuery, legacy projects, hoặc tích hợp vào các hệ thống có sẵn.
                    </p>
                </header>

                <div className="space-y-16">
                    {/* Installation */}
                    <section id="installation" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">01</span>
                            Cài đặt
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">NPM/Yarn</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts`}
                                />
                            </div>

                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">CDN (Script tags)</h3>
                                <CodeBlock
                                    language="html"
                                    code={`<!DOCTYPE html>
<html>
<head>
  <!-- Highcharts -->
  <script src="https://code.highcharts.com/maps/highmaps.js"></script>
  <script src="https://code.highcharts.com/maps/modules/drilldown.js"></script>
</head>
<body>
  <div id="map-container" style="height: 600px;"></div>
  
  <!-- Your bundle or UMD build -->
  <script src="path/to/vietnam-map.umd.js"></script>
  <script>
    // Code here
  </script>
</body>
</html>`}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Basic Usage */}
                    <section id="basic-usage" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">02</span>
                            Sử dụng cơ bản
                        </h2>
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                            <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-xs font-mono text-slate-500">main.js</div>
                            <CodeBlock
                                language="javascript"
                                code={`import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

// Tạo bản đồ
const map = createVietnamMap('#map-container', {
  height: 600,
  onProvinceClick: (province) => {
    console.log('Clicked:', province.name);
    alert('Bạn đã chọn: ' + province.name);
  }
});`}
                            />
                        </div>
                    </section>

                    {/* Custom Data */}
                    <section id="custom-data" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
                            Custom Data & Tooltip
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">Truyền dữ liệu tùy chỉnh</h3>
                                <CodeBlock
                                    language="javascript"
                                    code={`const provinceData = [
  {
    name: 'Hà Nội',
    value: 8500000,
    population: 8500000,
    area: 3344,
    gdp: 150000,
    hospitals: 120
  },
  {
    name: 'Hồ Chí Minh',
    value: 9000000,
    population: 9000000,
    area: 9650,
    gdp: 280000,
    hospitals: 200
  }
];

const map = createVietnamMap('#map-container', {
  data: provinceData,
  height: 600,
  tooltipFormatter: function(point) {
    return \`
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
    \`;
  }
});`}
                                />
                            </div>
                        </div>
                    </section>

                    {/* API Methods */}
                    <section id="api-methods" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">04</span>
                            API Methods
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">Update Data</h3>
                                <CodeBlock
                                    language="javascript"
                                    code={`// Tạo map instance
const map = createVietnamMap('#map-container');

// Update data sau khi fetch từ API
fetch('/api/provinces')
  .then(res => res.json())
  .then(data => {
    map.updateData(data);
  });`}
                                />
                            </div>

                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">Destroy Instance</h3>
                                <CodeBlock
                                    language="javascript"
                                    code={`// Cleanup khi không cần thiết
map.destroy();`}
                                />
                            </div>

                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4">Get Chart Instance</h3>
                                <CodeBlock
                                    language="javascript"
                                    code={`// Truy cập Highcharts instance
const chartInstance = map.getChart();

// Sử dụng Highcharts API
chartInstance.setTitle({ text: 'Bản đồ mới' });
chartInstance.exportChart({ type: 'image/png' });`}
                                />
                            </div>
                        </div>
                    </section>

                    {/* jQuery Integration */}
                    <section id="jquery" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">05</span>
                            jQuery Integration
                        </h2>
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <CodeBlock
                                language="javascript"
                                code={`$(document).ready(function() {
  // Tạo bản đồ
  const map = createVietnamMap('#map-container', {
    height: 600,
    onProvinceClick: function(province) {
      // Update UI với jQuery
      $('#province-name').text(province.name);
      $('#province-value').text(province.value.toLocaleString());
      $('#details-panel').fadeIn();
    }
  });

  // Load data với AJAX
  $.ajax({
    url: '/api/provinces',
    method: 'GET',
    success: function(data) {
      map.updateData(data);
    }
  });

  // Close details panel
  $('#close-details').click(function() {
    $('#details-panel').fadeOut();
  });
});`}
                            />
                        </div>
                    </section>

                    {/* Complete Example */}
                    <section id="complete-example" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">06</span>
                            Ví dụ hoàn chỉnh
                        </h2>
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                            <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-xs font-mono text-slate-500">index.html</div>
                            <CodeBlock
                                language="html"
                                code={`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bản đồ Việt Nam</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: white;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    #map-container {
      height: 600px;
      background: #1e293b;
      border-radius: 12px;
      overflow: hidden;
    }
    #details {
      margin-top: 20px;
      padding: 20px;
      background: #1e293b;
      border-radius: 12px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bản đồ Việt Nam - 34 Tỉnh Thành</h1>
    
    <div id="map-container"></div>
    
    <div id="details">
      <h2 id="province-name"></h2>
      <p>Dân số: <span id="population"></span></p>
      <p>GDP: <span id="gdp"></span> tỷ VNĐ</p>
      <button id="close">Đóng</button>
    </div>
  </div>

  <script src="https://code.highcharts.com/maps/highmaps.js"></script>
  <script src="https://code.highcharts.com/maps/modules/drilldown.js"></script>
  <script type="module">
    import { createVietnamMap } from './vietnam-map.esm.js';

    const map = createVietnamMap('#map-container', {
      height: 600,
      showLabels: true,
      enableDrilldown: true,
      onProvinceClick: (province) => {
        document.getElementById('province-name').textContent = province.name;
        document.getElementById('population').textContent = 
          province.population?.toLocaleString() || 'N/A';
        document.getElementById('gdp').textContent = 
          province.gdp?.toLocaleString() || 'N/A';
        document.getElementById('details').style.display = 'block';
      }
    });

    // Fetch data
    fetch('/api/provinces')
      .then(res => res.json())
      .then(data => map.updateData(data));

    document.getElementById('close').addEventListener('click', () => {
      document.getElementById('details').style.display = 'none';
    });
  </script>
</body>
</html>`}
                            />
                        </div>
                    </section>

                    {/* Configuration Options */}
                    <section id="options" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6 text-white">Configuration Options</h2>
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-slate-300 font-medium">
                                    <tr>
                                        <th className="py-4 px-6">Option</th>
                                        <th className="py-4 px-6">Type</th>
                                        <th className="py-4 px-6">Default</th>
                                        <th className="py-4 px-6">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { opt: "data", type: "array", def: "[]", desc: "Array of province data" },
                                        { opt: "height", type: "number", def: "600", desc: "Map container height" },
                                        { opt: "showLabels", type: "boolean", def: "true", desc: "Show province labels" },
                                        { opt: "enableDrilldown", type: "boolean", def: "true", desc: "Enable commune drilldown" },
                                        { opt: "tooltipFormatter", type: "function", def: "-", desc: "Custom tooltip function" },
                                        { opt: "onProvinceClick", type: "function", def: "-", desc: "Province click callback" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6 font-mono text-yellow-300">{row.opt}</td>
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

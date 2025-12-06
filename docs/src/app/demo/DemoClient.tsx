"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useCallback } from "react";
import { CodeBlock } from "@/components/CodeBlock";

// Import dynamically to avoid SSR issues with Highcharts
const VietnamMap = dynamic(
    () => import("@xdev-asia/vietnam-map-34-provinces/react").then((mod) => mod.VietnamMap),
    { ssr: false, loading: () => <div className="h-[600px] bg-slate-900 animate-pulse rounded-xl" /> }
);

export default function DemoPage() {
    const [selected, setSelected] = useState<any>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Map options state
    const [showLabels, setShowLabels] = useState(true);
    const [showZoomControls, setShowZoomControls] = useState(true);
    const [mapHeight, setMapHeight] = useState(600);

    const handleProvinceClick = useCallback((province: any) => {
        setSelected(province);
        if (detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            detailsRef.current.classList.add('ring-2', 'ring-sky-500');
            setTimeout(() => {
                detailsRef.current?.classList.remove('ring-2', 'ring-sky-500');
            }, 1000);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-10 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4 inline-block">
                        Live Demo
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 mb-4">
                        Bản đồ Hành chính Việt Nam 2025
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Trải nghiệm tương tác với bản đồ 34 tỉnh thành mới. Hỗ trợ drilldown xuống cấp xã/phường.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Map Container */}
                    <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-2 backdrop-blur-sm shadow-2xl relative">
                        <VietnamMap
                            height={mapHeight}
                            showLabels={showLabels}
                            showZoomControls={showZoomControls}
                            onProvinceClick={handleProvinceClick}
                            colorAxis={{
                                minColor: "#1e293b",
                                maxColor: "#0ea5e9",
                            }}
                        />

                        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-white/10 rounded-lg p-3 text-xs text-slate-400 max-w-[200px]">
                            <p className="mb-1 font-semibold text-white">Hướng dẫn:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Click vào tỉnh để xem chi tiết (Drilldown)</li>
                                <li>Sử dụng nút "◁ Back" để quay lại</li>
                                <li>Lăn chuột để Zoom</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6" ref={detailsRef}>
                        {/* Options Panel */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                                Tùy chọn bản đồ
                            </h3>

                            <div className="space-y-4">
                                {/* Show Labels Toggle */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                        Hiển thị tên tỉnh
                                    </span>
                                    <button
                                        onClick={() => setShowLabels(!showLabels)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${showLabels ? 'bg-sky-500' : 'bg-slate-600'
                                            }`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${showLabels ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </label>

                                {/* Show Zoom Controls Toggle */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                        Nút zoom (+/-)
                                    </span>
                                    <button
                                        onClick={() => setShowZoomControls(!showZoomControls)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${showZoomControls ? 'bg-sky-500' : 'bg-slate-600'
                                            }`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${showZoomControls ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </button>
                                </label>

                                {/* Height Slider */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Chiều cao</span>
                                        <span className="text-sky-400 font-mono">{mapHeight}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="400"
                                        max="800"
                                        step="50"
                                        value={mapHeight}
                                        onChange={(e) => setMapHeight(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Selected Info */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-sky-500 rounded-full"></span>
                                Thông tin Vùng chọn
                            </h3>

                            {selected ? (
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Tên đơn vị</div>
                                        <div className="text-2xl font-bold text-white">{selected.name}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mã BNV</div>
                                            <div className="font-mono text-sky-400">{selected["hc-key"]?.replace("vn-new-", "").replace("vn-", "") || selected.code || "N/A"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Giá trị</div>
                                            <div className="font-mono text-emerald-400">{selected.value ?? "N/A"}</div>
                                        </div>
                                    </div>

                                    {selected.level && (
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cấp hành chính</div>
                                            <div className="px-2 py-1 rounded bg-white/10 text-sm inline-block">
                                                {selected.level}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-white/10">
                                        <div className="text-xs text-slate-500 italic">
                                            Dữ liệu được cập nhật theo Nghị quyết mới nhất về sắp xếp đơn vị hành chính.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-32 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-xl">
                                    <span>👆 Click vào bản đồ để xem chi tiết</span>
                                </div>
                            )}
                        </div>

                        {/* Code Preview */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5 font-mono text-xs text-slate-500 flex justify-between items-center">
                                <span>React Component Usage</span>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            </div>
                            <CodeBlock
                                language="tsx"
                                code={`<VietnamMap
  height={${mapHeight}}
  showLabels={${showLabels}}
  showZoomControls={${showZoomControls}}
  onProvinceClick={(p) => {
    console.log(p.name);
  }}
  colorAxis={{
    minColor: "#1e293b",
    maxColor: "#0ea5e9" 
  }}
/>`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

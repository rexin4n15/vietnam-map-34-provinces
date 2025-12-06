"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useCallback, useMemo } from "react";
import { CodeBlock } from "@/components/CodeBlock";

const VietnamMap = dynamic(
    () => import("@xdev-asia/vietnam-map-34-provinces/react").then((mod) => mod.VietnamMap),
    { ssr: false, loading: () => <div className="h-[600px] bg-slate-900 animate-pulse rounded-xl" /> }
);

const DEFAULT_TOOLTIP = `<div style="padding: 8px;">
  <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">📍 {name}</div>
  <div style="font-size: 12px;">Mã: <b style="color: #0ea5e9;">{code}</b></div>
  <div style="font-size: 12px;">Giá trị: <b style="color: #10b981;">{value}</b></div>
</div>`;

export default function DemoPage() {
    const [selected, setSelected] = useState<any>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Map options
    const [showLabels, setShowLabels] = useState(true);
    const [showZoomControls, setShowZoomControls] = useState(true);
    const [enableDrilldown, setEnableDrilldown] = useState(true);
    const [mapHeight, setMapHeight] = useState(600);
    const [hoverColor, setHoverColor] = useState("#fbbf24");
    const [useCustomTooltip, setUseCustomTooltip] = useState(false);
    const [tooltipTemplate, setTooltipTemplate] = useState(DEFAULT_TOOLTIP);

    // Color schemes for the map
    const colorSchemes = [
        { name: 'Blue', minColor: '#1e293b', maxColor: '#0ea5e9' },
        { name: 'Green', minColor: '#14532d', maxColor: '#22c55e' },
        { name: 'Purple', minColor: '#3b0764', maxColor: '#a855f7' },
        { name: 'Red', minColor: '#450a0a', maxColor: '#ef4444' },
        { name: 'Teal', minColor: '#134e4a', maxColor: '#14b8a6' },
    ];
    const [colorSchemeIndex, setColorSchemeIndex] = useState(0);

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

    // Custom tooltip formatter with template
    const tooltipFormatter = useMemo(() => {
        if (!useCustomTooltip) return undefined;
        return (point: any) => {
            return tooltipTemplate
                .replace(/{name}/g, point.name || '')
                .replace(/{code}/g, point.code?.replace("vn-new-", "").toUpperCase() || '')
                .replace(/{value}/g, point.value?.toLocaleString() || 'N/A');
        };
    }, [useCustomTooltip, tooltipTemplate]);

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
                            enableDrilldown={enableDrilldown}
                            hoverColor={hoverColor}
                            tooltipFormatter={tooltipFormatter}
                            onProvinceClick={handleProvinceClick}
                            colorAxis={{
                                minColor: colorSchemes[colorSchemeIndex].minColor,
                                maxColor: colorSchemes[colorSchemeIndex].maxColor,
                            }}
                        />

                        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-white/10 rounded-lg p-3 text-xs text-slate-400 max-w-[200px]">
                            <p className="mb-1 font-semibold text-white">Hướng dẫn:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Click vào tỉnh để xem chi tiết</li>
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
                                {/* Show Labels */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Hiển thị tên tỉnh</span>
                                    <button
                                        onClick={() => setShowLabels(!showLabels)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${showLabels ? 'bg-sky-500' : 'bg-slate-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${showLabels ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </label>

                                {/* Show Zoom */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Nút zoom (+/-)</span>
                                    <button
                                        onClick={() => setShowZoomControls(!showZoomControls)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${showZoomControls ? 'bg-sky-500' : 'bg-slate-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${showZoomControls ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </label>

                                {/* Enable Drilldown */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Drilldown (xem xã)</span>
                                    <button
                                        onClick={() => setEnableDrilldown(!enableDrilldown)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${enableDrilldown ? 'bg-sky-500' : 'bg-slate-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${enableDrilldown ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </label>

                                {/* Custom Tooltip Toggle */}
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Custom tooltip</span>
                                    <button
                                        onClick={() => setUseCustomTooltip(!useCustomTooltip)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${useCustomTooltip ? 'bg-sky-500' : 'bg-slate-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${useCustomTooltip ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </label>

                                {/* Custom Tooltip Template */}
                                {useCustomTooltip && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-300">Template HTML</span>
                                            <span className="text-xs text-slate-500">Dùng: {'{name}'}, {'{code}'}, {'{value}'}</span>
                                        </div>
                                        <textarea
                                            value={tooltipTemplate}
                                            onChange={(e) => setTooltipTemplate(e.target.value)}
                                            rows={6}
                                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            placeholder="Nhập HTML template..."
                                        />
                                        <button
                                            onClick={() => setTooltipTemplate(DEFAULT_TOOLTIP)}
                                            className="text-xs text-sky-400 hover:text-sky-300"
                                        >
                                            ↺ Reset về mặc định
                                        </button>
                                    </div>
                                )}

                                {/* Hover Color */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-300">Màu hover</span>
                                    <div className="flex gap-2">
                                        {['#fbbf24', '#0ea5e9', '#10b981', '#f43f5e', '#8b5cf6'].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setHoverColor(color)}
                                                className={`w-6 h-6 rounded-full border-2 transition-transform ${hoverColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Map Color Scheme */}
                                <div className="space-y-2">
                                    <span className="text-sm text-slate-300">Bảng màu bản đồ</span>
                                    <div className="flex gap-2">
                                        {colorSchemes.map((scheme, index) => (
                                            <button
                                                key={scheme.name}
                                                onClick={() => setColorSchemeIndex(index)}
                                                className={`flex-1 h-8 rounded-lg border-2 transition-all ${colorSchemeIndex === index ? 'border-white scale-105' : 'border-transparent'}`}
                                                style={{ background: `linear-gradient(to right, ${scheme.minColor}, ${scheme.maxColor})` }}
                                                title={scheme.name}
                                            />
                                        ))}
                                    </div>
                                </div>

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
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mã</div>
                                            <div className="font-mono text-sky-400">{selected.code?.replace("vn-new-", "").toUpperCase() || "N/A"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Giá trị</div>
                                            <div className="font-mono text-emerald-400">{selected.value ?? "N/A"}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-24 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-xl">
                                    <span>👆 Click vào bản đồ</span>
                                </div>
                            )}
                        </div>

                        {/* Code Preview */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5 font-mono text-xs text-slate-500 flex justify-between items-center">
                                <span>React Usage</span>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            </div>
                            <CodeBlock
                                language="tsx"
                                code={`<VietnamMap
  height={${mapHeight}}
  showLabels={${showLabels}}
  showZoomControls={${showZoomControls}}
  enableDrilldown={${enableDrilldown}}
  hoverColor="${hoverColor}"
  colorAxis={{
    minColor: "${colorSchemes[colorSchemeIndex].minColor}",
    maxColor: "${colorSchemes[colorSchemeIndex].maxColor}"
  }}${useCustomTooltip ? `
  tooltipFormatter={(point) => \`
    ${tooltipTemplate.replace(/\n/g, '\n    ').replace(/{/g, '${point.').replace(/}/g, '}')}\`}` : ''}
  onProvinceClick={(p) => console.log(p)}
/>`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

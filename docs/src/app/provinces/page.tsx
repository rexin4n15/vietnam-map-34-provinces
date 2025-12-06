"use client";

import { useState, useEffect } from "react";
import { PROVINCES, getStats } from "@/lib/provinces";

interface Commune {
    maphuongxa: number;
    tenphuongxa: string;
}

interface ProvinceData {
    matinhBNV: string;
    phuongxa: Commune[];
}

type FilterType = "all" | "city" | "merged" | "unchanged";

export default function ProvincesPage() {
    const stats = getStats();
    const [filter, setFilter] = useState<FilterType>("all");
    const [communesData, setCommunesData] = useState<ProvinceData[] | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/xdev-asia-labs/vietnam-map-34-provinces/main/src/core/assets/communes-2025.json"
        )
            .then((res) => res.json())
            .then((data) => setCommunesData(data))
            .catch(console.error);
    }, []);

    const filteredProvinces = PROVINCES.filter((p) => {
        if (filter === "city") return p.type === "city";
        if (filter === "merged") return p.merged.length > 1;
        if (filter === "unchanged") return p.merged.length <= 1;
        return true;
    });

    const selectedCommunesData = communesData?.find(
        (p) => p.matinhBNV === selectedProvince
    );

    const filteredCommunes = selectedCommunesData?.phuongxa.filter((c) =>
        c.tenphuongxa.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedProvinceInfo = PROVINCES.find((p) => p.code === selectedProvince);

    return (
        <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                            QĐ 19/2025
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                        34 Provinces Data
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        Official list of 34 provinces/cities and 3,321 communes based on the new administrative division structure.
                    </p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { value: stats.total, label: "Tỉnh/TP" },
                        { value: stats.cities, label: "TP Trực thuộc TW" },
                        { value: stats.merged, label: "Đã hợp nhất" },
                        { value: stats.totalCommunes.toLocaleString(), label: "Xã/Phường" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-sky-500/50 transition-colors"
                        >
                            <div className="text-3xl font-bold text-sky-400 mb-1">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {(["all", "city", "merged", "unchanged"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                                        : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {f === "all" && `All (${PROVINCES.length})`}
                                {f === "city" && `Cities (${stats.cities})`}
                                {f === "merged" && `Merged (${stats.merged})`}
                                {f === "unchanged" && `Unchanged (${PROVINCES.length - stats.merged})`}
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-6 text-xs font-medium text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span>Merged Province</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                            <span>Unchanged</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Province Grid */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                        {filteredProvinces.map((p) => (
                            <div
                                key={p.code}
                                onClick={() => {
                                    setSelectedProvince(p.code);
                                    setSearchQuery("");
                                }}
                                className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${p.merged.length > 1
                                        ? "bg-slate-900/40 border-green-500/20 hover:border-green-500/50 hover:bg-green-500/5"
                                        : "bg-slate-900/40 border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5"
                                    } ${selectedProvince === p.code ? "ring-2 ring-sky-500 border-transparent bg-sky-500/10" : ""}`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors">{p.name}</h3>
                                        <div className="flex gap-3 text-xs font-mono text-slate-500 mt-1">
                                            <span>BNV: <span className="text-slate-400">{p.code}</span></span>
                                            <span>TMS: <span className="text-slate-400">{p.tms}</span></span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${p.type === "city" ? "bg-purple-500/20 text-purple-300" : "bg-slate-700 text-slate-400"
                                        }`}>
                                        {p.type === "city" ? "City" : "Prov"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 text-xs">📍</span>
                                    {p.communes} communes
                                </div>

                                {p.merged.length > 1 && (
                                    <div className="mt-3 pt-3 border-t border-white/5 text-xs">
                                        <span className="text-slate-500 block mb-1">Merged from:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {p.merged.map(m => (
                                                <span key={m} className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Communes Panel (Sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-24">
                        {selectedProvince ? (
                            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-600"></div>

                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedProvinceInfo?.name}</h3>
                                        <p className="text-sm text-slate-400">{selectedCommunesData?.phuongxa.length || 0} communes found</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProvince(null)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search commune name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                    />
                                    <svg className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredCommunes?.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500 text-sm">
                                            No communes found matching "{searchQuery}"
                                        </div>
                                    ) : (
                                        filteredCommunes?.map((c) => (
                                            <div
                                                key={c.maphuongxa}
                                                className="group flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                                            >
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{c.tenphuongxa}</span>
                                                <code className="px-1.5 py-0.5 rounded bg-slate-950 text-xs font-mono text-sky-500 border border-white/5 group-hover:border-sky-500/30 transition-colors">
                                                    {c.maphuongxa}
                                                </code>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 text-slate-500 p-6 text-center">
                                <span className="text-4xl mb-4 opacity-50">👈</span>
                                <p>Select a province from the list to view its communes and details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

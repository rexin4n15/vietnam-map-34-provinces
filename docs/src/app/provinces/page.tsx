"use client";

import { useState, useEffect } from "react";
import { PROVINCES, getStats, Province } from "@/lib/provinces";

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
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                    QĐ 19/2025
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">34 Provinces Data</h1>
                <p className="text-slate-400">
                    Danh sách 34 tỉnh/thành phố và 3,321 xã/phường theo cấu trúc hành chính mới
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { value: stats.total, label: "Tỉnh/TP" },
                    { value: stats.cities, label: "TP Trực thuộc TW" },
                    { value: stats.merged, label: "Đã hợp nhất" },
                    { value: stats.totalCommunes.toLocaleString(), label: "Xã/Phường" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-sky-500/10 rounded-xl p-4 text-center"
                    >
                        <div className="text-2xl font-bold text-sky-400">{stat.value}</div>
                        <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {(["all", "city", "merged", "unchanged"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm border ${filter === f
                                ? "bg-sky-500 border-sky-500 text-white"
                                : "border-white/10 text-slate-400 hover:border-sky-500/50 hover:text-sky-400"
                            }`}
                    >
                        {f === "all" && `Tất cả (${PROVINCES.length})`}
                        {f === "city" && `TP TW (${stats.cities})`}
                        {f === "merged" && `Hợp nhất (${stats.merged})`}
                        {f === "unchanged" && `Giữ nguyên (${PROVINCES.length - stats.merged})`}
                    </button>
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mb-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span>Tỉnh hợp nhất</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white/20" />
                    <span>Giữ nguyên</span>
                </div>
            </div>

            {/* Communes Panel */}
            {selectedProvince && selectedCommunesData && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            {selectedProvinceInfo?.name} - {selectedCommunesData.phuongxa.length} xã/phường
                        </h3>
                        <button
                            onClick={() => setSelectedProvince(null)}
                            className="text-slate-400 hover:text-white text-xl px-2"
                        >
                            ×
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm xã/phường..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg mb-4 text-sm focus:outline-none focus:border-sky-500"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-80 overflow-y-auto">
                        {filteredCommunes?.map((c) => (
                            <div
                                key={c.maphuongxa}
                                className="bg-white/5 rounded px-3 py-2 text-sm flex justify-between"
                            >
                                <span className="truncate">{c.tenphuongxa}</span>
                                <code className="text-sky-400 text-xs">{c.maphuongxa}</code>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Province Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProvinces.map((p) => (
                    <div
                        key={p.code}
                        onClick={() => {
                            setSelectedProvince(p.code);
                            setSearchQuery("");
                        }}
                        className={`bg-white/5 border rounded-xl p-4 cursor-pointer transition-all hover:border-sky-500 ${p.merged.length > 1 ? "border-l-4 border-l-green-500 border-white/10" : "border-white/10"
                            } ${selectedProvince === p.code ? "border-sky-500 bg-sky-500/10" : ""}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold">{p.name}</span>
                            <span className="text-xs text-slate-500 font-mono">
                                BNV: {p.code} | TMS: {p.tms}
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400">
                            <span>📍 {p.communes} xã/phường</span>
                            <span>{p.type === "city" ? "🏙️ TP TW" : "🏛️ Tỉnh"}</span>
                        </div>
                        {p.merged.length > 1 && (
                            <div className="text-xs text-green-400 mt-2">
                                Hợp nhất: {p.merged.join(" + ")}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

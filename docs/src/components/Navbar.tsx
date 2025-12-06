"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/docs/react", label: "Documentation" },
    { href: "/provinces", label: "34 Provinces Data" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-slate-900/60 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
                        VN
                    </div>
                    <span className="font-bold text-lg text-slate-200 tracking-tight group-hover:text-white transition-colors">
                        Vietnam Map <span className="text-sky-400">34</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${pathname === item.href
                                    ? "bg-white/10 text-white shadow-inner"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/xdev-asia-labs/vietnam-map-34-provinces"
                        target="_blank"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                    >
                        <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="font-semibold">GitHub</span>
                    </a>
                    <a
                        href="https://www.npmjs.com/package/@xdev-asia/vietnam-map-34-provinces"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 hover:bg-sky-400 hover:shadow-sky-400/30 transition-all"
                    >
                        <span>npm</span>
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">v1.0.0</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

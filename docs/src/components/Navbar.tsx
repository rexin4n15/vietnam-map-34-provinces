"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Demo" },
    {
        label: "Docs",
        dropdown: [
            { href: "/docs/vanilla", label: "Vanilla JS" },
            { href: "/docs/react", label: "React" },
            { href: "/docs/vue", label: "Vue" },
            { href: "/docs/angular", label: "Angular" },
        ],
    },
    { href: "/provinces", label: "34 Provinces" },
];

export function Navbar() {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl flex items-center gap-2">
                    🇻🇳 Vietnam Map 34
                </Link>

                <div className="flex items-center gap-8">
                    {navItems.map((item) =>
                        item.dropdown ? (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <button className="text-slate-400 hover:text-sky-400 text-sm flex items-center gap-1">
                                    {item.label}
                                    <span className="text-xs">▾</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900/98 border border-white/10 rounded-lg p-2 min-w-[140px]">
                                        {item.dropdown.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                className={`block px-3 py-2 rounded text-sm ${pathname === sub.href
                                                        ? "text-sky-400 bg-white/5"
                                                        : "text-slate-400 hover:text-sky-400 hover:bg-white/5"
                                                    }`}
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href!}
                                className={`text-sm ${pathname === item.href
                                        ? "text-sky-400"
                                        : "text-slate-400 hover:text-sky-400"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/xdev-asia-labs/vietnam-map-34-provinces"
                        target="_blank"
                        className="px-4 py-2 rounded-lg border border-white/10 text-sm hover:bg-white/5"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.npmjs.com/package/@xdev-asia/vietnam-map-34-provinces"
                        target="_blank"
                        className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm hover:bg-sky-600"
                    >
                        npm
                    </a>
                </div>
            </div>
        </nav>
    );
}

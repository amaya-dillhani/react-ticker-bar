import React, { useState, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";

interface TickerItem {
    name: string;
    price: number;
    change: number;
    decimals: number;
}

export function isChangePositive(change: number): boolean {
    return change > 0 || (change === 0 && !Object.is(change, -0));
}

export default function TickerBar() {
    const items: TickerItem[] = [
        { name: "HYPE", price: 44.09, change: 12.33, decimals: 2 },
        { name: "LINK", price: 18.0, change: 0.06, decimals: 2 },
        { name: "USDE", price: 0.9994, change: -0.0, decimals: 4 },
        { name: "XLM", price: 0.3245, change: 1.1, decimals: 4 },
        { name: "BCH", price: 506.13, change: 0.61, decimals: 2 },
        { name: "SUI", price: 2.5302, change: 0.42, decimals: 4 },
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Duplicate items multiple times for seamless scrolling
    const scrollingItems = [...items, ...items, ...items, ...items];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative border-y bg-white">
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-white to-transparent px-2 hover:from-gray-50"
                aria-label="Scroll left"
            >
                <ChevronLeft size={20} className="text-gray-600" />
            </button>

            {/* Ticker Container */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div 
                    className="flex whitespace-nowrap py-3"
                    style={{
                        animation: isPaused ? 'none' : 'scroll 40s linear infinite'
                    }}
                >
                    {scrollingItems.map((item, i) => {
                        const isPositive = isChangePositive(item.change);
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 border-r border-gray-200 last:border-r-0"
                            >
                                <span className="font-semibold text-gray-800">{item.name}</span>
                                <span className="text-gray-700">
                                    ${item.price.toFixed(item.decimals)}
                                </span>
                                <span
                                    className={`flex items-center gap-0.5 ${
                                        isPositive ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {isPositive ? (
                                        <ArrowUpRight size={14} strokeWidth={2.5} />
                                    ) : (
                                        <ArrowDownRight size={14} strokeWidth={2.5} />
                                    )}
                                    {Math.abs(item.change).toFixed(2)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-white to-transparent px-2 hover:from-gray-50"
                aria-label="Scroll right"
            >
                <ChevronRight size={20} className="text-gray-600" />
            </button>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
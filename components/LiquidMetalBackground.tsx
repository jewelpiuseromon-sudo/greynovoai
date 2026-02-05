"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';

export default function LiquidMetalBackground() {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full">
            <LiquidMetal
                {...liquidMetalPresets[2]}
                className="w-full h-full"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>
    );
}

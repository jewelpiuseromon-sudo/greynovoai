"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';

export default function LiquidMetalBackground() {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-br from-indigo-950/20 to-purple-950/20">
            <LiquidMetal
                {...liquidMetalPresets[0]}
                className="w-full h-full"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
    );
}

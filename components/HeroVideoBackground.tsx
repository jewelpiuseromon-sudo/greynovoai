'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 192;
const FPS = 24;

export default function HeroVideoBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Optimized Frame Loading (Chunked)
    useEffect(() => {
        const loadFrames = async () => {
            const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
            let loadedCount = 0;

            // 1. Load the first 24 frames (1 second) IMMEDIATELY so animation starts fast
            const INITIAL_CHUNK = 24;

            const loadChunk = (startIdx: number, endIdx: number) => {
                return Promise.all(
                    Array.from({ length: endIdx - startIdx }, (_, i) => {
                        const index = startIdx + i;
                        if (index >= FRAME_COUNT) return Promise.resolve();

                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            // Optimize: Add loading="eager" for priority frames
                            if (index < INITIAL_CHUNK) img.fetchPriority = "high";

                            const frameNumber = String(index).padStart(3, '0');
                            img.src = `/sequence/frame_${frameNumber}.jpg`;

                            img.onload = () => {
                                frames[index] = img;
                                loadedCount++;
                                setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
                                resolve();
                            };

                            img.onerror = () => {
                                console.warn(`Skipped frame ${index}`);
                                resolve(); // Resolve anyway to keep going
                            };
                        });
                    })
                );
            };

            try {
                // Phase 1: Critical Init (User sees this first)
                await loadChunk(0, INITIAL_CHUNK);
                framesRef.current = frames; // Attach what we have so far
                setLoading(false); // Enable playback start

                // Phase 2: Lazy load the rest in background chunks
                const CHUNK_SIZE = 50;
                for (let i = INITIAL_CHUNK; i < FRAME_COUNT; i += CHUNK_SIZE) {
                    await loadChunk(i, i + CHUNK_SIZE);
                    // Small breathing room for main thread
                    await new Promise(r => setTimeout(r, 50));
                }
            } catch (error) {
                console.error('Frame loading error:', error);
            }
        };

        loadFrames();
    }, []);

    // Animation loop
    useEffect(() => {
        if (loading || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            // Set actual render size (e.g. 3840 for 1920 logical)
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            // Reset scale to handle logical pixels
            ctx.scale(dpr, dpr);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const animate = (currentTime: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const frameIndex = Math.floor((elapsed / 1000) * FPS) % FRAME_COUNT;
            const frame = framesRef.current[frameIndex];

            if (frame && ctx) {
                // Fill with black background
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Calculate scaling to cover entire canvas
                const canvasAspect = canvas.width / canvas.height;
                const imageAspect = frame.width / frame.height;

                let drawWidth, drawHeight, drawX, drawY;

                if (canvasAspect > imageAspect) {
                    // Canvas is wider than image
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imageAspect;
                    drawX = 0;
                    drawY = (canvas.height - drawHeight) / 2;
                } else {
                    // Canvas is taller than image
                    drawWidth = canvas.height * imageAspect;
                    drawHeight = canvas.height;
                    drawX = (canvas.width - drawWidth) / 2;
                    drawY = 0;
                }

                ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [loading]);

    return (
        <canvas
            ref={canvasRef}
            // Scale 1.1 zooms in 10% to push the bottom-right Veo watermark off-screen
            className="fixed top-0 left-0 w-full h-screen pointer-events-none scale-110"
            style={{ background: '#000000', zIndex: 0 }}
        />
    );
}

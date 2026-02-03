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

    // Preload all frames
    useEffect(() => {
        const loadFrames = async () => {
            const frames: HTMLImageElement[] = [];
            let loadedCount = 0;

            const loadPromises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    const frameNumber = String(i).padStart(3, '0');
                    img.src = `/sequence/frame_${frameNumber}.jpg`;

                    img.onload = () => {
                        frames[i] = img;
                        loadedCount++;
                        setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };

                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}: ${img.src}`);
                        reject();
                    };
                });
            });

            try {
                await Promise.all(loadPromises);
                framesRef.current = frames;
                setLoading(false);
            } catch (error) {
                console.error('Error loading frames:', error);
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
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
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-screen -z-10"
                style={{ background: '#000000' }}
            />
        </>
    );
}

"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface LiquidMetalHeroProps {
    badge?: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel?: string;
    onPrimaryCtaClick?: () => void;
    onSecondaryCtaClick?: () => void;
    features?: string[];
}

export default function LiquidMetalHero({
    badge,
    title,
    subtitle,
    primaryCtaLabel,
    secondaryCtaLabel,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
    features = [],
}: LiquidMetalHeroProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <LiquidMetal
                    {...liquidMetalPresets.gold}
                    translateY={0.2}
                    zoom={0.8}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-20">
                <motion.div
                    className="text-center space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {badge && (
                        <motion.div
                            className="flex justify-center"
                            variants={itemVariants}
                        >
                            <Badge
                                variant="secondary"
                                className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm px-4 py-1.5 text-sm"
                            >
                                {badge}
                            </Badge>
                        </motion.div>
                    )}

                    <motion.div
                        className="space-y-6"
                        variants={itemVariants}
                    >
                        <motion.h1
                            role="heading"
                            aria-level={1}
                            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl"
                            variants={itemVariants}
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            className="max-w-3xl mx-auto text-xl sm:text-2xl text-white/80 leading-relaxed font-light drop-shadow-lg"
                            variants={itemVariants}
                        >
                            {subtitle}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                        variants={buttonVariants}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={onPrimaryCtaClick}
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-2xl text-lg px-8 py-6 font-bold h-auto rounded-full"
                            >
                                {primaryCtaLabel}
                            </Button>
                        </motion.div>

                        {secondaryCtaLabel && (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={onSecondaryCtaClick}
                                    variant="outline"
                                    size="lg"
                                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-lg px-8 py-6 font-medium h-auto rounded-full"
                                >
                                    {secondaryCtaLabel}
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>

                    {features.length > 0 && (
                        <motion.div
                            className="pt-16"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center justify-center text-center"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: 0.8 + (index * 0.1)
                                                    }}
                                                >
                                                    <p className="text-white/90 font-medium text-lg">
                                                        {feature}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

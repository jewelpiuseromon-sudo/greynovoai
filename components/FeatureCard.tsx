'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
        >
            {/* Purple glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-purple-600/0 group-hover:bg-purple-600/10 transition-all duration-300 blur-xl" />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/70 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

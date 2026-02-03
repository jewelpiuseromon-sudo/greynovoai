'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
    number: number;
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: number;
    showConnector?: boolean;
}

export default function ProcessStep({
    number,
    icon: Icon,
    title,
    description,
    delay = 0,
    showConnector = true
}: ProcessStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className="relative flex flex-col items-center text-center md:text-left md:items-start"
        >
            {/* Connector line (horizontal on desktop, vertical on mobile) */}
            {showConnector && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-full h-0.5 bg-gradient-to-r from-purple-600/50 to-transparent" />
            )}

            {/* Step number with icon */}
            <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">{number}</span>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-white/70 leading-relaxed max-w-sm">{description}</p>
        </motion.div>
    );
}

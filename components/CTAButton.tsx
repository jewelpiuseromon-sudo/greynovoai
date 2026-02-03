'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export default function CTAButton({
    variant = 'primary',
    children,
    className = '',
    ...props
}: CTAButtonProps) {
    if (variant === 'primary') {
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-12 py-5 rounded-full font-semibold text-white overflow-hidden group ${className}`}
                style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, rgba(255,255,255,0.4), rgba(192,132,252,0.3), rgba(124,58,237,0.2))',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                }}
                {...props}
            >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400" />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-purple-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative z-10">{children}</span>
            </motion.button>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold text-white border-2 border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}

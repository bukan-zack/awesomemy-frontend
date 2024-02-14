"use client";

import { motion } from "framer-motion";

export function TransitionWrapper({
    children,
    className,
}: {
    children: React.ReactNode; 
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, translateY: 10  }}
            animate={{ opacity: 1, translateY: 1 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}   
        >
            {children}
        </motion.div>
    );
}
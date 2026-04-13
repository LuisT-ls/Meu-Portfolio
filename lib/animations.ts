import { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const revealItem: Variants = {
    initial: { y: 24, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 22,
        },
    },
};

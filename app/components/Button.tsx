'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

export const Button = ({ children, variant = 'primary', ...props }: any) => {
    const styles = clsx(
        'h-[52px] px-6 rounded-lg font-medium flex items-center justify-center',
        {
            'bg-black text-white hover:bg-gray-900': variant === 'primary',
            'bg-gray-100 text-black hover:bg-gray-200': variant === 'secondary'
        }
    )

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles}
            {...props}
        >
            {children}
        </motion.button>
    )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const PartnerLogo = ({ src, alt, delay = 0 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Image
                src={src}
                alt={alt}
                width={120}
                height={40}
                className="opacity-50 hover:opacity-100 transition-opacity"
            />
        </motion.div>
    )
}

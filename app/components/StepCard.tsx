'use client'

import { motion } from 'framer-motion'

export const StepCard = ({ number, title, description, delay = 0 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="relative bg-white p-6 rounded-lg shadow-md"
        >
            <div className="text-4xl font-bold text-gray-200 absolute top-4 right-4">
                {number}
            </div>
            <h3 className="text-xl font-semibold mb-4 relative">{title}</h3>
            <p className="text-gray-600 relative">{description}</p>
        </motion.div>
    )
}

'use client'

import { motion } from 'framer-motion'

export const BenefitCard = ({ icon: Icon, title, description, delay = 0 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="text-center"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <Icon className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    )
}

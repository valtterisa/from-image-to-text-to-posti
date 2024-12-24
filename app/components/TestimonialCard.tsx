'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export const TestimonialCard = ({ name, company, text, delay = 0 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white p-8 rounded-lg shadow-lg"
        >
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
            </div>
            <p className="text-gray-600 mb-4">{text}</p>
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-600">{company}</p>
                </div>
            </div>
        </motion.div>
    )
}

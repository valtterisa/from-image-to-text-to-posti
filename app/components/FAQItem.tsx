'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

export const FAQItem = ({ question, answer, delay = 0 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="mb-8"
        >
            <h3 className="text-xl font-semibold mb-2 flex items-start">
                <HelpCircle className="w-6 h-6 mr-2 flex-shrink-0 text-black" />
                {question}
            </h3>
            <p className="text-gray-600 ml-8">{answer}</p>
        </motion.div>
    )
}

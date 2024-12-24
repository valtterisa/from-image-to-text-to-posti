'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export const SocialProof = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'E-commerce Business Owner',
            image: '/images/sarah.jpg',
            feedback: 'PakettiPro made managing deliveries effortless! My customers are happier than ever.',
        },
        {
            id: 2,
            name: 'James Carter',
            role: 'Logistics Manager',
            image: '/images/james.jpg',
            feedback: 'The efficiency PakettiPro brought to our operations is unmatched. Highly recommended!',
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Freelance Courier',
            image: '/images/emily.jpg',
            feedback: 'Thanks to PakettiPro, I can track all my deliveries in one place. It’s a game-changer!',
        },
    ]

    return (
        <section className="w-full py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4">Luotettu kumppani</h2>
                    {/* <p className="text-gray-600">
                        Tuhannet yritykset käyttävät PakettiProta päivittäin
                    </p> */}
                </motion.div>
                <div className="flex flex-wrap justify-center items-center gap-12">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Image
                                src={`/placeholder.svg`}
                                alt={`Partner Company ${index + 1}`}
                                width={120}
                                height={40}
                                className="opacity-50 hover:opacity-100 transition-opacity"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

'use client'

import { motion } from 'framer-motion'
import { Camera, Shield, Zap, Truck, Clock, DollarSign } from 'lucide-react'

interface Benefit {
    icon: React.ComponentType
    title: string
    description: string
}

const benefitData: Benefit[] = [
    {
        icon: Truck,
        title: 'Reliable Deliveries',
        description: 'Our couriers ensure your packages are delivered on time and in excellent condition.'
    },
    {
        icon: Clock,
        title: 'Fast Service',
        description: 'We prioritize quick delivery without compromising on the safety of your packages.'
    },
    {
        icon: DollarSign,
        title: 'Affordable Pricing',
        description: 'Our flexible pricing ensures you get the best value for your money.'
    }
]

export function Benefits() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Miksi valita Paketti AI?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Helpota lähetystoimintaasi ja automatisoi manuaalinen työ tekoälyn avulla
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: Camera,
                            title: 'Älykäs kuvantunnistus',
                            description: 'Tunnista lähetystiedot automaattisesti kuvasta tekoälyn avulla'
                        },
                        {
                            icon: Zap,
                            title: 'Automaattinen lähetys',
                            description: 'Lähetä paketit suoraan postin järjestelmään ilman manuaalista työtä'
                        },
                        {
                            icon: Shield,
                            title: 'Luotettava toimitus',
                            description: 'Seuraa lähetyksiäsi reaaliajassa ja varmista turvallinen toimitus'
                        }
                    ].map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                                <benefit.icon className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

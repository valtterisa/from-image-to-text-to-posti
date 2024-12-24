'use client'

import { StepCard } from './StepCard'
import { motion } from 'framer-motion'

interface Step {
    number: number
    title: string
    description: string
}


export function HowItWorks() {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Miten se toimii?</h2>
                    <p className="text-xl text-gray-600">
                        Kolme yksinkertaista vaihetta aloittamiseen
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            number: '1',
                            title: 'Luo tili',
                            description: 'Rekisteröidy palveluun ja määritä yrityksesi asetukset'
                        },
                        {
                            number: '2',
                            title: 'Lisää kuva',
                            description: 'Kuvaa lähetystiedot tai lataa olemassa oleva kuva'
                        },
                        {
                            number: '3',
                            title: 'Lähetä automaattisesti',
                            description: 'Tarkastettuasi tiedot, lähetä paketti suoraan postin järjestelmään napin painalluksella'
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative bg-white p-6 rounded-lg shadow-md"
                        >
                            <div className="text-4xl font-bold text-gray-200 absolute top-4 right-4">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 relative">{step.title}</h3>
                            <p className="text-gray-600 relative">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

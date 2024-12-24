'use client'

import { TestimonialCard } from './TestimonialCard'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
    name: string
    company: string
    text: string
}

const testimonialsData: Testimonial[] = [
    {
        name: 'John Doe',
        company: 'TechCorp',
        text: 'PakettiPro transformed our logistics operations. It’s incredibly reliable and easy to use!'
    },
    {
        name: 'Jane Smith',
        company: 'EcomWorld',
        text: 'Our customers love the fast and secure deliveries. Highly recommended!'
    },
    {
        name: 'Emily Brown',
        company: 'RetailConnect',
        text: 'The affordable pricing and excellent service make PakettiPro a game-changer.'
    }
]

export function Testimonials() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Mitä asiakkaamme sanovat</h2>
                    <p className="text-xl text-gray-600">
                        Tuhannet yritykset luottavat PakettiProhon päivittäin
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            name: 'Matti Meikäläinen',
                            company: 'TechOy',
                            text: 'PakettiPro on mullistanut lähetystoimintamme. Säästämme päivittäin tunteja työaikaa ja virheet ovat vähentyneet merkittävästi.'
                        },
                        {
                            name: 'Liisa Virtanen',
                            company: 'VerkkokauppaFi',
                            text: 'Automaattinen kuvantunnistus on uskomattoman tarkka. Voimme nyt käsitellä kolme kertaa enemmän lähetyksiä samassa ajassa.'
                        }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-lg shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">{testimonial.text}</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

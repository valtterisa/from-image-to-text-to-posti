'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function Hero() {
    return (
        <section className="pt-20 pb-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="w-full flex flex-col items-center justify-center md:flex-row">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
                            Automatisoi pakettien lähetys <strong className='underline text-yellow-500'>helposti</strong> ja <strong className='underline text-yellow-500'>nopeasti</strong> tekoälyn avulla
                        </h1>
                        <p className="text-[20px] leading-relaxed text-gray-600 mb-8">
                            Manuaalinen pakettien lähetys on historiaa. Helpota yrityksesi lähetystoimintaa automaattisen kuvantunnistuksen ja valmiin pakettipalvelu integraation avulla.
                        </p>
                        <div className="flex flex-col w-fit gap-3 mb-16">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="h-[52px] px-6 w-fit rounded-lg bg-black text-white font-medium flex items-center gap-2 hover:bg-gray-900 transition-colors"
                            >
                                Aloita nyt
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <p className='text-sm text-gray-500'>Kolme ensimmäistä lähetystä ovat ilmaisia. <br />Luottokorttia ei tarvita.</p>

                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-full h-full max-w-[400px] lg:max-w-[600px] min-h-[300px] lg:min-h-[500px]"
                    >
                        <Image src={"/hero-image.svg"} fill alt='' />
                    </motion.div>
                </div>
            </div >
        </section >
    )
}

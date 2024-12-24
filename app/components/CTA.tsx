'use client'

import { Button } from './Button'
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <section className="w-full py-8">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 text-center"
                >
                    <h2 className="text-2xl md:text-4xl text-center font-bold mb-6">Valmis tehostamaan lähetystoimintaasi?</h2>
                    <p className="text-xl mb-8">
                        Liity tuhansien tyytyväisten asiakkaiden joukkoon jo tänään
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button>
                            Aloita ilmainen kokeilu
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button variant="secondary">Pyydä demo</Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

'use client'

import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
    message?: string
}

export default function LoadingScreen({ message = 'Käsitellään tiedostoja...' }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            <div className="max-w-sm w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                    >
                        <Loader2 className="h-12 w-12 text-black" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-black">{message}</h2>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "linear"
                                }}
                                className="w-1/3 h-full bg-black rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}


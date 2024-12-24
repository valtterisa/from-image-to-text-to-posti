'use client'

import { motion } from 'framer-motion'
import { Check, Package, Zap, Users } from 'lucide-react'
import { FAQ } from '../components/FAQ'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

const features = {
    starter: [
        'Kuvantunnistus (100 kuvaa/kk)',
        'Automaattinen lähetys',
        'Perus analytiikka',
        'Sähköpostituki'
    ],
    pro: [
        'Kuvantunnistus (1000 kuvaa/kk)',
        'Automaattinen lähetys',
        'Edistynyt analytiikka',
        'Prioriteettituki',
        'API-integraatio',
        'Tiimijäsenet'
    ],
    enterprise: [
        'Rajaton kuvantunnistus',
        'Automaattinen lähetys',
        'Räätälöity analytiikka',
        'Henkilökohtainen tukihenkilö',
        'API-integraatio',
        'Rajaton tiimikoko',
        'SLA-takuu'
    ]
}

export default function Pricing() {
    return (
        <div className="w-full min-h-screen bg-white">

            <main className="py-20">
                <div className="w-full container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-bold mb-4">Valitse sinulle sopiva paketti</h1>
                        <p className="text-xl text-gray-600">Skaalautuva hinnoittelu yrityksesi tarpeiden mukaan</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                        {/* Starter Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
                        >
                            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                                <Package className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">19€</span>
                                <span className="text-gray-600">/kk</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {features.starter.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 px-6 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                            >
                                Aloita ilmaiseksi
                            </motion.button>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black relative"
                        >
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-black text-white px-4 py-1 rounded-full text-sm">Suosituin</span>
                            </div>
                            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                                <Zap className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">49€</span>
                                <span className="text-gray-600">/kk</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {features.pro.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 px-6 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                            >
                                Aloita 14 päivän kokeilu
                            </motion.button>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
                        >
                            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                                <Users className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                            <div className="mb-6">
                                <span className="text-2xl font-bold">Ota yhteyttä</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {features.enterprise.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 px-6 rounded-lg border-2 border-black text-black font-medium hover:bg-gray-50 transition-colors"
                            >
                                Pyydä tarjous
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-20 max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12">Usein kysytyt kysymykset</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Voinko vaihtaa pakettia myöhemmin?</h3>
                                <p className="text-gray-600">Kyllä, voit päivittää tai alentaa pakettisi milloin tahansa. Muutos astuu voimaan seuraavan laskutuskauden alussa.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Mitä jos ylitän kuukausikiintiöni?</h3>
                                <p className="text-gray-600">Jos ylität kuukausikiintiösi, voit joko päivittää pakettisi tai maksaa ylimääräisistä kuvista erikseen.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Onko palvelussa sitoutumisaikaa?</h3>
                                <p className="text-gray-600">Ei, palvelumme on kuukausimaksullinen ilman sitoutumisaikaa. Voit peruuttaa tilauksesi milloin tahansa.</p>
                            </div>
                        </div>
                    </motion.div>
                    <FAQ />
                </div>
            </main>
        </div>
    )
}


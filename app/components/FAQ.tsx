'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react'; // Importing icons for open/closed state

interface FAQ {
    question: string;
    answer: string;
}

export const FAQ = () => {
    // State to track which FAQ is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Toggle function to open/close the FAQ
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Close if the same FAQ is clicked, else open the clicked one
    };

    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Usein kysytyt kysymykset</h2>
                    <p className="text-xl text-gray-600">
                        Vastauksia yleisimpiin kysymyksiin PakettiProsta
                    </p>
                </motion.div>
                <div className="max-w-3xl mx-auto">
                    {[
                        {
                            question: 'Miten PakettiPro eroaa muista lähetyspalveluista?',
                            answer: 'PakettiPro hyödyntää edistynyttä tekoälyä kuvantunnistuksessa, mikä automatisoi lähetysprosessin ja vähentää virheitä merkittävästi.'
                        },
                        {
                            question: 'Onko PakettiPro yhteensopiva kaikkien kuljetusyritysten kanssa?',
                            answer: 'Kyllä, PakettiPro on integroitu useimpien suomalaisten ja kansainvälisten kuljetusyritysten järjestelmiin, mukaan lukien Posti, Matkahuolto ja DHL.'
                        },
                        {
                            question: 'Kuinka luotettava kuvantunnistusteknologia on?',
                            answer: 'Kuvantunnistusteknologiamme on erittäin tarkka, tunnistustasomme on yli 99%. Järjestelmä oppii jatkuvasti, mikä parantaa tarkkuutta entisestään ajan myötä.'
                        },
                        {
                            question: 'Miten PakettiPro suojaa asiakastietoja?',
                            answer: 'Käytämme uusimpia tietoturvateknologioita ja noudatamme GDPR-säädöksiä. Kaikki data on salattua ja säilytetään turvallisesti EU:n alueella sijaitsevilla palvelimilla.'
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-8 border-b border-gray-300 pb-4"
                        >
                            <div
                                className="cursor-pointer flex items-center justify-between"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-xl font-semibold mb-2 flex items-start">
                                    <HelpCircle className="w-6 h-6 mr-2 flex-shrink-0 text-black" />
                                    {faq.question}
                                </h3>
                                <div className="flex items-center">
                                    {/* Display plus or minus icon based on FAQ state */}
                                    {openIndex === index ? (
                                        <Minus size={18} className="text-gray-600" />
                                    ) : (
                                        <Plus size={18} className="text-gray-600" />
                                    )}
                                </div>
                            </div>

                            {/* Collapsible answer */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: openIndex === index ? 'auto' : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-600 ml-8">{faq.answer}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

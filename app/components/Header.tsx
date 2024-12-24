'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { Menu, X } from 'lucide-react'; // Importing the hamburger (Menu) and close (X) icons

export function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Track menu open state

    // Toggle the menu visibility
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="w-full bg-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-black">
                        Paketti AI
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="#" className="text-gray-600 hover:text-black">Tuotteet</Link>
                        <Link href="#" className="text-gray-600 hover:text-black">Asiakkaat</Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-black">Hinnoittelu</Link>
                        <Link href="#" className="text-gray-600 hover:text-black">Opi</Link>

                    </nav>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-600">
                            {isMobileMenuOpen ? (
                                <X size={24} /> // Close icon when the menu is open
                            ) : (
                                <Menu size={24} /> // Hamburger menu icon when the menu is closed
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white space-y-4 mt-4 py-4 px-6`}
                >
                    <Link href="#" className="block text-gray-600 hover:text-black">Tuotteet</Link>
                    <Link href="#" className="block text-gray-600 hover:text-black">Asiakkaat</Link>
                    <Link href="/pricing" className="block text-gray-600 hover:text-black">Hinnoittelu</Link>
                    <Link href="#" className="block text-gray-600 hover:text-black">Opi</Link>

                    {/* Login and Sign Up buttons inside mobile menu */}
                    <div className="mt-4 space-y-4">
                        <Button variant="secondary" as="link" href="/login" className="w-full text-center">
                            Kirjaudu
                        </Button>
                        <Button as="link" href="/signup" className="w-full text-center">
                            Rekisteröidy
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

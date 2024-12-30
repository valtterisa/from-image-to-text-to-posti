import { login, signup } from './actions'
import React from 'react';
import { Github, Twitter, Mail, Apple, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="md:min-h-screen bg-gradient-to-br from-[#eab308] to-[#fbbf24] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="mt-2 text-gray-600">Sign in to your account</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="h-4 w-4 text-[#eab308] focus:ring-[#eab308] border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                    <button type="button" className="text-sm font-medium text-[#eab308] hover:text-[#d69e06]">
                                        Forgot password?
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#eab308] hover:bg-[#d69e06] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eab308]"
                                formAction={login}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        {[Github, Apple, Chrome, Twitter, Mail].map((Icon, index) => (
                            <button
                                key={index}
                                className="flex justify-center items-center w-full h-10 border border-gray-300 rounded-md hover:bg-[#eab308] hover:text-white transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account?</span>{" "}
                        <Link href="/signup" className="font-medium text-[#eab308] hover:text-[#d69e06]">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { Github, Twitter, Mail, Apple, Chrome } from 'lucide-react';
import { signup } from '../login/actions';

type SignupFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

type FormErrors = Partial<Record<keyof SignupFormData, string>>;

export default function SignupForm() {
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!formData.terms) {
            newErrors.terms = 'You must agree to the terms and conditions.';
        }
        return newErrors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            // Create a FormData instance to match the expected input for the signup function
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.password);
            formDataToSubmit.append('confirmPassword', formData.confirmPassword);
            formDataToSubmit.append('terms', formData.terms.toString());

            signup(formDataToSubmit); // Submit the form data
        } else {
            setErrors(newErrors);
        }
    };


    return (
        <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-[#eab308] focus:border-[#eab308]`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="flex items-center">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleChange}
                        className={`h-4 w-4 text-[#eab308] focus:ring-[#eab308] border ${errors.terms ? 'border-red-500' : 'border-gray-300'
                            } rounded`}
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the <a href="#" className="text-[#eab308] hover:text-[#d69e06]">Terms and Conditions</a>
                    </label>
                </div>
                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#eab308] hover:bg-[#d69e06] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eab308]"
                >
                    Sign Up
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                <span className="text-gray-600">Already have an account?</span>{' '}
                <a href="/login" className="font-medium text-[#eab308] hover:text-[#d69e06]">
                    Log in
                </a>
            </div>
        </div>
    );
}

import React from 'react';
import SignupForm from '../components/SignupForm';


export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eab308] to-[#fbbf24] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
                        <p className="mt-2 text-gray-600">Sign up to get started</p>
                    </div>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}


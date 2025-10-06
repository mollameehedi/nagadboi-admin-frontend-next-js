'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png'; // Placeholder: assuming logo is available

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        setMessage('');

        if (!email) {
            setMessage('Please enter your email address.');
            return;
        }

        setLoading(true);

        // --- Placeholder for actual API call (e.g., Appwrite's createRecovery) ---
        console.log('Sending password reset email to:', email);

        // Simulate API call delay
        setTimeout(() => {
            setLoading(false);
            // Assuming the API call was successful:
            setMessage(`Password reset link sent to ${email}. Check your inbox!`);
            setEmail(''); // Clear the input after success
        }, 2000);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white min-h-screen shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center p-6 sm:p-12">
                    <div className='flex items-center justify-content-center'>
                        <div className='w-[385px]'>
                            <div className="text-center mb-6">
                                {/* Assuming the logo path is correct */}
                                <Image src={logo} height={40} alt="Cashbook app logo" className="mx-auto" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                                Reset Password
                            </h1>
                            <p className="text-sm text-gray-500 mb-8 text-center"> Enter your email and we will send you a link to reset your password.</p>

                            <form onSubmit={handleReset} className="w-full max-w-md flex flex-col items-center border border-gray-200 p-8 rounded-lg shadow-lg">
                                <div className="space-y-6 w-full">

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    {/* Message Display */}
                                    {message && (
                                        <div className={`text-sm p-3 rounded-lg ${message.includes('sent') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        <span>{loading ? 'Sending Link...' : 'Send Reset Link'}</span>
                                    </button>

                                    {/* Back to Login Link */}
                                    <div className="text-sm text-center">
                                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                            Back to Log In
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/public/logo.png'; // Placeholder: assuming logo is still available
import Link from 'next/link';
import { redirect } from 'next/navigation';
// Removed: Banner, as it's not present in the original usage, and LoginForm import

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        
        // --- Placeholder for actual API call ---
        console.log('Attempting login with:', { email, password });
        
        // Simulate API call delay (Replace this with your actual authentication logic, e.g., using Appwrite)
        setTimeout(() => {
            setLoading(false);
            // On successful login:
            redirect('admin/dashboard');
            // On failed login, you would set an error state here
        }, 1500); 
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white min-h-screen shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
                {/* The entire LoginForm content is now directly inside the Login page */}
                <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center p-6 sm:p-12">
                    <div className='flex items-center justify-content-center'>
                        <div className='w-[385px]'>
                            <div className=" text-center mb-6">
                                {/* Assuming the logo path is correct */}
                                <Image src={logo} height={40} alt="Cashbook app logo" className="mx-auto" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                                Log In
                            </h1>
                            <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col items-center border border-gray-200 p-8 rounded-lg shadow-lg">
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

                                    {/* Password Input and Forgot Password Link */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                        <div className="text-right mt-1">
                                            <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        <span>{loading ? 'Logging in...' : 'Log In'}</span>
                                    </button>


                                    <div className="text-sm text-gray-500">
                                        <p className="mb-2 text-sm font-regular ">
                                            By clicking Log In, you are indicating that you accept our <a href="#" className=" text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                                        </p>
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

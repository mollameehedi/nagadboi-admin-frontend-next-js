'use client';
import React from 'react';
import Banner from '@/components/auth/Banner';
import RegistrationForm from '@/components/auth/RegistrationForm';

const register = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white min-h-screen shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
                {/* Left side: Slick Slider for images (col-span-1) */}
                <Banner/>
                {/* Right side: Login form (col-span-2) */}
                <RegistrationForm/>
            </div>
        </div>
    );
};

export default register;
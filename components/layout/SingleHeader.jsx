"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../public/logo.png';
import { BiChevronDown } from 'react-icons/bi'
import { BsBoxArrowLeft } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import RounIcon from '@/components/Common/RounIcon';
import Link from 'next/link';

const SingleHeader = () => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
      <header className="flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <Link href="/dashboard/cashbooks">
          
          <Image src={logo} alt="alt" width={70} height={50} className='h-[50px] w-auto m-auto cursor-pointer' />
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-sm hover:bg-gray-100 focus:outline-none"
          >
            <RounIcon className="flex items-center justify-center font-bold text-primary">
              M
            </RounIcon>
            <span className="text-sm font-semibold text-gray-800 hidden md:inline">MD. Hazzaz Bin Faiz</span>
            <BiChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black/10 ring-opacity-5 z-10">
              <div className="py-1">
                <div className="flex items-center space-x-2 p-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-lg text-primary">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">MD. Hazzaz Bin Faiz</div>
                    <div className="text-xs text-gray-500">+8801774378409</div>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
                  <span className="text-sm text-gray-600">Your Profile</span>
                  <AiOutlineUser className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
                  <span className="text-sm text-gray-600">Logout</span>
                  <BsBoxArrowLeft className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
  )
}

export default SingleHeader
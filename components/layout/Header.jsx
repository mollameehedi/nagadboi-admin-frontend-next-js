"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { BsBoxArrowLeft } from 'react-icons/bs'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
   <header className="flex items-center justify-between h-[60px] px-6 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-gray-800"></h1>
           <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                          M
                        </div>
                        <span className="text-sm font-semibold text-gray-800 hidden md:inline">MD. Hazzaz Bin Faiz</span>
                        <BiChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg border-gray-200 bg-white border  z-999">
                          <div className="py-1">
                            <div className="flex items-center space-x-2 p-4">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg">
                                M
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-800">MD. Hazzaz Bin Faiz</div>
                                <div className="text-xs text-gray-500">+8801774378409</div>
                              </div>
                            </div>
                            <div className="border-t border-gray-200"></div>
                            <Link href='/profile' className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
                              <span className="text-sm">Your Profile</span>
                              <AiOutlineUser className="w-4 h-4 text-gray-500" />
                            </Link>
                            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
                              <span className="text-sm">Logout</span>
                              <BsBoxArrowLeft className="w-4 h-4 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
        </header>
  )
}

export default Header
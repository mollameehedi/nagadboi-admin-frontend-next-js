"use client"
import React from 'react'
import { IoMdClose } from 'react-icons/io';

const CenterModal = ({title,children,onClose,isOpen,handleSubmite,className}) => {
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600/70 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white w-full max-w-xl mx-auto rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-6 pb-3 border-b-1 border-gray-200">
            <h3 className="text-xl font-medium text-gray-900">{ title }</h3>
            <button onClick={onClose} className='border border-gray-200 rounded-sm p-2 cursor-pointer'>
              <IoMdClose />
            </button>
          </div>
          <div className={` py-3 space-y-4 ${className}`}>
           {children}
          </div>
        </div>
      </div>
    );
}

export default CenterModal
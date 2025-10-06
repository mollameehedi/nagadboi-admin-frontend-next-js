import Card from '@/components/Common/Card';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

const HelpDoc = ({ title, content }) => (
  <div className="flex-1 p-8">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
    <div className="prose max-w-none text-gray-500">
      <p>{content}</p>
      <div className=" w-3/5 shadow-sm  bg-primary/10 rounded-4 p-6 mt-10">
        <h4 className="font-semibold  text-gray-900 text-2xl mb-2">Was this helpful ?</h4>
        <p className="text-sm text-gray-600 mb-4">Your feedback helps us improve our docs.</p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-green-100">
            <FaCheckCircle className="text-green-500" />
            <span>Yes</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-red-100">
            <TiDelete className="text-red-500" />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HelpDoc
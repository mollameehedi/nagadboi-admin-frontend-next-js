"use client"
import Icons from '@/app/assets/Icon';
import SingleHeader from '@/components/layout/SingleHeader';
import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import dashboardImage from '@/public/dashboard.png'
import Image from 'next/image';
import Card from '@/components/Common/Card';
import { IoMdClose } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import EmailAddPopup from '@/components/Screen/Common/EmailAddPopup';

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <>
    <SingleHeader/>
    <div className="flex-1 p-8 w-3/11 mx-auto">
      <div className="">
        <Card className="p-5">
          <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700">
            M
          </div>
          <div>
            <div className="text-xl text-gray-900 font-bold">MD. Hazzaz Bin Faiz</div>
            <div className="text-sm text-gray-500">+8801774378409</div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
          <div className="flex items-center mb-2">
            <Icons.EmailPlush  className="w-[35px] h-[35px] mr-3"/>
            <span className="font-semibold text-green-800">Add Email ID to Profile</span>
          </div>
          <p className="text-sm text-green-700">Login via verified email on mobile app & desktop</p>
          <p className="text-sm text-green-700">Get monthly summary on email (Coming Soon)</p>
          <button className="mt-4 px-4 py-2 text-sm font-semibold text-green-800 bg-green-200 rounded-lg hover:bg-green-300"  onClick={() => setIsEmailModalOpen(true)}>
            + Add Email
          </button>
        </div>

        <div className="flex space-x-4 mb-6 border-b-1 border-gray-200 pb-5">
          <button className="flex items-center px-5 py-2 border-1 border-gray-200 text-primary rounded-sm text-sm hover:bg-gray-200 cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
            <FaRegEdit className='mr-2'/>
            Edit Profile
          </button>
          <button className="flex items-center px-5 py-2  text-red-700 rounded-sm text-sm hover:bg-gray-200">
            <MdLogout />
            Logout
          </button>
        </div>

        <h3 className="text-xs font-bold text-gray-400 mb-4">Preferences</h3>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-medium text-base">Notifications</div>
            <div className="text-sm text-gray-500">Get notified for entries from group books</div>
          </div>
          <div onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-6' : ''}`}
            ></div>
          </div>
        </div>
        </Card>
        <p className="text-sm text-gray-400 text-right">Since 09 Nov, 2021</p>
      </div>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
       
          <Image src={dashboardImage} height={100} width={600} alt="Mobile App Preview" className="w-full h-auto rounded-sm border-3 border-primary" />
       
      </div>
        {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600/40 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-sm shadow-lg">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-xl font-medium text-gray-900">Update Profile Details</h3>
              <button onClick={() => setIsEditModalOpen(false)}  className='border border-gray-200 rounded-sm p-2 cursor-pointer'>
                <IoMdClose />
              </button>
            </div>
            <div className="mt-2 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="MD. Hazzaz Bin Faiz" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. username@example.com" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="+8801774378409" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-gray-600 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}

      
      {/* Add Email Modal */}
      <EmailAddPopup isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </div>
    </>
  );
};

export default Profile
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { FaCogs } from 'react-icons/fa';
import { IoGlobe, IoInvertModeOutline, IoText } from 'react-icons/io5';

const WebSiteLayout = ({children,title,activesidebar}) => {


    const TABS = [
    { id: 'general', name: 'General Setting', icon: FaCogs},
    { id: 'about', name: 'About Us', icon: IoGlobe},
    { id: 'blog', name: 'Blog', icon: IoText},
    { id: 'logo', name: 'Trusted Logo', icon: IoInvertModeOutline},
    { id: 'social', name: 'Social Link', icon: IoInvertModeOutline},
    { id: 'faq', name: 'Manage FAQ', icon: IoInvertModeOutline},
    { id: 'contact', name: 'Contact Details', icon: IoInvertModeOutline},
];
    return (

        <>
            <div className="flex justify-between items-center bg-white p-5 border-b border-gray-200">
                <div className="flex items-center space-x-2 text-gray-900">
                    {/* Mock Link back to dashboard */}
                    <a href="#" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition">
                        <BsArrowLeft className="w-4 h-4 font-medium" />
                    </a>
                    <span className="font-bold text-xl text-indigo-600">Website Manager</span>
                    <span className="font-medium text-xl text-gray-900 ml-4 hidden sm:inline-block">/ {title}</span>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar Navigation */}
                <nav className="w-full lg:w-64 bg-gray-50 p-4 border-r border-gray-200">
                    <ul className="space-y-1">
                        {TABS.map(tab => {
                            const isActive = activesidebar === tab.id;
                            return (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center w-full p-3 rounded-lg font-semibold text-left transition-all duration-200 
                                                    ${isActive
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                                                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'}`
                                        }
                                    >
                                        <span className="truncate">{tab.name}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
          
            <div>
                {children}
            </div>
              </div>
        </>
    )
}

export default WebSiteLayout
'use client'
import { AppRoutes } from '@/app/constants/routes';
import Card from '@/components/Common/Card';
import CreateBtn from '@/components/Common/CreateBtn';
import CreateAlertModal from '@/components/Screen/Notification/CreateAlertModal';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
 
const IconAlertTriangle = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconPlus = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;


let nextAlertId = 4;



// Content 1: System Alerts Management
const Notification = () => {
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'Maintenance', message: 'Scheduled maintenance for the database layer will occur on 2024-10-25 at 02:00 UTC.', severity: 'Info', date: '2024-10-15' },
        { id: 2, type: 'Update', message: 'Platform version 2.1.0 deployed successfully. New features available.', severity: 'Success', date: '2024-10-10' },
        { id: 3, type: 'Incident', message: 'High latency detected in authentication service between 14:00 and 14:30 UTC. Issue resolved.', severity: 'Warning', date: '2024-10-08' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getSeverityClasses = (severity) => {
        switch (severity) {
            case 'Info': return 'bg-blue-100 text-blue-800 border-blue-500';
            case 'Success': return 'bg-green-100 text-green-800 border-green-500';
            case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-500';
            case 'Critical': return 'bg-red-100 text-red-800 border-red-500';
            default: return 'bg-gray-100 text-gray-800 border-gray-500';
        }
    };

    const handleNewAlertSave = (newAlertData) => {
        const newAlert = {
            id: nextAlertId++,
            date: new Date().toISOString().slice(0, 10),
            ...newAlertData,
        };
        setAlerts(prev => [newAlert, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                <div className="flex items-center space-x-2 text-gray-900">
                    <Link href={AppRoutes.admin.dashboard}> <FaArrowLeft className="w-4 h-4 font-medium  " /></Link>

                    <span className="font-medium text-base ">System Alerts</span>
                </div>
                <div className="flex space-x-4">
                    <CreateBtn handleClick={() => setIsModalOpen(true)} text='Create New Alert' />
                </div>
            </div>

<div className="flex justify-between items-center mb-8">
                {/* Search Bar */}
                <h3 className="text-xl font-semibold text-gray-800">System Alerts (Global Notifications)</h3>
            </div>
            
            <div className="space-y-4 pt-4">
                {alerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-xl border-l-4 shadow-sm transition-shadow hover:shadow-lg ${getSeverityClasses(alert.severity)} flex items-start`}>
                        <IconAlertTriangle className="w-6 h-6 mr-3 mt-1 opacity-75"/>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-sm uppercase">{alert.type} - {alert.severity}</span>
                                <span className="text-xs font-medium opacity-80">{alert.date}</span>
                            </div>
                            <p className="text-sm mt-1">{alert.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <CreateAlertModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleNewAlertSave} />
        </div>
    );
};




export default Notification;

"use client"
import { AppRoutes } from '@/app/constants/routes';
import Card from '@/components/Common/Card';
import CreateBtn from '@/components/Common/CreateBtn';
import EditTemplateModal from '@/components/Screen/Notification/EditTemplateModal';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';

const EmailSmsTemplates = () => {
    // UPDATED TEMPLATE DATA with subject and body
    const initialTemplates = [
        { id: 'welcome', name: 'Welcome New Member', type: 'Email', usage: 'User Onboarding', subject: 'Welcome to our Platform!', body: 'Hello {{USER_NAME}},\n\nWelcome aboard! We are excited to have you join our community. Your journey starts now...\n\nThank you,\nThe Team' },
        { id: 'password_reset', name: 'Password Reset Code', type: 'SMS & Email', usage: 'Security/Auth', subject: 'Your Password Reset Code', body: 'You requested a password reset. Your verification code is: {{RESET_CODE}}. This code expires in 10 minutes.' },
        { id: 'package_upgrade', name: 'Package Upgrade Confirmation', type: 'Email', usage: 'Billing/Subscription', subject: 'Upgrade Confirmed: {{PACKAGE_NAME}}', body: 'Congratulations, {{USER_NAME}}! Your account has been successfully upgraded to the {{PACKAGE_NAME}} package. Enjoy the new features.' },
        { id: 'tx_failed', name: 'Transaction Failed Notification', type: 'Email', usage: 'Financial', subject: 'Action Required: Transaction Failed', body: 'We were unable to process your payment for {{INVOICE_ID}}. Please update your payment information as soon as possible.' },
    ];

    const [templates, setTemplates] = useState(initialTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = (template) => {
        setSelectedTemplate(template);
        setIsEditModalOpen(true);
    };

    const handleSaveTemplate = (id, newContent) => {
        setTemplates(prev => prev.map(t =>
            t.id === id ? { ...t, ...newContent } : t
        ));
        setIsEditModalOpen(false);
        setSelectedTemplate(null);
        console.log(`Template ${id} saved with new content:`, newContent);
        alert(`Template "${newContent.name}" saved successfully! (Simulated)`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                <div className="flex items-center space-x-2 text-gray-900">
                    <Link href='/Admin/dashboard'> <FaArrowLeft className="w-4 h-4 font-medium  " /> </Link>
                    <Link href={AppRoutes.admin.notification.index.path}> Notification</Link>

                    <span className="font-medium text-base ">Email/SMS Templates</span>
                </div>
            </div>
             <div className="flex justify-between items-center mb-8">
                {/* Search Bar */}
                <h3 className="text-xl font-semibold text-gray-800">Email/SMS Templates</h3>
            </div>
            <div className="rounded-sm border-gray-200 overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {templates.map((template) => (
                            <tr key={template.id} className="hover:bg-indigo-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.type.includes('SMS') ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {template.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-center">
                                    <button
                                        onClick={() => handleEdit(template)}
                                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition font-medium"
                                    >
                                        Edit Content
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditTemplateModal
                show={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedTemplate(null);
                }}
                template={selectedTemplate}
                onSave={handleSaveTemplate}
            />
        </div>
    );
};


export default EmailSmsTemplates
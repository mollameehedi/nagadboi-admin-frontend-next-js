"use client"
import CreateBtn from '@/components/Common/CreateBtn';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import PackageModal from '@/components/Screen/package/PackageModal';
import React, { useState, useMemo, useCallback } from 'react';

const IconArrowLeft = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconPlus = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const IconEdit = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const IconTrash = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconPackage = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const IconUsers = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm-5 8a.75.75 0 00-.75.75v3.5a2.75 2.75 0 002.75 2.75h14.5a.75.75 0 00.75-.75v-3.5a2.75 2.75 0 00-2.75-2.75H7a.75.75 0 00-.75.75z" /></svg>;
const IconBriefcase = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.513 23.513 0 0112 15c-3.187 0-6.15-.717-8.73-1.745M21 13.255V21H3v-7.745m18 0a2 2 0 00-2-2h-3m-6 0h-3M3 13.255a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v4.255a2 2 0 01-2 2zM12 9a2 2 0 110 4 2 2 0 010-4z" /></svg>;


// =========================================================
// MOCK DATA AND UTILITIES
// NOTE: Added totalMembers and totalBusinesses to package data
// =========================================================

let nextPackageId = 2004;

const allPackages = [
    { id: 2001, name: 'Free Tier', price: 0.00, duration: 'Perpetual', features: ['1 User', 'Basic Analytics'], status: 'Active', totalMembers: 890, totalBusinesses: 45 },
    { id: 2002, name: 'Pro Monthly', price: 29.99, duration: 'Monthly', features: ['10 Users', 'Advanced Reports', 'Priority Support'], status: 'Active', totalMembers: 312, totalBusinesses: 12 },
    { id: 2003, name: 'Enterprise Annual', price: 299.99, duration: 'Annual', features: ['Unlimited Users', 'Dedicated Server', 'Custom Integration'], status: 'Draft', totalMembers: 43, totalBusinesses: 1 },
];

/**
 * Custom Card component (replicating the imported Card)
 */
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
        {children}
    </div>
);

/**
 * Package Add/Edit Modal Component
 * NOTE: totalMembers and totalBusinesses are omitted as they are calculated metrics, not editable configurations.
 */




// =========================================================
// MAIN PACKAGE MANAGEMENT COMPONENT
// =========================================================

const Package = () => {
    const [packages, setPackages] = useState(allPackages);
    const [searchTerm, setSearchTerm] = useState('');
    // null for viewing list, object for editing/viewing, true for adding new
    const [activePackage, setActivePackage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null); // { id, message } for confirmation

    // Filter packages based on search term
    const filteredPackages = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return packages.filter(p =>
            p.name.toLowerCase().includes(lowerCaseSearch) ||
            p.id.toString().includes(lowerCaseSearch)
        );
    }, [packages, searchTerm]);

    // Handlers for CRUD operations
    const handleSave = useCallback((newPackage) => {
        if (newPackage.id < nextPackageId) {
            // Edit
            setPackages(ps => ps.map(p => p.id === newPackage.id ? newPackage : p));
        } else {
            // Add
            setPackages(ps => [...ps, newPackage]);
        }
        setActivePackage(null); // Close modal
    }, []);

    const handleDelete = useCallback((id) => {
        setConfirmAction({
            id,
            message: `Are you sure you want to permanently delete Package #${id}? This action cannot be undone and will affect all assigned users.`,
        });
    }, []);

    const confirmActionHandler = () => {
        if (!confirmAction) return;

        // Delete
        setPackages(ps => ps.filter(p => p.id !== confirmAction.id));
        
        setConfirmAction(null); // Close modal
    };

    return (
        <>
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-gray-200">
                    <div className="flex items-center space-x-3 text-gray-900 mb-4 sm:mb-0">
                        {/* Link is replaced with a simple span/div since we don't have Next.js routing */}
                        <span className="cursor-pointer text-gray-500 hover:text-indigo-600 transition">
                            <IconArrowLeft className="w-5 h-5 font-medium" />
                        </span>
                        <span className="font-medium text-xl flex items-center">
                            <IconPackage className="w-5 h-5 mr-2 text-indigo-600"/>
                            Package Management
                        </span>
                    </div>
                    <div className="flex space-x-4 w-full sm:w-auto">
                         <CreateBtn handleClick={() => setActivePackage(true)} text='Add New Package'/>
                    </div>
                </div>

                {/* Controls and Search */}
                <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Package List ({filteredPackages.length})</h3>
                    <div className="w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search by ID or Package Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                </div>

                {/* Package List Table */}
                <Card className="mx-5 mb-5 shadow-none border-t border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Duration</th>
                                    {/* NEW COLUMNS */}
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Businesses</th>
                                    {/* END NEW COLUMNS */}
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPackages.length > 0 ? (
                                    filteredPackages.map((pkg) => (
                                        <tr key={pkg.id} className="hover:bg-indigo-50 transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.id}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700 font-semibold max-w-xs">{pkg.name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                <span className="font-bold text-gray-900">${pkg.price.toFixed(2)}</span> / {pkg.duration}
                                            </td>
                                            {/* NEW DATA CELLS */}
                                            <td className="px-4 py-4 text-sm text-gray-700 text-center">
                                                <span className='flex items-center justify-center text-indigo-600 font-bold'>
                                                    <IconUsers className='w-4 h-4 mr-1'/> {pkg.totalMembers.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700 text-center">
                                                <span className='flex items-center justify-center text-green-600 font-bold'>
                                                    <IconBriefcase className='w-4 h-4 mr-1'/> {pkg.totalBusinesses.toLocaleString()}
                                                </span>
                                            </td>
                                            {/* END NEW DATA CELLS */}
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                                      pkg.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                                                >
                                                    {pkg.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <div className="flex justify-center space-x-2">
                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() => setActivePackage(pkg)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition"
                                                        title="Edit Package Details"
                                                    >
                                                        <IconEdit className="w-5 h-5" />
                                                    </button>
                                                    
                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition"
                                                        title="Delete Package"
                                                    >
                                                        <IconTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                            {searchTerm ?
                                                `No packages found matching "${searchTerm}".` :
                                                'No packages available. Click "Add New Package" to start.'
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Create/Edit Modal */}
            {(activePackage !== null) && (
                <PackageModal
                    activePackage={activePackage !== true ? activePackage : null}
                    onClose={() => setActivePackage(null)}
                    isOpen={true}
                    onSave={handleSave}
                />
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                show={confirmAction !== null}
                title={'Delete Package'}
                message={confirmAction?.message || ''}
                onConfirm={confirmActionHandler}
                onCancel={() => setConfirmAction(null)}
            />
        </>
    );
};

export default Package;

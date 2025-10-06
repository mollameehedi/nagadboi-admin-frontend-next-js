"use client"
import React, { useState } from 'react'
import { FiCornerUpLeft, FiInfo, FiKey, FiPlusSquare, FiSave, FiShield } from 'react-icons/fi';
import { MOCK_PERMISSIONS } from '@/app/Data/permission';
import Link from 'next/link';
import { AppRoutes } from '@/app/constants/routes';
import FormInput from '@/components/Common/FormInput';

const Create = () => {
    // State to hold the new role data
    const [newRole, setNewRole] = useState({
        name: '',
        description: '',
        permissions: [],
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);

    // Simulated Save handler
    const handleSave = (newRoleData) => {
        setRoles(prevRoles => [...prevRoles, newRoleData]);
        // Simulate navigation back to the list page after success
        // setCurrentPage(ROUTES.ROLE_LIST.name);
        console.log("New Role Saved:", newRoleData);
    };

    // Simulated Cancel/Navigation handler
    const handleCancel = () => {
        setCurrentPage(ROUTES.ROLE_LIST.name);
        console.log("Navigation back to Role List");
    };




    // Handler for text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole(prev => ({ ...prev, [name]: value }));
    };

    // Handler for permission checkboxes
    const handlePermissionChange = (permission) => {
        setNewRole(prev => {
            const { permissions } = prev;
            if (permissions.includes(permission)) {
                // Remove permission
                return { ...prev, permissions: permissions.filter(p => p !== permission) };
            } else {
                // Add permission
                return { ...prev, permissions: [...permissions, permission] };
            }
        });
    };

    // Submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!newRole.name || !newRole.description || newRole.permissions.length === 0) {
            setSubmissionStatus({ type: 'error', message: 'Please fill in all fields and select at least one permission.' });
            return;
        }

        // Simulate successful save
        setSubmissionStatus({ type: 'success', message: `Role '${newRole.name}' saved successfully!` });

        // Pass the new role data up to the parent container
        handleSave({ ...newRole, id: Date.now() }); 
        
        // Reset form after a slight delay
        setTimeout(() => {
            setNewRole({ name: '', description: '', permissions: [] });
            setSubmissionStatus(null);
        }, 3000);
    };

    return (
        <div className="">

            {/* Submission Status Message */}
            {submissionStatus && (
                <div className={`p-4 mb-6 rounded-xl text-white ${
                    submissionStatus.type === 'success' 
                        ? 'bg-green-500 shadow-md' 
                        : 'bg-red-500 shadow-md'
                }`}>
                    {submissionStatus.message}
                </div>
            )}
  {/* Header and Add Button */}
        <div className="flex justify-between items-center p-2"> 
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <FiShield className="w-6 h-6 mr-3 text-indigo-600" />
                {AppRoutes.admin.role.index.label}
            </h3>
            {/* handleAdd prop is used here to navigate to the creation page */}
            <Link href={AppRoutes.admin.role.index.path}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                title="Add a new role"
            >
                <FiPlusSquare className="w-5 h-5 mr-2" />
                {AppRoutes.admin.role.index.label}
            </Link>
        </div>
           <div className='bg-white'>
             <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6  border border-gray-100">
                
                {/* Section 1: Basic Role Details */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2 mb-4">1. Basic Details</h2>
                    
                    <div>
                        <FormInput
                            type="text"
                            name="name"
                            label="Role Name"
                            id="name"
                            value={newRole.name}
                            handleChange={handleInputChange}
                            placeholder="e.g., Content Writer, Auditor"
                            className="block w-full  focus:border-indigo-500 focus:ring-indigo-500 p-3 transition"
                            isRequired={true}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={newRole.description}
                            onChange={handleInputChange}
                            placeholder="A concise summary of the role's responsibilities and authority."
                            className="block w-full rounded-sm p-3  focus:border-indigo-500 focus:ring-indigo-500 p-3rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500bg:gray-100 placeholder-gray-500 border border-gray-100 form-input"
                            required
                        ></textarea>
                        <p className="mt-2 text-xs text-gray-500 flex items-center">
                            <FiInfo className="w-3 h-3 mr-1" />
                            This description is visible when assigning the role to users.
                        </p>
                    </div>
                </div>

                {/* Section 2: Permissions Selection */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2 mb-4">2. Assign Permissions</h2>
                    
                    {Object.entries(MOCK_PERMISSIONS).map(([category, permissions]) => (
                        <div key={category} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">{category}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {permissions.map((permission) => (
                                    <div key={permission} className="flex items-start">
                                        <input
                                            id={permission}
                                            name="permissions"
                                            type="checkbox"
                                            checked={newRole.permissions.includes(permission)}
                                            onChange={() => handlePermissionChange(permission)}
                                            className="h-5 w-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                        />
                                        <label htmlFor={permission} className="ml-3 text-sm text-gray-700 cursor-pointer select-none">
                                            {permission}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    {newRole.permissions.length === 0 && (
                        <p className="text-red-500 text-sm font-medium text-center p-3 border border-red-200 bg-red-50 rounded-lg"> Please select at least one permission to define this role&apos;s access.</p>
                    )}
                </div>

                {/* Section 3: Action Buttons */}
                <div className="pt-5 border-t border-gray-100 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                        title="Discard changes and go back"
                    >
                        <FiCornerUpLeft className="w-5 h-5 mr-2" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!newRole.name || !newRole.description || newRole.permissions.length === 0}
                        className="flex items-center px-6 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/50 transform hover:scale-[1.01]"
                        title="Save the new role definition"
                    >
                        <FiSave className="w-5 h-5 mr-2" />
                        Create Role
                    </button>
                </div>
            </form>
           </div>
        </div>
    );
};

export default Create
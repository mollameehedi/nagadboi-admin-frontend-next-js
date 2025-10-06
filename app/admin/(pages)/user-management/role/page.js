"use client"
import React from 'react'
import { initialRoles } from '@/app/Data/role';
import { FiEdit, FiList, FiLock, FiPlusSquare, FiShield, FiTrash2 } from 'react-icons/fi';
import { AppRoutes } from '@/app/constants/routes';
import Link from 'next/link';


const Role = () => {
    const roles = initialRoles;

      const handleEdit = (role) => {
        setActiveRole(role);
        handleNavigate(ROUTES.ROLE_EDIT.name);
    };

    const handleAdd = () => {
        handleNavigate(ROUTES.ROLE_ADD.name);
    };

    const handleDelete = (role) => {
        // Since we cannot use confirm(), we'll use a simulated message in the console/alert
        if (window.confirm(`Are you sure you want to delete the role: ${role.name}?`)) {
            setRoles(roles.filter(r => r.id !== role.id));
            alert(`Role '${role.name}' successfully deleted.`);
        }
    };



    return (
    <div className="space-y-6">
        
        {/* Header and Add Button */}
        <div className="flex justify-between items-center p-2"> 
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <FiShield className="w-6 h-6 mr-3 text-indigo-600" />
                {AppRoutes.admin.role.index.label}
            </h3>
            {/* handleAdd prop is used here to navigate to the creation page */}
            <Link href={AppRoutes.admin.role.create.path}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                title="Add a new role"
            >
                <FiPlusSquare className="w-5 h-5 mr-2" />
                {AppRoutes.admin.role.create.label}
            </Link>
        </div>
        
        {/* Roles Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/5">Role Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider w-2/5">Description</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Users</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider hidden md:table-cell">Key Permissions</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-indigo-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {/* roles prop is mapped here */}
                        {roles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                                
                                {/* Role Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 flex items-center">
                                    <FiLock className="w-4 h-4 mr-2 text-indigo-500" />
                                    {role.name}
                                </td>

                                {/* Description */}
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <p className="truncate w-96 lg:w-auto">{role.description}</p>
                                </td>
                                
                                {/* User Count */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                    {role.users} {role.users === 1 ? 'User' : 'Users'}
                                </td>
                                
                                {/* Permissions List (Hidden on small screens) */}
                                <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.slice(0, 2).map((p, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                                {p.split(' ')[0]}
                                            </span>
                                        ))}
                                        {role.permissions.length > 2 && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                                +{role.permissions.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {/* handleEdit prop is used here to trigger edit action */}
                                    <button 
                                        onClick={() => handleEdit(role)} 
                                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors" 
                                        title="Edit Permissions"
                                    >
                                        <FiEdit className="w-5 h-5" />
                                    </button>
                                    {/* handleDeleteRequest prop is used here to trigger delete action */}
                                    <button 
                                        onClick={() => handleDeleteRequest(role)} 
                                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors" 
                                        title="Delete Role"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Footer Information */}
            <div className="p-4 border-t bg-gray-50 flex justify-between text-sm text-gray-500 rounded-b-2xl">
                <div className="flex items-center space-x-2">
                    <FiList className="w-4 h-4" />
                    <span>Total Roles: **{roles.length}**</span>
                </div>
                <div className="text-right">
                    Roles define permissions and access levels for users in the system.
                </div>
            </div>
        </div>
    </div>
)
};

export default Role
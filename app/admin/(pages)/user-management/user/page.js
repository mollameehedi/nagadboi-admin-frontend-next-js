"use client"
import { AppRoutes } from '@/app/constants/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlusSquare, FiTrash2 } from 'react-icons/fi';
import { getUsers } from '@/lib/user-service';

const UserList = ({  setActiveView, handleEdit, handleDelete }) => {
 const [users, setUsers] = useState([]);


    useEffect(() => {
       const params = {
      limit: 5,
      sort: 'name'
    };
    try {
      getUsers(params)
        .then(res => {
          setUsers(res.users);
        })
    } catch (error) {
      console.log(error);
      
    }

    },[]);

    
     return (
    
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">User List</h3>
            <Link href={AppRoutes.admin.user.create.path}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
                <FiPlusSquare className="w-5 h-5 mr-2" />
                Add New User
            </Link>
        </div>
        
        {/* User Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">{user.age}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.status}
                                    </span>
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors" title="Edit User">
                                        <FiEdit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(user.id, 'user')} className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors" title="Delete User">
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
   

export default UserList
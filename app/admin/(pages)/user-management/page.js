'use client';

import React, { useState, useMemo } from 'react';

// --- Placeholder Icon Imports ---
const FiUsers = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const FiPlusSquare = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const FiList = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const FiKey = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7 7l-2 2m-2-2l2-2M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm-5 5L2 10l3 3m14-3l3 3-3 3"></path></svg>;
const FiEdit = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const FiTrash2 = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
// --- End Placeholder Icon Imports ---

// --- Placeholder Data ---
const initialUsers = [
    { id: 1, name: 'Ashraf Khan', email: 'ashraf@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sonia Akter', email: 'sonia@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Raju Ahmed', email: 'raju@example.com', role: 'Viewer', status: 'Active' },
];

const initialRoles = [
    { id: 101, name: 'Admin', description: 'Full access to all system features.' },
    { id: 102, name: 'Editor', description: 'Can view and modify content and packages.' },
    { id: 103, name: 'Viewer', description: 'Read-only access to specific dashboards.' },
];

const initialPermissions = [
    { id: 'dashboard_view', name: 'Dashboard View', Admin: true, Editor: true, Viewer: true },
    { id: 'user_manage', name: 'User Management', Admin: true, Editor: false, Viewer: false },
    { id: 'package_create', name: 'Create Package', Admin: true, Editor: true, Viewer: false },
    { id: 'transaction_report', name: 'View Financial Report', Admin: true, Editor: true, Viewer: false },
    { id: 'role_manage', name: 'Role Management', Admin: true, Editor: false, Viewer: false },
];
// --- End Placeholder Data ---


// --- Sub-View Components ---

// 1. User List Component (User List, Edit, Delete)
const UserList = ({ users, setActiveView, handleEdit, handleDelete }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">User List</h3>
            <button
                onClick={() => setActiveView('addUser')}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
                <FiPlusSquare className="w-5 h-5 mr-2" />
                Add New User
            </button>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
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

// 2. Add/Edit User Form (Add User, User Edit)
const AddUserForm = ({ roles, activeUser, setActiveView, handleSaveUser }) => {
    const [formData, setFormData] = useState(activeUser || { name: '', email: '', role: roles[0]?.name || '', password: '' });
    const isEditMode = !!activeUser;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for Save/Update logic
        handleSaveUser(formData);
        setActiveView('userList');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        {roles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                </div>
                {/* Password (only if not editing or if explicitly changing) */}
                {!isEditMode && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required={!isEditMode} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                )}
                
                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => setActiveView('userList')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                        {isEditMode ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// 3. Role List Component (Role List, Edit, Delete)
const RoleList = ({ roles, setActiveView, handleEdit, handleDelete }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Role List</h3>
            <button
                onClick={() => setActiveView('addRole')}
                className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
                <FiPlusSquare className="w-5 h-5 mr-2" />
                Add New Role
            </button>
        </div>
        
        {/* Role Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {roles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{role.name}</td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">{role.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(role)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors" title="Edit Role">
                                        <FiEdit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(role.id, 'role')} className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors" title="Delete Role">
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

// 4. Add/Edit Role Form (Add Role, Role Edit)
const AddRoleForm = ({ activeRole, setActiveView, handleSaveRole }) => {
    const [formData, setFormData] = useState(activeRole || { name: '', description: '' });
    const isEditMode = !!activeRole;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for Save/Update logic
        handleSaveRole(formData);
        setActiveView('roleList');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Role' : 'Add New Role'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Name */}
                <div>
                    <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                    <input type="text" name="name" id="roleName" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                </div>
                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => setActiveView('roleList')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        {isEditMode ? 'Update Role' : 'Create Role'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// 5. Role Permission Manager (Role Permission)
const RolePermissionManager = ({ permissions, roles }) => {
    const [currentPermissions, setCurrentPermissions] = useState(permissions);

    const togglePermission = (roleName, permissionId) => {
        setCurrentPermissions(prev => prev.map(perm => 
            perm.id === permissionId ? { ...perm, [roleName]: !perm[roleName] } : perm
        ));
    };
    
    const handleSavePermissions = () => {
        // Placeholder for Save logic
        console.log("Saving Permissions:", currentPermissions);
        alert("Permissions saved successfully! (Check console for data)");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <FiKey className="w-6 h-6 mr-2 text-yellow-600" /> Role Permissions Matrix
            </h3>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Permission Name</th>
                            {roles.map(role => (
                                <th key={role.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {role.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentPermissions.map((permission) => (
                            <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">{permission.name}</td>
                                {roles.map(role => (
                                    <td key={`${permission.id}-${role.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                                        <input
                                            type="checkbox"
                                            checked={permission[role.name] || false}
                                            onChange={() => togglePermission(role.name, permission.id)}
                                            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleSavePermissions}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save Permissions
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---
const UserManagement = () => {
    // State for managing active view and temporary data for editing
    const [activeView, setActiveView] = useState('userList');
    const [users, setUsers] = useState(initialUsers);
    const [roles, setRoles] = useState(initialRoles);
    const [activeEditItem, setActiveEditItem] = useState(null); // Used for both User and Role editing

    // Define navigation items
    const navItems = useMemo(() => [
        { id: 'userList', name: 'User List', icon: FiUsers, group: 'User Management' },
        { id: 'addUser', name: 'Add User', icon: FiPlusSquare, group: 'User Management' },
        { id: 'roleList', name: 'Role List', icon: FiList, group: 'Role Management' },
        { id: 'addRole', name: 'Add Role', icon: FiPlusSquare, group: 'Role Management' },
        { id: 'rolePermission', name: 'Role Permission', icon: FiKey, group: 'Role Management' },
    ], []);

    // Handlers for User CRUD (Placeholder logic)
    const handleSaveUser = (userData) => {
        if (userData.id) {
            // Edit User
            setUsers(users.map(u => u.id === userData.id ? { ...u, ...userData } : u));
        } else {
            // Add User
            const newUser = { id: users.length + 1, ...userData, status: 'Active' };
            setUsers([...users, newUser]);
        }
        setActiveEditItem(null);
    };

    const handleEditUser = (user) => {
        setActiveEditItem(user);
        setActiveView('addUser'); // Reuse AddUserForm for editing
    };
    
    const handleDelete = (id, type) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            if (type === 'user') {
                setUsers(users.filter(u => u.id !== id));
            } else if (type === 'role') {
                setRoles(roles.filter(r => r.id !== id));
            }
        }
    };

    // Handlers for Role CRUD (Placeholder logic)
    const handleSaveRole = (roleData) => {
        if (roleData.id) {
            // Edit Role
            setRoles(roles.map(r => r.id === roleData.id ? { ...r, ...roleData } : r));
        } else {
            // Add Role
            const newRole = { id: Math.max(...roles.map(r => r.id)) + 1, ...roleData };
            setRoles([...roles, newRole]);
        }
        setActiveEditItem(null);
    };

    const handleEditRole = (role) => {
        setActiveEditItem(role);
        setActiveView('addRole'); // Reuse AddRoleForm for editing
    };

    // Component mapping function
    const renderContent = () => {
        switch (activeView) {
            case 'userList':
                return <UserList users={users} setActiveView={setActiveView} handleEdit={handleEditUser} handleDelete={handleDelete} />;
            case 'addUser':
                return <AddUserForm roles={roles} activeUser={activeEditItem} setActiveView={setActiveView} handleSaveUser={handleSaveUser} />;
            case 'roleList':
                return <RoleList roles={roles} setActiveView={setActiveView} handleEdit={handleEditRole} handleDelete={handleDelete} />;
            case 'addRole':
                return <AddRoleForm activeRole={activeEditItem} setActiveView={setActiveView} handleSaveRole={handleSaveRole} />;
            case 'rolePermission':
                return <RolePermissionManager permissions={initialPermissions} roles={roles} />;
            default:
                return <UserList users={users} setActiveView={setActiveView} handleEdit={handleEditUser} handleDelete={handleDelete} />;
        }
    };
    
    // Custom Navigation Button Component
    const NavButton = ({ item }) => (
        <button
            onClick={() => {
                setActiveView(item.id);
                setActiveEditItem(null); // Clear any active edit item on navigation
            }}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 
                ${activeView === item.id 
                    ? 'bg-indigo-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'}`
            }
        >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
            
            {/* Left Sidebar / Navigation Panel (User/Role Management) */}
            <nav className="w-full md:w-72 bg-white shadow-xl md:shadow-lg border-b md:border-r border-gray-200 p-6 flex-shrink-0">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
                    Management
                </h1>
                
                <div className="space-y-6">
                    {/* User Management Group */}
                    <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-indigo-500 mb-2">User Management</p>
                        <div className="space-y-1">
                            {navItems.filter(i => i.group === 'User Management').map(item => (
                                <NavButton key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Role Management Group */}
                    <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-green-500 mb-2">Role Management</p>
                        <div className="space-y-1">
                            {navItems.filter(i => i.group === 'Role Management').map(item => (
                                <NavButton key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default UserManagement;

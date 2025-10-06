"use client"
import Card from '@/components/Common/Card';
import Link from 'next/link';
import React, { useState, useMemo, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

// =========================================================
// MOCK DATA & ICONS
// =========================================================

const MOCK_ACTIVE_CUSTOMERS = [
    { id: 101, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', registeredDate: '2024-05-01', status: 'active' },
    { id: 102, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', registeredDate: '2024-05-15', status: 'active' },
    { id: 103, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', registeredDate: '2024-06-01', status: 'active' },
    { id: 104, name: 'Diana Prince', email: 'diana@example.com', phone: '555-0104', registeredDate: '2024-06-10', status: 'active' },
    { id: 105, name: 'Eve Adams', email: 'eve@example.com', phone: '555-0105', registeredDate: '2024-06-25', status: 'active' },
    { id: 106, name: 'Frank Miller', email: 'frank@example.com', phone: '555-0106', registeredDate: '2024-07-01', status: 'active' },
    { id: 107, name: 'Grace Lee', email: 'grace@example.com', phone: '555-0107', registeredDate: '2024-07-15', status: 'active' },
];

const MOCK_REJECTED_CUSTOMERS = [
    { id: 201, name: 'Victor Stone', email: 'victor@example.com', phone: '555-0201', registeredDate: '2024-04-01', status: 'rejected' },
    { id: 202, name: 'Wally West', email: 'wally@example.com', phone: '555-0202', registeredDate: '2024-04-10', status: 'deleted' },
];

// Inline SVG Icons
const IconSearch = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconEdit = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const IconTrash = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconUserGroup = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-3a1 1 0 01-1-1v-3.236a2 2 0 00-2.483-1.954l-1 .25A1.75 1.75 0 019 14.764V19a1 1 0 01-1 1H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2zM12 7a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const IconUsers = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 16H9a6 6 0 016-6zM3 20h18a1 1 0 001-1V6a1 1 0 00-1-1H3a1 1 0 00-1 1v13a1 1 0 001 1z" /></svg>;
const IconBan = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 11-12.728 12.728M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zM4 4l16 16" /></svg>;
const IconEye = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconCheck = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const IconArrowUp = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>;
const IconArrowDown = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const IconX = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const IconPlus = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;


// =========================================================
// REUSABLE COMPONENTS
// =========================================================

/**
 * Custom Form Modal for creating, viewing or editing customer details.
 */
const CustomerFormModal = ({ customer, mode, onClose, onSave }) => {
    const isViewMode = mode === 'view';
    const isCreateMode = mode === 'create';

    // Initial state based on mode
    const [name, setName] = useState(customer?.name || '');
    const [email, setEmail] = useState(customer?.email || '');
    const [phone, setPhone] = useState(customer?.phone || ''); // Added phone for creation

    const getTitle = () => {
        if (isViewMode) return `Details for ${customer?.name || 'Customer'}`;
        if (isCreateMode) return 'Create New Customer';
        return `Edit Customer: ${customer?.name}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email || !phone) {
            console.error("Name, Email, and Phone are required.");
            return;
        }

        if (isCreateMode) {
            // Generate necessary data for a new customer
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            
            onSave({
                id: Date.now(), // Mock ID generation
                name,
                email,
                phone,
                registeredDate: today,
                status: 'active',
            });
        } else {
            // Saving edited fields
            onSave({
                ...customer,
                name,
                email,
                phone,
            });
        }

        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <IconX className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                    {getTitle()}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Full Name"
                            disabled={isViewMode}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email Address"
                            disabled={isViewMode}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 555-1234"
                            disabled={isViewMode}
                            required
                        />
                    </div>

                    {/* Non-editable fields visible in View/Edit mode */}
                    {!isCreateMode && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                                <p className="w-full px-4 py-2 border border-gray-100 bg-gray-50 rounded-xl text-gray-600">
                                    {customer.registeredDate}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <p className={`w-full px-4 py-2 border rounded-xl font-semibold 
                                    ${customer.status === 'active' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                </p>
                            </div>
                        </>
                    )}

                    <div className="pt-4 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                            {isViewMode ? 'Close' : 'Cancel'}
                        </button>
                        {!isViewMode && (
                            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/50">
                                {isCreateMode ? 'Create Customer' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

// =========================================================
// DATATABLE COMPONENT (Unchanged - simplified for brevity)
// =========================================================

const ROW_OPTIONS = [5, 10, 20];

const DataTable = ({ data, columns, onActionRender, searchTerm }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROW_OPTIONS[0]);

    // 1. Sorting Logic
    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); 
    };

    // 2. Pagination Logic
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalPages === 0;

    // Helper to get sort icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? <IconArrowUp className="w-3 h-3 ml-1" /> : <IconArrowDown className="w-3 h-3 ml-1" />;
    };

    return (
        <div className="w-full">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${column.sortable ? 'hover:bg-gray-100 transition' : ''}`}
                                    onClick={() => column.sortable && requestSort(column.accessor)}
                                >
                                    <div className="flex items-center">
                                        {column.header}
                                        {column.sortable && getSortIcon(column.accessor)}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-indigo-50 transition-colors">
                                    {columns.map((column) => (
                                        <td 
                                            key={column.accessor} 
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                            onClick={() => column.accessor === 'name' || column.accessor === 'email' ? onActionRender(item, 'view') : null}
                                        >
                                            {column.render ? column.render(item) : item[column.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {onActionRender(item)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-10 text-center text-gray-500">
                                    {searchTerm ? 
                                        `No customers found matching "${searchTerm}".` : 
                                        'No customers in this list.'
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls (Unchanged) */}
            {sortedData.length > rowsPerPage && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-2xl">
                    <div className="flex items-center space-x-2">
                         <span className="text-sm text-gray-700 hidden sm:inline">Rows per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="text-sm border border-gray-300 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {ROW_OPTIONS.map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <p className="text-sm text-gray-700 mr-4 hidden sm:block">
                            Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * rowsPerPage, sortedData.length)}</span> of <span className="font-medium">{sortedData.length}</span> results
                        </p>
                        <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={isFirstPage}
                                className={`relative inline-flex items-center px-4 py-2 rounded-l-xl border text-sm font-medium ${isFirstPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={isLastPage}
                                className={`relative inline-flex items-center px-4 py-2 rounded-r-xl border text-sm font-medium ${isLastPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};


// =========================================================
// CORE COMPONENT: CustomerManagementPage
// =========================================================

const CustomerManagementPage = () => {
    const [activeCustomers, setActiveCustomers] = useState(MOCK_ACTIVE_CUSTOMERS);
    const [rejectedCustomers, setRejectedCustomers] = useState(MOCK_REJECTED_CUSTOMERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('registered'); // 'registered' or 'rejected'
    const [activeCustomer, setActiveCustomer] = useState(null); // Customer object for modal (only for edit/view)
    const [modalMode, setModalMode] = useState(null); // 'view', 'edit', or 'create'

    const currentData = activeTab === 'registered' ? activeCustomers : rejectedCustomers;

    // 1. Search/Filtering Logic
    const filteredCustomers = useMemo(() => {
        if (!searchTerm) return currentData;

        const lowerCaseSearch = searchTerm.toLowerCase();
        return currentData.filter(cust => 
            cust.name.toLowerCase().includes(lowerCaseSearch) ||
            cust.email.toLowerCase().includes(lowerCaseSearch) ||
            String(cust.id).includes(lowerCaseSearch)
        );
    }, [currentData, searchTerm]);

    // 2. Column Definition (Unchanged)
    const columns = useMemo(() => [
        { 
            header: 'ID', 
            accessor: 'id', 
            sortable: true,
            render: (customer) => (<span className="text-gray-500 font-mono text-xs p-1 bg-gray-100 rounded-md">#{customer.id}</span>)
        },
        { 
            header: 'Name', 
            accessor: 'name', 
            sortable: true,
            render: (customer) => (<span className="font-semibold text-indigo-700">{customer.name}</span>)
        },
        { 
            header: 'Email', 
            accessor: 'email', 
            sortable: true,
        },
        { 
            header: 'Phone', 
            accessor: 'phone', 
            sortable: true,
        },
        { 
            header: 'Reg. Date', 
            accessor: 'registeredDate', 
            sortable: true,
        },
        { 
            header: 'Status', 
            accessor: 'status', 
            sortable: true,
            render: (customer) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
            )
        },
    ], []);

    // 3. Action Handlers (Move customers, Save/Edit/Create)
    
    const handleCustomerSave = useCallback((customerData) => {
        if (customerData.registeredDate) {
            // Edit scenario (customerData has an existing ID and registeredDate)
            setActiveCustomers(prev => prev.map(c => c.id === customerData.id ? customerData : c));
        } else {
            // Create scenario (customerData is a new object from the modal)
            setActiveCustomers(prev => [...prev, customerData]);
        }
        
        setActiveCustomer(null);
        setModalMode(null);
    }, []);

    const handleMoveCustomer = useCallback((customer, newStatus) => {
        const actionText = newStatus === 'rejected' ? 'reject and move' : 'activate and move';
        if (!window.confirm(`Are you sure you want to ${actionText} customer ${customer.name}? (Simulated Confirm)`)) {
            return;
        }

        const updatedCustomer = { ...customer, status: newStatus };

        // Remove from current list
        if (activeTab === 'registered') {
            setActiveCustomers(prev => prev.filter(c => c.id !== customer.id));
        } else {
            setRejectedCustomers(prev => prev.filter(c => c.id !== customer.id));
        }

        // Add to new list
        if (newStatus === 'active') {
            setActiveCustomers(prev => [...prev, updatedCustomer]);
        } else {
            setRejectedCustomers(prev => [...prev, updatedCustomer]);
        }
        
        setSearchTerm('');
    }, [activeTab]);

    const handleDelete = useCallback((id) => {
        if (!window.confirm(`Are you sure you want to permanently delete this customer? (Simulated Confirm)`)) {
            return;
        }
        setRejectedCustomers(prev => prev.filter(c => c.id !== id));
    }, []);
    
    // 4. Modal Handlers
    const openModal = useCallback((customer, mode) => {
        setActiveCustomer(customer);
        setModalMode(mode);
    }, []);
    
    // Handler specifically for the Create button
    const openCreateModal = useCallback(() => {
        setActiveCustomer(null); // No customer object needed for creation
        setModalMode('create');
    }, []);

    const closeModal = useCallback(() => {
        setActiveCustomer(null);
        setModalMode(null);
    }, []);

    // 5. Dynamic Action Rendering for DataTable
    const actionRender = useCallback((customer) => {
        if (activeTab === 'registered') {
            return (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => openModal(customer, 'view')}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition"
                        title="View Details"
                    >
                        <IconEye className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => openModal(customer, 'edit')}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-100 transition"
                        title="Edit Customer"
                    >
                        <IconEdit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleMoveCustomer(customer, 'rejected')}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                        title="Reject Customer"
                    >
                        <IconBan className="w-5 h-5" />
                    </button>
                </div>
            );
        } else { // activeTab === 'rejected'
            return (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => openModal(customer, 'view')}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition"
                        title="View Details"
                    >
                        <IconEye className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleMoveCustomer(customer, 'active')}
                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition"
                        title="Activate Customer"
                    >
                        <IconCheck className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition"
                        title="Permanently Delete"
                    >
                        <IconTrash className="w-5 h-5" />
                    </button>
                </div>
            );
        }
    }, [activeTab, handleMoveCustomer, handleDelete, openModal]);

    return (
        <div className="">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                            <div className="flex items-center space-x-2 text-gray-900">
                                <Link  href='/Admin/dashboard'> <FaArrowLeft className="w-4 h-4 font-medium  " /></Link>
                               
                                <span className="font-medium text-base ">All Customer</span>
                            </div>
                            <div className="flex space-x-4">
                                  {activeTab === 'registered' && (
                                <button  
                        onClick={openCreateModal}  className="flex items-center space-x-2 px-4 py-2 text-base  text-primary font-medium hover:bg-gray-50 transition-colors">
                                    <IconPlus className="w-5 h-5 mr-2" />
                                    <span>Add Customer</span>
                                </button>
                                )}
                            </div>
                        </div>

            {/* Tab Navigation */}
            <div className=" my-6 flex space-x-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('registered')}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-xl transition ${
                        activeTab === 'registered' 
                        ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <IconUsers className="w-5 h-5 mr-2" />
                    Registered Customer List ({activeCustomers.length})
                </button>
                <button
                    onClick={() => setActiveTab('rejected')}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-xl transition ${
                        activeTab === 'rejected' 
                        ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <IconBan className="w-5 h-5 mr-2" />
                    Rejected/Deleted List ({rejectedCustomers.length})
                </button>
            </div>

            {/* Controls */}
            <div className=" bg-white py-4 pt-2 rounded-t-2xl flex flex-col md:flex-row justify-between items-center mb-0 border-b border-gray-100 ">
                 <h3 className="text-xl font-semibold text-gray-800">Customer List</h3>
                {/* Search Bar */}
                <div className="relative w-full md:w-80 order-2 md:order-1">
                    <input
                        type="text"
                        placeholder={`Search in ${activeTab} list...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                    />
                    <IconSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Customer List Table (Using DataTable) */}
            <div className="bg-white  overflow-hidden rounded-b-2xl border border-gray-100">
                <DataTable
                    data={filteredCustomers}
                    columns={columns}
                    onActionRender={actionRender}
                    searchTerm={searchTerm}
                />
            </div>

            {/* View/Edit/Create Modal */}
            {modalMode && (
                <CustomerFormModal 
                    // Pass activeCustomer only if editing or viewing
                    customer={activeCustomer}
                    mode={modalMode}
                    onClose={closeModal}
                    // onSave is only required for 'create' and 'edit' modes
                    onSave={modalMode !== 'view' ? handleCustomerSave : null}
                />
            )}
        </div>
    );
};

export default CustomerManagementPage;

"use client"
import Card from '@/components/Common/Card';
import CategoryModal from '@/components/Screen/Category/CategoryCreate';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';

// =========================================================
// MOCK DATA & ICONS
// =========================================================

const MOCK_CATEGORIES = [
    { id: 1, name: 'Technology', slug: 'tech', products: 120 },
    { id: 2, name: 'Apparel & Fashion', slug: 'fashion', products: 450 },
    { id: 3, name: 'Home Goods', slug: 'home', products: 300 },
    { id: 4, name: 'Food & Beverage', slug: 'food', products: 88 },
    { id: 5, name: 'Books & Media', slug: 'books', products: 210 },
];

// Inline SVG Icons
const IconPlus = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const IconEdit = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const IconTrash = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


const CategoryIndexPage = () => {
    const [categories, setCategories] = useState(MOCK_CATEGORIES);
    const [searchTerm, setSearchTerm] = useState('');
    // null for viewing list, object for editing, true for adding new
    const [activeCategory, setActiveCategory] = useState(null); 

    // Filter categories based on search term
    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;

        const lowerCaseSearch = searchTerm.toLowerCase();
        return categories.filter(cat => 
            cat.name.toLowerCase().includes(lowerCaseSearch) ||
            cat.slug.toLowerCase().includes(lowerCaseSearch)
        );
    }, [categories, searchTerm]);

    // Handlers for CRUD operations
    const handleSave = (newCat) => {
        if (activeCategory && activeCategory.id) {
            // Edit
            setCategories(cats => cats.map(c => c.id === newCat.id ? newCat : c));
        } else {
            // Add
            setCategories(cats => [...cats, newCat]);
        }
        setActiveCategory(null); // Close modal
    };

    const handleDelete = (id) => {
        // IMPORTANT: Use custom modal for confirmation, not window.confirm
        if (window.confirm('Are you sure you want to delete this category? (Simulated Confirm)')) {
            setCategories(cats => cats.filter(c => c.id !== id));
        }
    };

    return (
        <div className='space-y-6'>
 <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                            <div className="flex items-center space-x-2 text-gray-900">
                                <Link  href='/Admin/dashboard'> <FaArrowLeft className="w-4 h-4 font-medium  " /></Link>
                               
                                <span className="font-medium text-base ">All Category</span>
                            </div>
                            <div className="flex space-x-4">
                                <button 
                    onClick={() => setActiveCategory(true)}  className="flex items-center space-x-2 px-4 py-2 text-base  text-primary font-medium hover:bg-gray-50 transition-colors">
                                    <IconPlus className="w-5 h-5 mr-2" />
                                    <span>Add Category</span>
                                </button>
                            </div>
                        </div>

                        
            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
                {/* Search Bar */}
                <h3 className="text-xl font-semibold text-gray-800">Category List</h3>
            </div>

            {/* Category List Table */}
            <Card>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => setActiveCategory(category)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition"
                                            title="Edit"
                                        >
                                            <IconEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                                            title="Delete"
                                        >
                                            <IconTrash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    {searchTerm ? 
                                        `No categories found matching "${searchTerm}".` : 
                                        'No categories available. Click "Add New Category" to start.'
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {/* Add/Edit Modal */}
            {(activeCategory !== null) && (
                <CategoryModal 
                    activeCategory={activeCategory !== true ? activeCategory : null}
                    onClose={() => setActiveCategory(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
export default  CategoryIndexPage;

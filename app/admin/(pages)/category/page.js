"use client"
import Card from '@/components/Common/Card';
import CategoryModal from '@/components/Screen/Category/CategoryCreate';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { FaArrowLeft, FaPlus, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import {allCategories} from  '@/app/Data/category'
import CreateBtn from '@/components/Common/CreateBtn';

const Category = () => {
    const [categories, setCategories] = useState(allCategories);
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
                                <CreateBtn handleClick={() => setActiveCategory(true)} text='Add Category'/>
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
                                            <FiEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                                            title="Delete"
                                        >
                                            <FaRegTrashAlt className="w-5 h-5" />
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
export default  Category;

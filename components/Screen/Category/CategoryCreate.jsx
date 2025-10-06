"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';

const CategoryModal = ({ activeCategory, onClose, onSave }) => {
    const isEditing = !!activeCategory;
    const [name, setName] = useState(activeCategory?.name || '');
    const [slug, setSlug] = useState(activeCategory?.slug || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !slug) {
            console.error("Name and Slug are required.");
            return;
        }

        // Call the save handler with the new/updated data
        onSave({
            id: isEditing ? activeCategory.id : Date.now(),
            name,
            products: activeCategory?.products || 0, // Preserve product count or set to 0
        });

        onClose(); // Close modal on success
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <IoMdClose className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                    {isEditing ? 'Edit Category' : 'Add New Category'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Electronics"
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/50">
                            {isEditing ? 'Save Changes' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal
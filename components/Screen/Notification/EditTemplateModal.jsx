import Card from '@/components/Common/Card';
import React, { useState } from 'react'
import { IconContext } from 'react-icons';
import { IoMdClose } from 'react-icons/io';
import { LiaEditSolid, LiaSave } from 'react-icons/lia';

const EditTemplateModal = ({ show, onClose, template, onSave }) => {
    if (!show || !template) return null;
    
    // Initialize form state with current template data
    const [formData, setFormData] = useState({
        name: template.name,
        subject: template.subject,
        body: template.body,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(template.id, formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity">
            <Card className="max-w-3xl w-full transform transition-all">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <LiaEditSolid className="w-6 h-6 mr-2 text-indigo-600"/>
                        Edit Template: {template.id.toUpperCase()}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <IoMdClose className="w-6 h-6"/>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name and Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject Line</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    
                    {/* Body Content (Simulated Editor) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Body Content (Supports HTML/Markdown)</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows="12"
                            placeholder="Enter the main body of the email. Use placeholders like {{USER_NAME}} or {{RESET_LINK}}."
                            required
                            className="w-full font-mono text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition flex items-center"
                        >
                            <LiaSave className="w-4 h-4 mr-2"/> Save Changes
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditTemplateModal
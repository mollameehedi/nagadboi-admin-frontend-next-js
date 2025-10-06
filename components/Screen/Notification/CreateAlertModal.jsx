import CenterModal from '@/components/Common/Modal/CenterModal';
import React, { useState } from 'react'
import { IoPushOutline } from 'react-icons/io5';

const CreateAlertModal = ({ show, onClose, onSave }) => {
    if (!show) return null;
    
    const [message, setMessage] = useState('');
    const [type, setType] = useState('Maintenance');
    const [severity, setSeverity] = useState('Info');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newAlert = {
            type,
            severity,
            message,
        };
        onSave(newAlert);
    };

    return (
        <CenterModal title='Create Global System Alert' isOpen={show} onClose={onClose} handleSubmit={onSave}>
            <form onSubmit={handleSubmit} className="space-y-4  w-full p-6 transform transition-all">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="3"
                            placeholder="e.g., Scheduled maintenance tonight from 2 AM to 3 AM UTC."
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>Maintenance</option>
                                <option>Update</option>
                                <option>Incident</option>
                                <option>General Notice</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Info">Info</option>
                                <option value="Warning">Warning</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
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
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                        >
                            <span className="flex items-center"><IoPushOutline className="w-4 h-4 mr-2"/>Publish Alert</span>
                        </button>
                    </div>
                </form>
        </CenterModal>
    );
};


export default CreateAlertModal
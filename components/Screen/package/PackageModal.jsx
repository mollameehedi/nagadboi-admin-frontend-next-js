import FormInput from '@/components/Common/FormInput';
import CenterModal from '@/components/Common/Modal/CenterModal';
import React, { useState } from 'react'

const PackageModal = ({ activePackage, onClose,isOpen, onSave }) => {
    const isEditing = activePackage && activePackage.id;
    const title = isEditing ? `Edit Package #${activePackage.id}` : 'Create New Package';

    const [name, setName] = useState(activePackage?.name || '');
    const [price, setPrice] = useState(activePackage?.price || 0.00);
    const [duration, setDuration] = useState(activePackage?.duration || 'Monthly');
    const [status, setStatus] = useState(activePackage?.status || 'Draft');
    const [featuresText, setFeaturesText] = useState(activePackage?.features?.join('\n') || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPackage = {
            id: isEditing ? activePackage.id : nextPackageId++,
            name,
            price: parseFloat(price),
            duration,
            status,
            features: featuresText.split('\n').map(f => f.trim()).filter(f => f),
            // Preserve existing metrics or set mock defaults for new packages
            totalMembers: activePackage?.totalMembers || 0,
            totalBusinesses: activePackage?.totalBusinesses || 0,
        };
        onSave(newPackage);
    };

    return (
                <CenterModal title={title} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit} className="space-y-4  w-full p-6 transform transition-all">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Premium Plan"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <FormInput
                         type="number"
                         label="Total Business"
                                value={name}
                                handleChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Buniness "
                                required={true}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div>
                            <FormInput
                         type="number"
                         label="Total Member"
                                value={name}
                                handleChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Member"
                                required={true}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Duration</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Annual">Annual</option>
                                <option value="One-Time">One-Time</option>
                                <option value="Perpetual">Perpetual (Free)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Active">Active (Live)</option>
                                <option value="Draft">Draft (Hidden)</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (One per line)</label>
                        <textarea
                            value={featuresText}
                            onChange={(e) => setFeaturesText(e.target.value)}
                            rows="4"
                            placeholder="e.g. 5 User Accounts&#10;Unlimited Bandwidth&#10;24/7 Support"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                        >
                            {isEditing ? 'Save Changes' : 'Create Package'}
                        </button>
                    </div>
                </form>
           </CenterModal>
    );
};

export default PackageModal
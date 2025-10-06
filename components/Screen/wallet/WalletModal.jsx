'use client'
import CenterModal from '@/components/Common/Modal/CenterModal';
import React, { useState } from 'react'

const WalletModal = ({ activeWallet, onClose,isOpen, onSave }) => {
    const isEditing = activeWallet && activeWallet.id;
    const title = isEditing ? `Edit Wallet #${activeWallet.id}` : 'Create New Wallet';

    const [name, setName] = useState(activeWallet?.name || '');
    const [userId, setUserId] = useState(activeWallet?.userId || '');
    const [limit, setLimit] = useState(activeWallet?.limit || 1000);
    const [status, setStatus] = useState(activeWallet?.status || 'Active');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWallet = {
            id: isEditing ? activeWallet.id : nextWalletId++,
            name,
            userId: userId || null,
            limit: Number(limit),
            status,
            pin: isEditing ? activeWallet.pin : '0000', // Mock initial PIN
            lastActivity: isEditing ? activeWallet.lastActivity : new Date().toISOString().slice(0, 10),
        };
        onSave(newWallet);
    };

    return (
        <CenterModal title={title} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit} className="space-y-4  w-full p-6 transform transition-all" >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., General Expense"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned User ID (Optional)</label>
                        <input
                            type="text"
                            value={userId || ''}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User identifier or email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Daily Limit ($)</label>
                        <input
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            min="1"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                        </select>
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
                            {isEditing ? 'Save Changes' : 'Create Wallet'}
                        </button>
                    </div>
                </form>
        </CenterModal>
    );
};

export default WalletModal
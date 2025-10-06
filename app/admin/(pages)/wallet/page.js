'use client'
import React, { useState, useMemo, useCallback } from 'react';
import {allWallets} from '@/app/Data/allWallets';
import WalletModal from '@/components/Screen/wallet/WalletModal';
import { LiaEditSolid } from 'react-icons/lia';
import { IoKeyOutline, IoTrashOutline } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdLockOutline } from 'react-icons/md';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';


let nextWalletId = 1005;

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
        {children}
    </div>
);

const WalletManagementCRUD = () => {
    const [wallets, setWallets] = useState(allWallets);
    const [searchTerm, setSearchTerm] = useState('');
    // null for viewing list, object for editing/viewing, true for adding new
    const [activeWallet, setActiveWallet] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null); // { id, type, message } for confirmation

    // Filter wallets based on search term
    const filteredWallets = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return wallets.filter(w =>
            w.name.toLowerCase().includes(lowerCaseSearch) ||
            (w.userId && w.userId.toLowerCase().includes(lowerCaseSearch)) ||
            w.id.toString().includes(lowerCaseSearch)
        );
    }, [wallets, searchTerm]);

    // Handlers for CRUD operations
    const handleSave = useCallback((newWallet) => {
        if (newWallet.id !== nextWalletId) {
            // Edit
            setWallets(ws => ws.map(w => w.id === newWallet.id ? newWallet : w));
        } else {
            // Add
            setWallets(ws => [...ws, newWallet]);
        }
        setActiveWallet(null); // Close modal
    }, []);

    const handleDelete = useCallback((id) => {
        setConfirmAction({
            id,
            type: 'Delete',
            message: `Are you sure you want to permanently delete Wallet #${id}? This action cannot be undone.`,
        });
    }, []);

    // Handlers for specific management actions (Simulated)
    const handleAssign = useCallback((id) => {
        setConfirmAction({
            id,
            type: 'Assign',
            message: `Are you sure you want to re-initiate the assignment process for Wallet #${id}? This requires user confirmation.`,
        });
    }, []);

    const handleBlockToggle = useCallback((wallet) => {
        const action = wallet.status === 'Active' ? 'Block' : 'Unblock';
        setConfirmAction({
            id: wallet.id,
            type: action,
            message: `Are you sure you want to ${action.toLowerCase()} Wallet #${wallet.id}?`,
            wallet,
        });
    }, []);

    const handleResetPinLimits = useCallback((id) => {
        setConfirmAction({
            id,
            type: 'Reset',
            message: `Are you sure you want to trigger a PIN and default limits reset for Wallet #${id}? A temporary PIN will be issued.`,
        });
    }, []);

    const confirmActionHandler = () => {
        if (!confirmAction) return;

        const { id, type, wallet } = confirmAction;

        switch (type) {
            case 'Delete':
                setWallets(ws => ws.filter(w => w.id !== id));
                break;
            case 'Block':
                setWallets(ws => ws.map(w => w.id === id ? { ...w, status: 'Blocked' } : w));
                break;
            case 'Unblock':
                setWallets(ws => ws.map(w => w.id === id ? { ...w, status: 'Active' } : w));
                break;
            case 'Assign':
                console.log(`Simulated: Wallet #${id} assignment initiated.`);
                // In a real app, this would open a specific assignment form or API call
                break;
            case 'Reset':
                setWallets(ws => ws.map(w => w.id === id ? { ...w, pin: '9999', limit: 100 } : w));
                console.log(`Simulated: Wallet #${id} PIN reset to '9999' and limits defaulted.`);
                break;
            default:
                break;
        }

        setConfirmAction(null); // Close modal
    };

    return (
        <>
            {/* Header */}
            <div className="">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-gray-200">
                    <div className="flex items-center space-x-3 text-gray-900 mb-4 sm:mb-0">
                        {/* Link is replaced with a simple span/div since we don't have Next.js routing */}
                        <span className="cursor-pointer text-gray-500 hover:text-indigo-600 transition">
                            <GoArrowLeft className="w-5 h-5 font-medium" />
                        </span>
                        <span className="font-medium text-xl">Wallet Management List</span>
                    </div>
                    <div className="flex space-x-4 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveWallet(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-base  text-primary font-medium hover:bg-gray-50 transition-colors"
                        >
                            <AiOutlinePlus className="w-4 h-4" />
                            <span>Create New Wallet</span>
                        </button>
                    </div>
                </div>

                {/* Controls and Search */}
                <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Wallet List</h3>
                    <div className="w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search by ID, Name, or User ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                </div>

                {/* Wallet List Table */}
                <Card className="mx-5 mb-5 shadow-none border-t border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Limit</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[350px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredWallets.length > 0 ? (
                                    filteredWallets.map((wallet) => (
                                        <tr key={wallet.id} className="hover:bg-indigo-50 transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.id}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{wallet.name}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {wallet.userId || <span className="text-red-500 font-medium">Unassigned</span>}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">${wallet.limit.toLocaleString()}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${wallet.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                >
                                                    {wallet.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <div className="flex justify-center space-x-2">
                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() => setActiveWallet(wallet)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition"
                                                        title="Edit Wallet Details"
                                                    >
                                                        <LiaEditSolid className="w-5 h-5" />
                                                    </button>

                                                    {/* BLOCK/UNBLOCK */}
                                                    <button
                                                        onClick={() => handleBlockToggle(wallet)}
                                                        className={`p-2 rounded-full transition 
                                                            ${wallet.status === 'Active' ? 'text-red-600 hover:bg-red-100' : 'text-green-600 hover:bg-green-100'}`}
                                                        title={wallet.status === 'Active' ? 'Block Wallet' : 'Unblock Wallet'}
                                                    >
                                                        <MdLockOutline className="w-5 h-5" />
                                                    </button>
                                                    
                                                    {/* RESET PIN/LIMITS */}
                                                    <button
                                                        onClick={() => handleResetPinLimits(wallet.id)}
                                                        className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-100 transition"
                                                        title="Reset PIN & Limits"
                                                    >
                                                        <IoKeyOutline className="w-5 h-5" />
                                                    </button>
                                                    
                                                    
                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() => handleDelete(wallet.id)}
                                                        className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition"
                                                        title="Delete Wallet"
                                                    >
                                                        <IoTrashOutline className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                            {searchTerm ?
                                                `No wallets found matching "${searchTerm}".` :
                                                'No wallets available. Click "Create New Wallet" to start.'
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Create/Edit Modal */}
            {(activeWallet !== null) && (
                <WalletModal
                    activeWallet={activeWallet !== true ? activeWallet : null}
                    onClose={() => setActiveWallet(null)}
                    isOpen={true}
                    onSave={handleSave}
                />
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                show={confirmAction !== null}
                title={confirmAction?.type ? `${confirmAction.type} Wallet` : 'Confirm Action'}
                message={confirmAction?.message || ''}
                onConfirm={confirmActionHandler}
                onCancel={() => setConfirmAction(null)}
            />
        </>
    );
};

export default WalletManagementCRUD;

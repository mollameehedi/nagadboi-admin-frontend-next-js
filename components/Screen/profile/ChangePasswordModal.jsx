"use client"
import Card from '@/components/Common/Card';
import FormInput from '@/components/Common/FormInput';
import CenterModal from '@/components/Common/Modal/CenterModal';
import Btn from '@/components/Common/SaveBtn';
import React, { useState } from 'react'
import { IoLockClosed } from 'react-icons/io5';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({ msg: '', type: '' }); // type: 'error' or 'success'
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePasswordSave = () => {
        setIsProcessing(true);
        setStatus({ msg: '', type: '' });

        if (newPassword !== confirmPassword) {
            setStatus({ msg: 'New passwords do not match.', type: 'error' });
            setIsProcessing(false);
            return;
        }

        // --- Simulated Backend Logic ---
        setTimeout(() => {
            // In a real app, you'd check oldPassword validity here.
            if (oldPassword.trim() === '') {
                setStatus({ msg: 'Please enter your current password.', type: 'error' });
            } else if (newPassword.length < 8) {
                setStatus({ msg: 'New password must be at least 8 characters long.', type: 'error' });
            } else {
                // Success simulation
                setStatus({ msg: 'Password successfully changed (simulated).', type: 'success' });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(onClose, 2000);
            }
            setIsProcessing(false);
        }, 1500);
    };

    return (
                <CenterModal title='Change Password' isOpen={isOpen} onClose={onClose} handleSubmit={handlePasswordSave}>
              <div className="space-y-4  w-full p-6 transform transition-all">
                  <p className="text-sm text-gray-500 mb-6">
                    Enter your current password and a new, secure password below.
                </p>

                <div className="space-y-4">
                    <FormInput 
                        label="Current Password" 
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                        disabled={isProcessing}
                    />
                    <FormInput 
                        label="New Password" 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Must be 8+ characters"
                        disabled={isProcessing}
                    />
                    <FormInput 
                        label="Confirm New Password" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        disabled={isProcessing}
                    />
                </div>

                {status.msg && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {status.msg}
                    </div>
                )}
                   <div className="mt-6 flex justify-end space-x-3">
                    <button 
                        onClick={onClose} 
                        disabled={isProcessing}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-sm hover:bg-gray-300 transition font-semibold"
                    >
                        Cancel
                    </button>
                    <Btn 
                        handlClick={handlePasswordSave} 
                        isTriger={isProcessing}
                    >
                        Set New Password
                    </Btn>
                </div>
              </div>
           </CenterModal>
    );
};

export default ChangePasswordModal
import React from 'react'
import Card from '../Card';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-gray-900/70 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <Card className="max-w-sm w-full p-6 transform transition-all">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                        Confirm
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default ConfirmModal
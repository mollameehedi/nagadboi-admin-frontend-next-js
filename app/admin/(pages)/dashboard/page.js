"use client"
import MetricCard from '@/components/Screen/Dashboard/MetricCard';
import TransactionChart from '@/components/Screen/Dashboard/TransactionChart';
import React, { useState } from 'react'
import { CiViewList } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { TbWallet } from 'react-icons/tb';


const Dashboard = () => {
    const [transactionView, setTransactionView] = useState('Daily');

    // Dashboard metrics data
    const metrics = [
        {
            title: "Total User",
            value: "14,580",
            icon: FaUsers,
            colorClass: "text-red-500",
            trend: "↑ 12.5%",
        },
        {
            title: "Total Package",
            value: "2,104",
            icon: CiViewList,
            colorClass: "text-indigo-500",
            trend: "↑ 5.2%",
        },
        {
            title: "Active Wallet",
            value: "$45,900",
            icon: TbWallet,
            colorClass: "text-green-500",
            trend: "↓ 1.8%",
        },
    ];

    const transactionData = {
        Daily: [/* data placeholder */],
        Weekly: [/* data placeholder */],
        Monthly: [/* data placeholder */],
    };

    const TransactionTab = ({ viewName }) => {
        const isActive = transactionView === viewName;
        return (
            <button
                onClick={() => setTransactionView(viewName)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all duration-200 
                    ${isActive 
                        ? 'text-indigo-700 border-b-2 border-indigo-700' 
                        : 'text-gray-500 hover:text-indigo-500 border-b-2 border-transparent hover:border-indigo-200'
                    }`}
            >
                {viewName}
            </button>
        );
    };

    return (
         <>
                {/* 1. Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                    ))}
                </div>

                {/* 2. Transaction Activity Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction Activity</h2>
                    
                    {/* Tab Navigation */}
                    <div className="flex space-x-0 mb-6 border-b border-gray-200">
                        <TransactionTab viewName="Daily" />
                        <TransactionTab viewName="Weekly" />
                        <TransactionTab viewName="Monthly" />
                    </div>

                    {/* Chart Visualization */}
                    <TransactionChart data={transactionData} view={transactionView} />
                    
                    <p className="text-sm text-gray-500 mt-4">
                        Displaying data for the current {transactionView} period. (Placeholder chart for visual representation).
                    </p>
                </div>
                </>
    );
};

export default Dashboard;
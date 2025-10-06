import React from 'react'

const MetricCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-shadow hover:shadow-xl">
        <div className={`flex items-center justify-between`}>
            {/* Icon */}
            <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
            
            {/* Value and Title */}
            <div className="text-right">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
        </div>
        {/* Trend Indicator removed as requested */}
    </div>
);


export default MetricCard
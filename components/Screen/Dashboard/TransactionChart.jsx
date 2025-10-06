import React from 'react'

const TransactionChart = ({ data, view }) => {
    // Determine the data points based on the selected view
    let chartPoints = [];
    if (view === 'Daily') {
        chartPoints = [1500, 2200, 1800, 2500, 3000, 2800, 3500];
    } else if (view === 'Weekly') {
        chartPoints = [12000, 15000, 11000, 18000];
    } else if (view === 'Monthly') {
        chartPoints = [45000, 60000, 55000,35000,20000,50000,60000,70000,55000,35000,15000,90000];
    }

    const maxPoint = Math.max(...chartPoints);

    return (
        <div className="h-94 flex items-end p-2 space-x-3 md:space-x-6 bg-gray-50 rounded-lg">
            {chartPoints.map((point, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-end h-full flex-grow group"
                >
                    <div
                        className="w-full bg-indigo-500 rounded-t-md transition-all duration-500 hover:bg-indigo-600 relative"
                        style={{ height: `${(point / maxPoint) * 90 + 10}%` }} // Scale bar height
                        title={`Amount: ${point}`} // Title for desktop hover
                    >
                        {/* Tooltip on top of the bar */}
                        <div className="absolute bottom-full mb-1 p-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                            ${point.toLocaleString()}
                        </div>
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                        {view === 'Daily' ? `Day ${index + 1}` : view === 'Weekly' ? `W${index + 1}` : `M${index + 1}`}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default TransactionChart
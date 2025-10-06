import React from 'react'

const Breadcrumb = ({ items, onNavigate }) => {
    // Hide if no items (e.g., on the list page)
    if (items.length === 0) return null;

    return (
        <nav className="flex mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-100" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                        )}
                        
                        {/* Last item is the current page, not clickable */}
                        {index === items.length - 1 ? (
                            <span className="text-sm font-semibold text-gray-700">
                                {item.label}
                            </span>
                        ) : (
                            // Other items navigate back to the list view
                            <button
                                onClick={() => onNavigate(item.path)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors rounded-lg p-1"
                            >
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb
import React, { useState } from 'react'
import 'flag-icons/css/flag-icons.min.css';

const PhoneNumberInput = ({ label, placeholder, value, onChange }) => {
  // Array of country data including name, flag code, and dial code
  const countries = [
    { name: 'Bangladesh', code: 'bd', dialCode: '+880' },
    { name: 'United States', code: 'us', dialCode: '+1' },
    { name: 'India', code: 'in', dialCode: '+91' },
    { name: 'Germany', code: 'de', dialCode: '+49' },
    { name: 'Japan', code: 'jp', dialCode: '+81' },
    { name: 'United Kingdom', code: 'gb', dialCode: '+44' },
    { name: 'Canada', code: 'ca', dialCode: '+1' },
    { name: 'Australia', code: 'au', dialCode: '+61' },
  ];

  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to manage the selected country, defaulting to Bangladesh
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Function to handle country selection from the dropdown
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative flex items-center border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        {/* Dropdown Button */}
        <button
          type="button"
          className="flex items-center px-4 py-2 border-r border-gray-200 bg-gray-50 rounded-l-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={`fi fi-${selectedCountry.code} text-xl mr-2`}></span>
          <span className="text-gray-700 font-medium">{selectedCountry.dialCode}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <ul className="absolute top-full left-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <li
                key={country.code}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                onClick={() => handleSelectCountry(country)}
              >
                <span className={`fi fi-${country.code} text-lg mr-3`}></span>
                <span className="text-sm font-medium text-gray-800">{country.name}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Phone Number Input */}
        <input
          type="tel"
          className="w-full px-4 py-2 bg-transparent focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput
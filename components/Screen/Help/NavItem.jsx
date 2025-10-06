import React from 'react'

const NavItem = ({ title, isActive, onClick }) => (
  <a
    href="#"
    onClick={onClick}
    className={`block px-4 py-2 text-600 text-gray-600 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-100 text-primary' : 'hover:bg-gray-200'
    }`}
  >
    {title}
  </a>
);

export default NavItem
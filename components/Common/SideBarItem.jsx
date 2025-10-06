import Link from 'next/link';
import React from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

// The following are placeholder components for sandboxed environment:
// We use NextLink here to avoid compilation errors in the canvas
// since we cannot install 'next/link' directly.
// In a real Next.js environment, you should use the imported 'Link' component.
const NextLink = ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>;

// Placeholder for the icon component
const IoMdArrowDroprightPlaceholder = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>;


const SidebarItem = ({ icon: Icon, text, href, name, activeDropdownName, onDropdownToggle, getNavLinkClass, children }) => {
  // Logic to determine if it should be a dropdown: only if 'children' exists AND 'href' is NOT provided.
  // This satisfies your requirement for a single link when 'href' is present, even if children are accidentally passed.
  const isDropdown = !!children && !href;
  const isDropdownOpen = activeDropdownName === name;
  const isActive = isDropdown ? false : getNavLinkClass(href) === 'active-link';

  const baseClasses = "flex items-center w-full px-4 py-2 rounded-lg text-gray-600 transition-colors focus:outline-none";
  const activeClasses = isActive ? 'active-link bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-200'; // Added styling for active link

  if (isDropdown) {
    return (
      <div>
        <button
          onClick={() => onDropdownToggle(name)}
          className={`${baseClasses} ${isDropdownOpen ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200'}`}
        >
          {Icon && <Icon className='sidebar_item_icon' />}
          <span>{text}</span>
          <IoMdArrowDroprightPlaceholder // Using the placeholder icon
            className={`w-4 h-4 ml-auto text-gray-500 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`}
          />
        </button>
        {isDropdownOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }

  // Use NextLink (as placeholder) for single link items when href is present
  // In a real project, replace NextLink with Link
  return (
    <NextLink href={href} className={`${baseClasses} ${activeClasses}`}>
      {Icon && <Icon className='sidebar_item_icon' />}
      <span>{text}</span>
    </NextLink>
  );
};
export default SidebarItem;

"use client"
import React, { useState } from 'react'
import logo from '../../public/logo.png';
import Image from 'next/image';
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineSettings } from 'react-icons/md';
import { TbWallet } from 'react-icons/tb';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { IoMdArrowDropright } from 'react-icons/io';
import SidebarItem from '../Common/SideBarItem';
import { APP_PATH_ROUTES_MANIFEST } from 'next/dist/shared/lib/constants';
import { AppRoutes } from '@/app/constants/routes';
import { FaUser } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';

const Sidebar = () => {
   const [activeDropdown, setActiveDropdown] = useState(null);

   const pathname = usePathname()
    const getNavLinkClass = (path) =>
     {
      
      return pathname == path ? 'active-link' : 'nai';
    };


  const handleDropdownToggle = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };
  return (
     <aside className=" bg-white  shadow-md hidden md:flex flex-col border-r-1 border-gray-200">
        <div className="text-xl font-bold text-indigo-600 border_bottom_logo leading-[60px]  w-64 text-center">
        <Link href={AppRoutes.admin.dashboard.path}>
          <Image src={logo} alt="alt" width={70} height={60} className='h-[60px] w-auto m-auto cursor-pointer' />
          </Link>
        </div>
        <nav className="w-64 py-4 px-0">

          
        <SidebarItem
  text="Dashboard"
  href={AppRoutes.admin.dashboard.path} // <-- 'href' is present, so it's a single link
  icon={TbWallet}
  getNavLinkClass={getNavLinkClass}
/>
   <SidebarItem
  text="Category"
  href={AppRoutes.admin.category.index.path} 
  icon={BiCategory}
  getNavLinkClass={getNavLinkClass}
/>
   <SidebarItem
  text="Customer"
  href={AppRoutes.admin.customer.index.path} 
  icon={FiUsers}
  getNavLinkClass={getNavLinkClass}
/>



           <SidebarItem icon={FaUser} text="User Management" name="UserManagement"  activeDropdownName={activeDropdown} onDropdownToggle={handleDropdownToggle} getNavLinkClass= {getNavLinkClass} >
            <Link href={AppRoutes.admin.user.index.path} className={`sidebar_item ${getNavLinkClass(AppRoutes.admin.user.index.path)}`}>
              <FaUsers className='sidebar_item_icon' /> User List
            </Link>
            <Link href={AppRoutes.admin.role.index.path} className={`sidebar_item ${getNavLinkClass(AppRoutes.admin.user.index.path)}`}>
              <MdOutlineSettings className='sidebar_item_icon' /> Role
            </Link>
        </SidebarItem>
      

          <SidebarItem text="Others" name="others"  activeDropdownName={activeDropdown} onDropdownToggle={handleDropdownToggle} getNavLinkClass= {getNavLinkClass} >
            <Link href="/support" className={`sidebar_item ${getNavLinkClass('/support')}`}>
              <MdOutlineSettings className='sidebar_item_icon' />  Help & Support
            </Link>
        </SidebarItem>


        </nav>
      </aside>
      )}

export default Sidebar
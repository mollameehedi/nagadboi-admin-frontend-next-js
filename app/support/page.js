"use client";

import HelpDoc from '@/components/Screen/Help/HelpDoc';
import NavItem from '@/components/Screen/Help/NavItem';
import { useState } from 'react';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function HelpPage() {
  const [activeTopic, setActiveTopic] = useState('What is CashBook?');

  const helpTopics = [
    {
      section: 'Basics',
      items: [
        'What is CashBook?',
        'How to use CashBook Business on Web App.',
        'How to do backdated entries?',
        'How to view daily or monthly data in a book?',
        'How to Change Phone Number?',
        'How to carry forward previous balance to new CashBook?',
        'How to Delete or Rename a book?',
        'How to edit entries in the Cashbook app?',
        'How to share/export the Excel/PDF reports?',
        'How to tag a Customer or Supplier while making an Entry?',
        'Why I can\'t find my books?',
      ],
    },
    {
      section: 'Data Backup',
      items: [
        'Is my data safe & backed up?',
      ],
    },
    {
      section: 'Category & Payment Mode - Use & Benefits',
      items: [
        'Benefits of using category and payment mode.',
        'How to add Category and Payment mode?',
        'Reports via category and payment modes',
      ],
    },
    {
      section: 'How to use Filters!',
      items: [
        'How to Filter entries by Time, Day, Date?',
        'How to Filter entries by Remark (using search)?',
        'How to Filter entries by Category?',
        'How to Filter entries by Payment mode?',
        'How to Filter entries by Member?',
      ],
    },
  ];

  const helpContent = {
    'What is CashBook?': 'CashBook is a simple cash management app. You can record your income & expenses and get balance.',
    'How to use CashBook Business on Web App.': 'To use the web app, simply log in and select your business. You can then view all your cashbooks and transactions.',
    'How to do backdated entries?': 'You can add backdated entries by selecting the desired date from the date picker when creating a new entry.',
    'How to view daily or monthly data in a book?': 'Use the filters at the top of the cashbook page to view entries by date range, including daily or monthly views.',
    'How to Change Phone Number?': 'To change your phone number, go to your account settings and update the information.',
    'How to carry forward previous balance to new CashBook?': 'You can manually add a "balance carried forward" entry to your new cashbook to maintain continuity.',
    'How to Delete or Rename a book?': 'Go to the settings page for a specific cashbook to find the options to delete or rename it.',
    'How to edit entries in the Cashbook app?': 'Click on any entry in the cashbook list to open the editing window and make changes.',
    'How to share/export the Excel/PDF reports?': 'Use the "Reports" button on the cashbook page to generate and export reports in various formats.',
    'How to tag a Customer or Supplier while making an Entry?': 'When creating a new entry, there is an option to add a tag for the customer or supplier involved in the transaction.',
    'Why I can\'t find my books?': 'If you can\'t find your cashbooks, ensure you are logged into the correct account and that the books haven\'t been archived or deleted.',
    'Is my data safe & backed up?': 'Yes, all your data is securely stored and regularly backed up on our servers.',
    'Benefits of using category and payment mode.': 'Using categories and payment modes helps you easily sort and analyze your expenses and income for better financial management.',
    'How to add Category and Payment mode?': 'You can add new categories or payment modes in the business settings section.',
    'Reports via category and payment modes': 'You can filter your reports by category and payment mode to get detailed insights into your finances.',
    'How to Filter entries by Time, Day, Date?': 'Use the time and date filters at the top of the page to show only the entries within a specific timeframe.',
    'How to Filter entries by Remark (using search)?': 'Use the search bar to find entries by their remarks or description.',
    'How to Filter entries by Category?': 'Use the category filter dropdown to view only entries assigned to a specific category.',
    'How to Filter entries by Payment mode?': 'Use the payment mode filter dropdown to see entries based on how the transaction was made (e.g., Cash, Card, Bank).',
    'How to Filter entries by Member?': 'If it\'s a shared cashbook, you can filter entries by a specific team member to see their transactions.',
  };

  return (
    <>
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
         <div className='flex items-center'>
           <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-200">
            <IoArrowBackOutline className='text-gray-900 text-2xl text-normal' />
          </button>
          <span className='text-gray-300 mr-3 inline-block'>|</span>
          <h1 className="text-xl font-semibold text-gray-900">Help Docs</h1>
         </div>
          <button className="rounded text-center text-[#01865f] focus:ring-4 focus:outline-none focus:ring-opacity-50 disabled:opacity-80 disabled:cursor-not-allowed font-semibold gap-2 items-center justify-center inline-flex min-w-[120px] border px-6 h-[40px] bg-transparent border-gray-100 hover:border-green-900">
            <FaWhatsapp className='text-green-900' />
            Contact Us
          </button>
        </header>
        <div className="flex h-screen bg-gray-100 font-sans">

      <div className="flex flex-col  w-2/9  bg-white border-r border-gray-200">
    
        <nav className="flex-1 p-4 overflow-y-auto">
          {helpTopics.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="uppercase text-xs font-bold text-gray-500 mb-2">{section.section}</h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <NavItem
                    key={itemIndex}
                    title={item}
                    isActive={activeTopic === item}
                    onClick={() => setActiveTopic(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1  w-7/9 overflow-y-auto p-8 bg-white">
        <HelpDoc title={activeTopic} content={helpContent[activeTopic]} />
      </div>
    </div>
    </>
    
  );
}

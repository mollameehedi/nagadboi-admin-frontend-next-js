"use client"
import Card from '@/components/Common/Card';
import FormInput from '@/components/Common/FormInput';
import Btn from '@/components/Common/SaveBtn';
import WebSiteLayout from '@/components/Screen/Website/WebSiteLayout';
import React, { useState } from 'react'
import { IoSaveOutline } from 'react-icons/io5';


const initialGeneralSettings = {
  siteTitle: 'My Innovate Site',
  tagline: 'The future of digital transformation',
  logoUrl: 'https://placehold.co/150x50/3f51b5/ffffff?text=LOGO',
  faviconUrl: 'https://placehold.co/32x32/3f51b5/ffffff?text=F',
  defaultLang: 'en-US',
  metaDescription: 'A modern, high-performance web application platform.',
  maintenanceMode: false,
};

const initialSettings = {
    // Basic Settings
    siteTitle: 'My Innovate Site',
    defaultLang: 'en-US',
    maintenanceMode: false,
    logoUrl: 'https://placehold.co/150x50/3f51b5/ffffff?text=LOGO',
    faviconUrl: 'https://placehold.co/32x32/3f51b5/ffffff?text=F',

    // SEO/Meta Tags
    metaTitle: 'Innovate Solutions - Home',
    metaDescription: 'A modern, high-performance web application platform.',
    metaKeywords: 'react, tailwind, dashboard, management, web app, seo',

    // Contact Details
    email: 'support@innovate.com',
    phoneNumber: '+1 (555) 123-4567',
    Address: '123 Corporate Ave, Suite 400, City, Country',
};




const GeneralSettings = () => {
  const [settings, setSettings] = useState(initialGeneralSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("General Settings Saved:", settings);
      setIsSaving(false);
      setSavedMsg('Settings updated successfully!');
      setTimeout(() => setSavedMsg(''), 3000);
    }, 1000);
  };

  return (
      <Card className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Website Identity & SEO</h3>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Site Title */}
                        <FormInput
                            label="Site Title (Displayed in header)"
                            name="siteTitle"
                            value={settings.siteTitle}
                            onChange={handleChange}
                            placeholder="e.g., Innovate Solutions Inc."
                        />
                        {/* Tagline / Website URL */}
                        <FormInput
                            label="Tagline / Short Slogan"
                            name="tagline"
                            value={settings.tagline}
                            onChange={handleChange}
                            placeholder="The future of digital transformation"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Meta Title */}
                        <FormInput
                            label="Meta Title (SEO)"
                            name="metaTitle"
                            value={settings.metaTitle}
                            onChange={handleChange}
                            placeholder="Optimized page title"
                        />
                         {/* Default Language */}
                        <FormInput
                            label="Default Language"
                            name="defaultLang"
                            value={settings.defaultLang}
                            onChange={handleChange}
                            placeholder="e.g., en-US"
                            disabled={isSaving}
                        />
                        
                        {/* Maintenance Mode */}
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 self-end">
                            <label htmlFor="maintenanceMode" className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="maintenanceMode"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    disabled={isSaving}
                                />
                                <span className="text-sm font-medium text-gray-900">Enable Maintenance Mode</span>
                            </label>
                        </div>
                    </div>
                    
                    {/* Meta Description */}
                    <FormInput
                        label="Meta Description (SEO)"
                        name="metaDescription"
                        value={settings.metaDescription}
                        onChange={handleChange}
                        placeholder="A concise, 150-160 character description of your site for search engines."
                        rows={2}
                    />

                    {/* Meta Keywords */}
                    <FormInput
                        label="Meta Keywords (Comma separated)"
                        name="metaKeywords"
                        value={settings.metaKeywords}
                        onChange={handleChange}
                        placeholder="e.g., digital, tech, development, consulting"
                    />

                    <h4 className="text-xl font-bold text-gray-800 mt-8 border-t pt-6">Contact & Branding Defaults</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={settings.email}
                            onChange={handleChange}
                            placeholder="support@innovate.com"
                        />
                        <FormInput
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={settings.phoneNumber}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    {/* Address */}
                    <FormInput
                        label="Physical Address"
                        name="Address" // Must match the key in initialSettings
                        value={settings.Address}
                        onChange={handleChange}
                        placeholder="123 Corporate Ave, Suite 400, City, Country"
                        rows={2}
                    />
                    
                    {/* Logo and Favicon (Display only - file upload logic is complex and omitted for now) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50">
                        <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-700 block">Current Logo Preview:</span>
                            <img 
                                src={settings.logoUrl} 
                                alt="Current Logo" 
                                className="w-36 h-12 object-contain rounded border p-1 bg-white shadow"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/144x48/cccccc/333333?text=Logo" }}
                            />
                            <p className="text-xs text-gray-500 truncate">{settings.logoUrl}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-700 block">Current Favicon Preview:</span>
                            <img 
                                src={settings.faviconUrl} 
                                alt="Current Favicon" 
                                className="w-8 h-8 object-contain rounded border bg-white shadow"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/32x32/cccccc/333333?text=F" }}
                            />
                            <p className="text-xs text-gray-500 truncate">{settings.faviconUrl}</p>
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex justify-between items-center pt-4 border-t">
                    {savedMsg && (
                        <span className="text-sm font-bold text-green-600 transition-opacity duration-500">
                            {savedMsg}
                        </span>
                    )}
                    <div className='flex-grow' /> {/* Spacer */}
                    <Btn
                        handlClick={handleSave}
                        isTriger={isSaving}
                    />
                </div>
            </Card>
  );
};

export default GeneralSettings
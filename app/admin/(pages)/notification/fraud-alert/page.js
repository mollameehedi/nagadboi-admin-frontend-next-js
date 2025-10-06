'use client'
import { AppRoutes } from '@/app/constants/routes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa';

// =========================================================
// INLINE SVG ICONS (Replaced external react-icons for portability)
// =========================================================
const IconShieldCheck = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.636 2.072a2 2 0 00-2.828-2.828l-2.072 2.072m-1.414 1.414a2 2 0 00-2.828-2.828l-2.072 2.072m7.072 7.072a2 2 0 002.828 2.828l-2.072-2.072m-1.414-1.414a2 2 0 00-2.828 2.828l2.072-2.072M4.93 19.07a2 2 0 002.828 2.828l2.072-2.072m1.414-1.414a2 2 0 002.828 2.828l2.072-2.072M3 3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" /></svg>;
const IconSave = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V3" /></svg>;
const IconCheckCircle = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// =========================================================
// TOAST NOTIFICATION COMPONENT (for save feedback)
// =========================================================

const ToastNotification = ({ show, message, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    const baseClass = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl text-white flex items-center transition-all duration-300 transform ease-out";
    const visibleClass = show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0';

    if (!show) return null;

    return (
        <div className={`${baseClass} bg-green-600 ${visibleClass}`}>
            <IconCheckCircle className="w-6 h-6 mr-3" />
            <p className="font-medium">{message}</p>
        </div>
    );
};


const FraudAlert = () => {
    const [settings, setSettings] = useState({
        // Transaction Settings
        largeTxThreshold: 50000,
        txVelocityLimit: 8, 
        
        // Authentication Settings
        dailyLoginFailLimit: 10,
        enableSuspiciousClientAlert: true,
        
        // Geo-Behavioral Settings
        enableIpChangeAlert: true,
        enableGeoAnomaly: true, 
        geoAnomalyDistanceKm: 500,
    });
    
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Updated to handle number parsing and empty input gracefully
    const handleInput = (e) => {
        const { name, value, type } = e.target;
        let processedValue = value;
        
        if (type === 'number') {
            // Convert to number, use 0 if the string is empty or invalid
            processedValue = value.trim() === '' ? 0 : Number(value);
        }

        setSettings(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleSave = () => {
        console.log("Saving fraud alert settings:", settings);
        // Replaced alert() with custom toast
        setToast({ show: true, message: 'Configuration updated and deployed successfully!' });
    };

    const InputField = ({ label, name, value, type = 'number', unit = '', description }) => (
        <div className="p-5 bg-white rounded-xl shadow-md border border-gray-100">
            <label htmlFor={name} className="block text-base font-bold text-gray-700 mb-1">
                {label}
            </label>
            <p className="text-xs text-gray-500 mb-3">{description}</p>
            <div className="mt-1 flex rounded-lg shadow-inner shadow-gray-100/50">
                <input
                    type={type}
                    name={name}
                    id={name}
                    // Handle value for number inputs to show placeholder when 0 is the starting value
                    value={value !== 0 ? value : ''}
                    onChange={handleInput}
                    required
                    min={type === 'number' ? 0 : undefined}
                    className="flex-1 block w-full rounded-l-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 p-3 text-lg font-mono placeholder-gray-400 transition-colors"
                    placeholder={type === 'number' ? 'Enter threshold value' : 'Enter text'}
                />
                {unit && (
                    <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-gray-600 text-base font-semibold">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );

    const ToggleSetting = ({ label, description, isEnabled, onClick }) => (
        <div className="flex items-start justify-between p-5 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-1 pr-4">
                <span className="text-xl font-semibold text-gray-900">{label}</span>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <button
                type="button"
                onClick={onClick}
                className={`relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isEnabled ? 'bg-green-600' : 'bg-gray-400'}`}
                role="switch"
                aria-checked={isEnabled}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-300 ${isEnabled ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
            </button>
        </div>
    );

    return (
        <>
            <>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                <div className="flex items-center space-x-2 text-gray-900">
                    <Link href={AppRoutes.admin.dashboard}> <FaArrowLeft className="w-4 h-4 font-medium  " /></Link>

                    <span className="font-medium text-base ">System Alerts</span>
                </div>
            </div>

<div className="flex justify-between items-center mb-8">
                {/* Search Bar */}
                <h3 className="text-xl font-semibold text-gray-800">Advanced Fraud Configuration</h3>
            </div>
                <div className="space-y-10">
                    
                    {/* --- 1. FINANCIAL & VELOCITY CHECKS --- */}
                    <section>
                        <h2 className="text-xl font-normal text-indigo-700 mb-5 pb-2 border-b-2 border-indigo-100">
                            1. Financial & Velocity Checks
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Large Transaction Alert Threshold"
                                description="Generates an internal alert for any single transaction exceeding this amount."
                                name="largeTxThreshold"
                                value={settings.largeTxThreshold}
                                unit="USD"
                            />
                            <InputField
                                label="Transaction Velocity Limit"
                                description="Maximum number of transactions allowed within a 60-minute window before alerting."
                                name="txVelocityLimit"
                                value={settings.txVelocityLimit}
                                unit="Txns/Hr"
                            />
                        </div>
                    </section>
                    
                    {/* --- 2. AUTHENTICATION & LOGIN --- */}
                    <section>
                        <h2 className="text-xl font-normal text-indigo-700 mb-5 pb-2 border-b-2 border-indigo-100">
                            2. Authentication & Credential Monitoring
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Consecutive Failed Logins Limit"
                                description="Alert if a single account fails to log in this many times in a day."
                                name="dailyLoginFailLimit"
                                value={settings.dailyLoginFailLimit}
                                unit="attempts"
                            />
                            <ToggleSetting
                                label="Alert on Suspicious Client Detection"
                                description="Triggers an alert if the browser or device fingerprint is drastically different from the typical user profile."
                                isEnabled={settings.enableSuspiciousClientAlert}
                                onClick={() => handleToggle('enableSuspiciousClientAlert')}
                            />
                        </div>
                    </section>

                    {/* --- 3. GEO-BEHAVIORAL ANOMALIES --- */}
                    <section>
                        <h2 className="text-xl font-normal text-indigo-700 mb-5 pb-2 border-b-2 border-indigo-100">
                            3. Geographical & Behavioral Anomalies
                        </h2>
                        <div className="space-y-4">
                            <ToggleSetting
                                label="IP Address Change Alert"
                                description="Sends an alert if a user's IP network or ISP changes significantly within a short timeframe (e.g., 2 hours)."
                                isEnabled={settings.enableIpChangeAlert}
                                onClick={() => handleToggle('enableIpChangeAlert')}
                            />
                            <ToggleSetting
                                label="Cross-Geolocation Alert (Travel Rule)"
                                description="Alert if a session starts in one location and a critical action is performed in a second, distant location."
                                isEnabled={settings.enableGeoAnomaly}
                                onClick={() => handleToggle('enableGeoAnomaly')}
                            />
                            {settings.enableGeoAnomaly && (
                                <div className='md:max-w-md pt-2'>
                                    <InputField
                                        label="Minimum Anomaly Distance"
                                        description="The minimum geographic distance (in kilometers) between two actions to flag an anomaly."
                                        name="geoAnomalyDistanceKm"
                                        value={settings.geoAnomalyDistanceKm}
                                        unit="KM"
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>


                <div className="flex justify-end pt-10 mt-6 border-t border-gray-100">
                    <button
                        onClick={handleSave}
                        className="flex items-center space-x-3 px-8 py-3 text-lg bg-indigo-600 text-white font-extrabold rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-xl shadow-indigo-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <IconSave className="w-5 h-5" />
                        <span>Save and Deploy Rules</span>
                    </button>
                </div>
            </>
            
            <ToastNotification 
                show={toast.show} 
                message={toast.message} 
                onClose={() => setToast(prev => ({ ...prev, show: false }))} 
            />
        </>
    );
};

export default FraudAlert

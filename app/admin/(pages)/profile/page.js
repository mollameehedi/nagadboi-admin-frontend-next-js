"use client"
import Card from '@/components/Common/Card';
import FormInput from '@/components/Common/FormInput';
import Btn from '@/components/Common/SaveBtn';
import ChangePasswordModal from '@/components/Screen/profile/ChangePasswordModal';
import React, { useRef, useState } from 'react'
import { IoCamera } from 'react-icons/io5';

const initialProfile = {
    displayName: 'Jane Doe',
    userRole: 'Software Developer',
    bio: 'Experienced React developer passionate about building scalable and user-friendly web applications.',
    profileImageUrl: 'https://placehold.co/100x100/4f46e5/ffffff?text=JD', // Default placeholder
    location: 'San Francisco, CA',
    twitterHandle: '@janedev',
    websiteUrl: 'https://www.janedoe.com',
    email: 'jane.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
};




const Profile = () => {
      const [profile, setProfile] = useState(initialProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
     const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [savedMsg, setSavedMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const fileInputRef = useRef(null);


     const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

        const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Revoke previous URL to prevent memory leaks if it exists
            if (profile.profileImageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(profile.profileImageUrl);
            }
            
            // Create a temporary URL for immediate preview (Local URL)
            const fileUrl = URL.createObjectURL(file);
            
            // In a real app, this is where you'd upload the file and get the permanent URL.
            // For now, we update the state with the temporary local URL.
            setProfile(prev => ({ ...prev, profileImageUrl: fileUrl }));
            
            setSavedMsg('New image selected. Click "Save Profile" to keep it.');
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setErrorMsg('');
        setSavedMsg('');

        try {
            // Simulate API saving time
            setTimeout(() => {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
                
                setSavedMsg('Profile updated successfully!');
                console.log("Profile saved to LocalStorage:", profile);
                setTimeout(() => setSavedMsg(''), 3000);
                setIsSaving(false);
            }, 1000); // 1s simulated save time
            
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            setErrorMsg(`Failed to save profile: ${error.message}`);
            setIsSaving(false);
        }
    };




  return (
    
    <>
     <Card className="p-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 pb-6 border-b">
                    {/* Profile Picture & Upload */}
                    <div className="relative flex-shrink-0 group">
                        <img 
                            src={profile.profileImageUrl} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md transition-all duration-300 group-hover:opacity-70"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/94a3b8/ffffff?text=U" }}
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label="Upload new profile picture"
                        >
                            <IoCamera className="w-6 h-6 text-white" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left space-y-2">
                        <h3 className="text-3xl font-extrabold text-gray-900">{profile.displayName}</h3>
                        <p className="text-indigo-600 font-semibold">{profile.userRole}</p>
                        <p className="text-gray-500 text-sm">{profile.location}</p>
                    </div>
                </div>

                {/* --- Personal & Contact Information --- */}
                <div className="space-y-6 pt-6">
                    <h4 className="text-xl font-bold text-gray-800">Personal & Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Full Name"
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleChange}
                            placeholder="e.g., Jane Doe"
                        />
                        <FormInput
                            label="Role/Title"
                            name="userRole"
                            value={profile.userRole}
                            onChange={handleChange}
                            placeholder="e.g., Lead Developer, Designer"
                        />
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                        />
                         <FormInput
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={profile.phoneNumber}
                            onChange={handleChange}
                            placeholder="+1 (555) 555-5555"
                        />
                        <FormInput
                            label="Location"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            placeholder="e.g., San Francisco, CA"
                            className="col-span-1"
                        />
                        {/* Note: Profile Image URL input is replaced by the file upload above. */}
                    </div>
                    
                    <FormInput
                        label="Biography"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself and your experience..."
                        rows={4}
                    />

                    {/* --- Online Presence --- */}
                    <h4 className="text-xl font-bold text-gray-800 mt-8 border-t border-gray-200 pt-6">Online Presence</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Personal Website URL"
                            name="websiteUrl"
                            type="url"
                            value={profile.websiteUrl}
                            onChange={handleChange}
                            placeholder="https://www.yourwebsite.com"
                        />
                        <FormInput
                            label="Twitter/X Handle"
                            name="twitterHandle"
                            value={profile.twitterHandle}
                            onChange={handleChange}
                            placeholder="@yourusername"
                        />
                    </div>
                    
                    {/* --- Security Section --- */}
                    <h4 className="text-xl font-bold text-gray-800 mt-8 border-t  border-gray-200 pt-6">Security</h4>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border rounded-sm  border-gray-200">
                        <p className="text-gray-700 mb-3 sm:mb-0">Manage your login password for increased account security.</p>
                        <button 
                            onClick={() => setIsPasswordModalOpen(true)} 
                            className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all border border-red-200"
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                {/* --- Save Footer --- */}
                <div className="mt-8 flex justify-between items-center pt-4 border-t  border-gray-200">
                    {savedMsg && (
                        <span className="text-sm font-bold text-green-600 transition-opacity duration-500">
                            {savedMsg}
                        </span>
                    )}
                    <div className='flex-grow' />
                    <Btn
                        handlClick={handleSave}
                        isTriger={isSaving}
                    />
                </div>
            </Card>

            {/* Password Modal */}
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
    </>
  )
}

export default Profile
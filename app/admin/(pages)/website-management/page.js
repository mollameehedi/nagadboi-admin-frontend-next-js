'use client'
import React, { useState, useMemo } from 'react';

// =========================================================
// 1. INLINE SVG ICONS (Replaced external react-icons for portability)
// =========================================================
const IconArrowLeft = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconPlus = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
const IconEdit = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconCode = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconGlobe = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IconLink = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07L12 6M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07L12 18"/></svg>;
const IconHelpCircle = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c.5 1 1 2 1 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconAward = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><path d="M15.47 12.53l-2.94 4.14-2.53-4.14M21 12H3"/></svg>;

// =========================================================
// 2. SHARED COMPONENTS & HELPERS
// =========================================================

// Mock Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
        {children}
    </div>
);

// Mock CreateBtn Component
const CreateBtn = ({ handleClick, text }) => (
    <button
        onClick={handleClick}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
    >
        <IconPlus className="w-4 h-4" />
        <span>{text}</span>
    </button>
);

// Custom Modal Component for CRUD operations
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity" onClick={onClose}>
        <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <IconPlus className="w-6 h-6 transform rotate-45" />
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
);

const InputField = ({ label, name, value, type = 'text', onChange, placeholder, isTextArea = false }) => (
    <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        {isTextArea ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={type === 'code' ? 8 : 4}
                className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 transition-shadow ${type === 'code' ? 'font-mono text-xs' : 'text-base'}`}
            />
        ) : (
            <input
                type={type === 'code' ? 'text' : type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
            />
        )}
    </div>
);

// Mock Content Data
const initialBlogPosts = [
    { id: 1, title: 'Optimizing Tailwind Layouts', author: 'Jane Doe', date: '2024-09-01' },
    { id: 2, title: 'The Rise of Signal State Management', author: 'John Smith', date: '2024-08-15' },
];

const initialFAQs = [
    { id: 1, question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee for all premium services.' },
    { id: 2, question: 'How do I contact support?', answer: 'You can reach us via the Contact Details form or call the provided number.' },
];

const initialGeneralSettings = {
    siteTitle: 'My Innovate Site',
    tagline: 'The future of digital transformation',
    logoUrl: 'https://placehold.co/150x50/3f51b5/ffffff?text=LOGO',
    faviconUrl: 'https://placehold.co/32x32/3f51b5/ffffff?text=F',
    defaultLang: 'en-US',
    metaDescription: 'A modern, high-performance web application platform.',
    maintenanceMode: false,
};

const initialContactDetails = {
    address: '123 Tech Park, Suite 400\nSilicon Valley, CA 94022',
    phone: '+1 (555) 123-4567',
    email: 'support@innovatesite.com',
    mapEmbed: '<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM EST',
};

// =========================================================
// 3. PAGE COMPONENTS (The 7 Management Sections)
// =========================================================

// --- 3.1 GENERAL SETTINGS (Detailed Form) ---

const GeneralSettingsTab = () => {
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
        // Simulate API delay
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
                <InputField 
                    label="Site Title" 
                    name="siteTitle" 
                    value={settings.siteTitle} 
                    onChange={handleChange}
                    placeholder="e.g., Innovate Solutions Inc."
                />
                <InputField 
                    label="Tagline" 
                    name="tagline" 
                    value={settings.tagline} 
                    onChange={handleChange}
                    placeholder="Short description under the title"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="Logo URL" 
                        name="logoUrl" 
                        value={settings.logoUrl} 
                        onChange={handleChange}
                        placeholder="https://yourdomain.com/logo.png"
                    />
                    <InputField 
                        label="Favicon URL" 
                        name="faviconUrl" 
                        value={settings.faviconUrl} 
                        onChange={handleChange}
                        placeholder="https://yourdomain.com/favicon.ico"
                    />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Advanced Configuration</h3>

                <InputField 
                    label="Meta Description (SEO)" 
                    name="metaDescription" 
                    value={settings.metaDescription} 
                    onChange={handleChange}
                    isTextArea
                    placeholder="A concise summary for search engine results"
                />

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <label htmlFor="maintenanceMode" className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            id="maintenanceMode"
                            name="maintenanceMode"
                            checked={settings.maintenanceMode}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-900">Enable Maintenance Mode</span>
                    </label>
                    <p className="text-xs text-yellow-700 max-w-xs text-right">
                        *Warning: This takes the site offline. Use with caution.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center pt-4 border-t">
                {savedMsg && (
                    <span className="text-sm font-medium text-green-600 transition-opacity duration-500">
                        {savedMsg}
                    </span>
                )}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                >
                    <IconSave className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : 'Apply General Settings'}</span>
                </button>
            </div>
        </Card>
    );
};

// --- 3.2 CONTACT DETAILS (Detailed Form) ---

const ContactDetailsTab = () => {
    const [contact, setContact] = useState(initialContactDetails);
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState('');

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API delay
        setTimeout(() => {
            console.log("Contact Details Saved:", contact);
            setIsSaving(false);
            setSavedMsg('Contact details updated!');
            setTimeout(() => setSavedMsg(''), 3000);
        }, 1000);
    };

    return (
        <Card className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Public Contact Information</h3>
            
            <div className="space-y-6">
                <InputField
                    label="Physical Address (for Contact Page/Footer)"
                    name="address"
                    value={contact.address}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Enter full address, line by line."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Primary Phone Number"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                    />
                    <InputField
                        label="Support Email Address"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        placeholder="support@company.com"
                        type="email"
                    />
                </div>

                <InputField
                    label="Business Hours / Operational Time"
                    name="hours"
                    value={contact.hours}
                    onChange={handleChange}
                    placeholder="Mon-Fri, 9am-5pm"
                />

                <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Map Integration</h3>

                <InputField
                    label="Google Maps Embed Code"
                    name="mapEmbed"
                    value={contact.mapEmbed}
                    onChange={handleChange}
                    isTextArea
                    type="code"
                    placeholder="Paste the <iframe> code from Google Maps here."
                />
            </div>

            <div className="mt-8 flex justify-between items-center pt-4 border-t">
                {savedMsg ? (
                    <span className="text-sm font-medium text-green-600 transition-opacity duration-500">
                        {savedMsg}
                    </span>
                ):(

                    <>
                     <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-sm hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                    <IconSave className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : 'Save Contact Details'}</span>
                </button>
                    </>
                )}
               
            </div>
        </Card>
    );
};


// --- 3.3 ABOUT US (Detailed Form) ---

const AboutUsTab = () => {
    const [content, setContent] = useState({
        mission: 'To empower businesses with cutting-edge technology and seamless digital experiences.',
        vision: 'To be the leading global partner for digital transformation by 2030.',
        history: 'Founded in 2015 with a focus on simplicity and performance...',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState('');

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            console.log("About Us Content Saved:", content);
            setIsSaving(false);
            setSavedMsg('About Us content updated!');
            setTimeout(() => setSavedMsg(''), 3000);
        }, 1000);
    };

    return (
        <Card className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">About Us Content Editor</h3>
            
            <div className="space-y-6">
                <InputField
                    label="Mission Statement"
                    name="mission"
                    value={content.mission}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Our core purpose..."
                />

                <InputField
                    label="Vision Statement"
                    name="vision"
                    value={content.vision}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Our future aspiration..."
                />
                
                <InputField
                    label="Company History / Main Body Content"
                    name="history"
                    value={content.history}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Start typing the detailed company history..."
                />
            </div>

            <div className="mt-8 flex justify-between items-center pt-4 border-t">
                {savedMsg && (
                    <span className="text-sm font-medium text-green-600 transition-opacity duration-500">
                        {savedMsg}
                    </span>
                )}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                >
                    <IconSave className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : 'Save About Us Content'}</span>
                </button>
            </div>
        </Card>
    );
};


// --- 3.4 BLOG MANAGEMENT (CRUD List - Reused from previous step) ---

// Blog Post Modal
const BlogPostModal = ({ post, onClose, onSave }) => {
    const isEdit = post && post.id;
    const [formData, setFormData] = useState(post || { title: '', author: '', content: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = () => {
        const newId = isEdit ? post.id : Math.max(...initialBlogPosts.map(p => p.id), 0) + 1;
        const newPost = { 
            ...formData, 
            id: newId, 
            date: isEdit ? post.date : new Date().toISOString().slice(0, 10) 
        };
        onSave(newPost);
    };

    return (
        <Modal 
            title={isEdit ? `Edit Post: ${post.title.substring(0, 20)}...` : 'Create New Blog Post'} 
            onClose={onClose}
        >
            <div className="space-y-4">
                <InputField 
                    label="Title"
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange}
                    placeholder="Post Title" 
                />
                <InputField 
                    label="Author"
                    name="author" 
                    value={formData.author} 
                    onChange={handleChange}
                    placeholder="Author Name" 
                />
                <InputField
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Write your blog content here..."
                />
                <button 
                    onClick={handleFormSubmit}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                    <IconSave className="w-5 h-5 inline mr-2"/> {isEdit ? 'Update Post' : 'Publish Post'}
                </button>
            </div>
        </Modal>
    );
};

const ManageBlogPosts = () => {
    const [posts, setPosts] = useState(initialBlogPosts);
    const [activePost, setActivePost] = useState(null); // null, object for edit, true for add
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return posts.filter(p =>
            p.title.toLowerCase().includes(lowerCaseSearch) ||
            p.author.toLowerCase().includes(lowerCaseSearch)
        );
    }, [posts, searchTerm]);

    const handleSave = (newPost) => {
        const isNew = !posts.some(p => p.id === newPost.id);
        if (isNew) {
            setPosts(ps => [...ps, newPost]);
        } else {
            setPosts(ps => ps.map(p => p.id === newPost.id ? newPost : p));
        }
        setActivePost(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setPosts(ps => ps.filter(p => p.id !== id));
        }
    };

    return (
        <div className='space-y-6'>
            <div className="flex justify-between items-center pb-4">
                <h3 className="text-xl font-semibold text-gray-800">Blog Post List</h3>
                <CreateBtn handleClick={() => setActivePost(true)} text='Add New Post' />
            </div>

            <input
                type="text"
                placeholder="Search posts by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />

            <Card>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{post.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => setActivePost(post)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition" title="Edit">
                                            <IconEdit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition" title="Delete">
                                            <IconTrash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-500">No blog posts found.</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {(activePost !== null) && (
                <BlogPostModal 
                    post={activePost !== true ? activePost : null}
                    onClose={() => setActivePost(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};


// --- 3.5 FAQ MANAGEMENT (CRUD List - Reused from previous step) ---

// FAQ Modal
const FAQModal = ({ faq, onClose, onSave }) => {
    const isEdit = faq && faq.id;
    const [formData, setFormData] = useState(faq || { question: '', answer: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = () => {
        const newId = isEdit ? faq.id : Math.max(...initialFAQs.map(f => f.id), 0) + 1;
        onSave({ ...formData, id: newId });
    };

    return (
        <Modal title={isEdit ? 'Edit FAQ Item' : 'Add New FAQ Item'} onClose={onClose}>
            <div className="space-y-4">
                <InputField 
                    label="Question"
                    name="question" 
                    value={formData.question} 
                    onChange={handleChange}
                    placeholder="Question (e.g., How long is support available?)" 
                />
                <InputField
                    label="Answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    isTextArea
                    placeholder="Answer to the question..."
                />
                <button 
                    onClick={handleFormSubmit}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                    <IconSave className="w-5 h-5 inline mr-2"/> {isEdit ? 'Update FAQ' : 'Save FAQ'}
                </button>
            </div>
        </Modal>
    );
};

const ManageFAQ = () => {
    const [faqs, setFaqs] = useState(initialFAQs);
    const [activeFAQ, setActiveFAQ] = useState(null); // null, object for edit, true for add

    const handleSave = (newFAQ) => {
        const isNew = !faqs.some(f => f.id === newFAQ.id);
        if (isNew) {
            setFaqs(fs => [...fs, newFAQ]);
        } else {
            setFaqs(fs => fs.map(f => f.id === newFAQ.id ? newFAQ : f));
        }
        setActiveFAQ(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ entry?')) {
            setFaqs(fs => fs.filter(f => f.id !== id));
        }
    };

    return (
        <div className='space-y-6'>
            <div className="flex justify-between items-center pb-4">
                <h3 className="text-xl font-semibold text-gray-800">FAQ List</h3>
                <CreateBtn handleClick={() => setActiveFAQ(true)} text='Add FAQ' />
            </div>

            <Card>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-9/12">Question</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {faqs.length > 0 ? (
                            faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{faq.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs sm:max-w-none">{faq.question}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => setActiveFAQ(faq)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition" title="Edit">
                                            <IconEdit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition" title="Delete">
                                            <IconTrash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-500">No FAQ entries available.</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {(activeFAQ !== null) && (
                <FAQModal 
                    faq={activeFAQ !== true ? activeFAQ : null}
                    onClose={() => setActiveFAQ(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};


// --- 3.6 TRUSTED LOGO (Configuration Form for Logos) ---
const TrustedLogoTab = () => {
    const [logos, setLogos] = useState([
        { id: 1, name: 'Google', url: 'https://placehold.co/100x40/f4b400/ffffff?text=GOOGLE' },
        { id: 2, name: 'Amazon', url: 'https://placehold.co/100x40/ff9900/ffffff?text=AMAZON' },
    ]);
    const [newLogo, setNewLogo] = useState({ name: '', url: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleAddLogo = () => {
        if (newLogo.name && newLogo.url) {
            const newId = Math.max(...logos.map(l => l.id), 0) + 1;
            setLogos([...logos, { ...newLogo, id: newId }]);
            setNewLogo({ name: '', url: '' });
        }
    };

    const handleDelete = (id) => {
        setLogos(logos.filter(l => l.id !== id));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            console.log("Trusted Logos Saved:", logos);
            setIsSaving(false);
        }, 1000);
    };

    return (
        <Card className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Manage Client & Partner Logos</h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg bg-indigo-50">
                    <InputField 
                        label="Logo Name"
                        value={newLogo.name}
                        onChange={(e) => setNewLogo({...newLogo, name: e.target.value})}
                        placeholder="e.g., Microsoft"
                    />
                    <InputField 
                        label="Image URL"
                        value={newLogo.url}
                        onChange={(e) => setNewLogo({...newLogo, url: e.target.value})}
                        placeholder="https://image.com/logo.png"
                    />
                    <div className="pt-6">
                        <button
                            onClick={handleAddLogo}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
                        >
                            <IconPlus className="w-4 h-4" />
                            <span>Add Logo</span>
                        </button>
                    </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 pt-4">Current Logos ({logos.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {logos.map((logo) => (
                        <div key={logo.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg border shadow-sm">
                            <img src={logo.url} alt={logo.name} className="h-10 object-contain mb-2" onError={(e) => e.target.src='https://placehold.co/100x40/e0e0e0/555555?text=Image+Error'}/>
                            <p className="text-xs text-gray-700 font-medium truncate w-full text-center">{logo.name}</p>
                            <button onClick={() => handleDelete(logo.id)} className="mt-2 text-red-600 text-xs hover:text-red-800">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-end pt-4 border-t">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                >
                    <IconSave className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : 'Save Logo List'}</span>
                </button>
            </div>
        </Card>
    );
};

// --- 3.7 SOCIAL LINKS (Configuration Form for URLs) ---
const SocialLinkTab = () => {
    const [socials, setSocials] = useState({
        facebook: 'https://facebook.com/innovate_digital',
        twitter: 'https://x.com/innovate_co',
        linkedin: 'https://linkedin.com/company/innovate_solutions',
        instagram: 'https://instagram.com/innovate_official',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState('');

    const handleChange = (e) => {
        setSocials({ ...socials, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            console.log("Social Links Saved:", socials);
            setIsSaving(false);
            setSavedMsg('Social links updated!');
            setTimeout(() => setSavedMsg(''), 3000);
        }, 1000);
    };

    return (
        <Card className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Manage Social Media URLs</h3>

            <div className="space-y-6">
                {Object.keys(socials).map(platform => (
                    <InputField
                        key={platform}
                        label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                        name={platform}
                        value={socials[platform]}
                        onChange={handleChange}
                        placeholder={`https://${platform}.com/yourhandle`}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center pt-4 border-t">
                {savedMsg && (
                    <span className="text-sm font-medium text-green-600 transition-opacity duration-500">
                        {savedMsg}
                    </span>
                )}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                >
                    <IconSave className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : 'Save Social Links'}</span>
                </button>
            </div>
        </Card>
    );
};


// =========================================================
// 4. MAIN APPLICATION COMPONENT
// =========================================================

const TABS = [
    { id: 'general', name: 'General Setting', icon: IconCode, component: GeneralSettingsTab },
    { id: 'about', name: 'About Us', icon: IconGlobe, component: AboutUsTab },
    { id: 'blog', name: 'Blog', icon: IconCode, component: ManageBlogPosts },
    { id: 'logo', name: 'Trusted Logo', icon: IconAward, component: TrustedLogoTab },
    { id: 'social', name: 'Social Link', icon: IconLink, component: SocialLinkTab },
    { id: 'faq', name: 'Manage FAQ', icon: IconHelpCircle, component: ManageFAQ },
    { id: 'contact', name: 'Contact Details', icon: IconGlobe, component: ContactDetailsTab },
];

const WebsiteManager = () => {
    const [activeTab, setActiveTab] = useState('general'); 
    
    // Find the current component to render
    const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || GeneralSettingsTab;
    const currentTabName = TABS.find(t => t.id === activeTab).name;

    return (
            <div>
                
                {/* Header/Title Block */}
                <div className="flex justify-between items-center bg-white p-5 border-b border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-900">
                        {/* Mock Link back to dashboard */}
                        <a href="#" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition">
                            <IconArrowLeft className="w-4 h-4 font-medium" />
                        </a>
                        <span className="font-bold text-xl text-indigo-600">Website Manager</span>
                        <span className="font-medium text-xl text-gray-900 ml-4 hidden sm:inline-block">/ {currentTabName}</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    
                    {/* Sidebar Navigation */}
                    <nav className="w-full lg:w-64 bg-gray-50 border-r border-gray-200">
                        <ul className="space-y-1">
                            {TABS.map(tab => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <li key={tab.id}>
                                        <button
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center w-full p-3 rounded-sm font-semibold text-left transition-all duration-200 
                                                ${isActive 
                                                    ? 'bg-indigo-100 text-indigo-700' 
                                                    : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'}`
                                            }
                                        >
                                            <span className="truncate">{tab.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Content Area */}
                    <main className="flex-1 p-6 sm:p-8">
                        <ActiveComponent />
                    </main>
                </div>
            </div>
    );
};

export default WebsiteManager;

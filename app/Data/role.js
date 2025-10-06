// constants/roles.js (অথবা data/roles.js)

// constants/roles.js (অথবা data/roles.js)

export const initialRoles = [
    { id: 101, name: 'Administrator', description: 'Full system access, manages users, settings, and audits.', users: 1, permissions: ['Manage Users', 'Configure Settings', 'View All Data', 'System Audit'] },
    { id: 102, name: 'Manager', description: 'Can approve content and manage team-level resources.', users: 3, permissions: ['Create Content', 'Edit Content', 'Approve Changes', 'View Reports'] },
    { id: 103, name: 'Editor', description: 'Can create and modify content within allowed sections.', users: 12, permissions: ['Create Content', 'Edit Content', 'View All Data'] },
    { id: 104, name: 'Viewer', description: 'Read-only access to published data and reports.', users: 50, permissions: ['View Published Data', 'Generate Basic Reports'] },
    { id: 105, name: 'Guest', description: 'Limited access to public reports only.', users: 15, permissions: ['View Public Reports'] },
];
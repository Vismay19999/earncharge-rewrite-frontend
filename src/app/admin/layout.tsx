import React from 'react';
import Link from 'next/link';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <aside>
                navbar here
            </aside>
            <main className="flex-1 p-8 bg-gray-100">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;

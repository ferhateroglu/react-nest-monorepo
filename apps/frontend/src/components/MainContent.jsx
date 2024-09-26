import React from 'react';

export default function MainContent({ children }) {
    return (
        <main className="p-6 sm:w-10/12 md:w-8/12 lg:w-6/12">
            {children}
        </main>
    );
}
import React, { useState, useLayoutEffect, useEffect } from 'react';
import ToggleButton from './ToggleButton';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSessions } from '../services/api'
import { useSessionStore } from '../store/sessionStore';


export default function ChatLayout({ children }) {

    const selectedSessionId = useSessionStore((state) => state.selectedSessionId);
    const setSelectedSessionId = useSessionStore((state) => state.setSelectedSessionId);

    const [isOpen, setIsOpen] = useState(true);
    const [width, setWidth] = useState(16);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const queryClient = useQueryClient();
    const { data: sessionsData, isLoading, isError } = useQuery({
        queryKey: ['sessions'],
        queryFn: () => fetchSessions(1, 20),
        staleTime: 60000,
        cacheTime: 300000,
    });
    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        setWidth(isOpen ? 16 : 1);
    }, [isOpen]);

    useEffect(() => {
        if (!selectedSessionId && sessionsData?.meta?.totalCount > 0) {
            setSelectedSessionId(sessionsData.sessions[0]._id);
        }
    }, [sessionsData]);

    useLayoutEffect(() => {
        const checkScreenSize = () => {
            setIsOpen(window.innerWidth >= 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="relative flex justify-center min-h-screen min-w-full">
            <Sidebar isOpen={isOpen} width={width}>
                <ToggleButton isOpen={isOpen} onClick={toggleSidebar} />
            </Sidebar>
            <MainContent>{children}</MainContent>
        </div>
    );
}
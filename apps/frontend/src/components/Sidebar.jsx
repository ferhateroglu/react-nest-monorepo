import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSessionStore } from '../store/sessionStore';
import { createSession } from '../services/api';


export default function Sidebar({ isOpen, width, children }) {

    const selectedSessionId = useSessionStore((state) => state.selectedSessionId);
    const setSelectedSessionId = useSessionStore((state) => state.setSelectedSessionId);
    const queryClient = useQueryClient();
    const { data: sessionsData, isLoading, isError } = useQuery({ queryKey: ['sessions'] });

    const createSessionMutation = useMutation({
        mutationFn: createSession,
        onSuccess: (newSession) => {
            queryClient.invalidateQueries(['sessions']);
            setSelectedSessionId(newSession.sessionId);
        },
    });

    const handleCreateSession = () => {
        createSessionMutation.mutate();
    };

    return (
        <aside
            className="absolute z-10 top-0 left-0 h-full bg-background border-r transition-all duration-300"
            style={{ width: `${width}rem` }}
        >
            {isOpen && <SidebarContent
                sessionsData={sessionsData}
                isLoading={isLoading}
                isError={isError}
                selectedSessionId={selectedSessionId}
                setSelectedSessionId={setSelectedSessionId}
                handleCreateSession={handleCreateSession}
                isCreatingSession={createSessionMutation.isLoading}
            />}
            {children}
        </aside>
    );
}

function SidebarContent(
    { sessionsData, isLoading, isError, selectedSessionId, setSelectedSessionId, handleCreateSession, isCreatingSession }
) {
    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-start h-full">
            <div className=" flex items-center justify-start w-10/12 h-16 ">
                <h1 className="text-xl p-3 font-bold">Recent Chats</h1>
            </div>

            <div className=" flex items-center justify-center w-10/12 h-16 hover:bg-muted rounded-lg  border ">
                <button className="flex w-full items-start p-3" onClick={() => handleCreateSession()}                >
                    <div className="flex flex-col items-start">
                        <p className="text-md ">Create new Session</p>
                    </div>
                </button>
            </div>

            {sessionsData?.sessions.map((session) => (
                <div
                    key={session._id}
                    onClick={() => setSelectedSessionId(session._id)}
                    className={`flex items-center justify-center w-10/12 h-16 hover:bg-muted rounded-lg ${session._id === selectedSessionId ? 'bg-muted' : ''
                        }`}
                >
                    <button className="flex w-full items-start gap-4 p-3 "
                        onClick={() => setSelectedSessionId(session._id)}
                    >
                        <div className="flex flex-col items-start justify-starts">
                            <p className="text-sm font-medium text-start">{
                                truncateText(session.questions[0].text, 28)
                            }</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                                {truncateText(session.answers[0])}
                            </p>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}
const truncateText = (answer, maxLength = 30) => {
    if (!answer) return 'No answer yet';
    return answer.length > maxLength ? answer.slice(0, maxLength).concat('...') : answer;
};

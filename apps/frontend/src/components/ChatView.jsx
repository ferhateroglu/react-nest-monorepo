import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useSession, useNextQuestion, useAnswerQuestion } from '../hooks/useSession';
import { useSessionStore } from '../store/sessionStore';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';



const ChatView = () => {

    const queryClient = useQueryClient();

    const sessionId = useSessionStore((state) => state.selectedSessionId);
    const [userInput, setUserInput] = useState('');
    const lastMessageRef = useRef(null);

    const { data: sessionData } = useSession(sessionId);
    const { data: nextQuestionData, isLoading: isLoadingQuestion, isError: isErrorQuestion } = useNextQuestion(sessionId);
    const answerQuestionMutation = useAnswerQuestion();

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [sessionData]);

    const handleUserInput = (input) => {
        answerQuestionMutation.mutate(
            { sessionId, answer: input },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["session", sessionId]);
                    setUserInput('');
                },
            }
        );
    };

    const chatEnded = !nextQuestionData || !nextQuestionData.question;


    return (
        <>
            <div className="flex overflow-hidden relative min-w-full min-h-full max-h-full flex-col border rounded-lg ">
                {!sessionId && (
                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">
                                Create or select a session to start chatting
                            </h1>
                        </div>
                    </div>
                )}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-110px)] scrollbar-dark">

                    <ChatMessages
                        answers={sessionData?.session?.answers}
                        questions={sessionData?.session?.questions}
                        lastMessageRef={lastMessageRef}
                        nextQuestionData={nextQuestionData}
                    />

                    <LoadingError
                        isLoading={isLoadingQuestion}
                        isError={isErrorQuestion}
                        errorText="Error loading question. Please try again."
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <UserInput
                        value={userInput}
                        onChange={setUserInput}
                        onSubmit={handleUserInput}
                        disabled={chatEnded || answerQuestionMutation.isLoading}
                    />
                </div>
            </div>
        </>
    );
};

const ChatMessages = ({ answers, questions, lastMessageRef }) => {
    if (answers?.length === 0) {
        return (
            <div>
                <ChatMessage message={{ text: questions[0].text, isUser: false }} />
            </div>
        )
    }
    return (
        <>
            {answers?.map((answer, index) => (
                <div key={index}>
                    <div key={(index * 2) - 1}>
                        <ChatMessage message={{ text: questions[index].text, isUser: false }} />
                    </div>

                    <div key={index * 2} ref={index === 9 ? lastMessageRef : null}>
                        <ChatMessage message={{ text: answer, isUser: true }} />
                    </div>

                    {index != 9 && index == answers.length - 1 && (
                        <div key={(index * 2) + 1}
                            ref={lastMessageRef}
                        >
                            <ChatMessage message={{ text: questions[index + 1].text, isUser: false }} />
                        </div>
                    )}

                </div>
            ))}
        </>
    );
};
const LoadingError = ({ isLoading, isError, errorText = "Error loading data." }) => {
    if (isLoading) {
        return <div>Loading next question...</div>;
    }
    if (isError) {
        return <div>{errorText}</div>;
    }
    return null;
};


export default ChatView;
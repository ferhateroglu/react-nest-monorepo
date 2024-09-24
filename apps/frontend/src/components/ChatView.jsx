import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';

const questions = [
    "What is your favorite breed of cat, and why?",
    "How do you think cats communicate with their owners?",
    "Have you ever owned a cat? If so, what was their name and personality like?",
    "Why do you think cats love to sleep in small, cozy places?",
    "What's the funniest or strangest behavior you've ever seen a cat do?",
    "Do you prefer cats or kittens, and what's the reason for your preference?",
    "Why do you think cats are known for being independent animals?",
    "How do you think cats manage to land on their feet when they fall?",
    "What's your favorite fact or myth about cats?",
    "How would you describe the relationship between humans and cats in three words?"
];

const ChatView = () => {
    const [messages, setMessages] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [chatEnded, setChatEnded] = useState(false);

    const lastMessageRef = useRef(null);


    useEffect(() => {
        if (currentQuestion < questions.length) {
            setMessages(prev => [...prev, { text: questions[currentQuestion], isUser: false }]);
        } else if (currentQuestion === questions.length && !chatEnded) {
            setMessages(prev => [...prev, { text: "Thank you for answering all the questions!", isUser: false }]);
            setChatEnded(true);
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [messages]);

    const handleUserInput = (input) => {
        setMessages(prev => [...prev, { text: input, isUser: true }]);
        setCurrentQuestion(prev => prev + 1);
        setUserInput('');
    };

    return (
        <>
            <div className="flex overflow-hidden relative min-w-full min-h-full max-h-full flex-col border rounded-lg ">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-110px)] scrollbar-dark"
                >
                    {messages.map((message, index) => (
                        <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
                            <ChatMessage message={message} />
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <UserInput
                        value={userInput}
                        onChange={setUserInput} onSubmit={handleUserInput} disabled={chatEnded} />
                </div>

            </div>

        </>
    );
};

export default ChatView;
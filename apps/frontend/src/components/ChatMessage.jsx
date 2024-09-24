import React from 'react';

const ChatMessage = ({ message }) => {
    return (
        <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.text}
            </div>
        </div>
    );
};

export default ChatMessage;
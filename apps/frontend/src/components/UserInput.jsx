import React from 'react';

const UserInput = ({ value, onChange, onSubmit, disabled }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-input bg-background">
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="w-9/12 px-4 py-2 border bg-background rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                    placeholder={disabled ? "Chat ended" : "Type your answer..."}
                />
                <button
                    type="submit"
                    disabled={disabled}
                    className="w-3/12 px-4 py-2 bg-primary text-primary-foreground rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default UserInput;
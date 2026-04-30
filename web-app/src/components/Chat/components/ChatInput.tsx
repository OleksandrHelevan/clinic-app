import { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    onTyping: (type: "TYPING" | "STOPPED_TYPING") => void;
    placeholder: string;
}

export const ChatInput = ({ onSendMessage, onTyping, placeholder }: ChatInputProps) => {
    const [value, setValue] = useState('');

    const handleSend = () => {
        if (!value.trim()) return;
        onSendMessage(value);
        setValue('');
        onTyping("STOPPED_TYPING");
    };

    return (
        <footer className="chat-footer">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onTyping(e.target.value ? "TYPING" : "STOPPED_TYPING");
                }}
                onBlur={() => onTyping("STOPPED_TYPING")}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={placeholder}
                className="chat-input"
            />
            <button onClick={handleSend} className="chat-send-btn" disabled={!value.trim()}>
                Send
            </button>
        </footer>
    );
};
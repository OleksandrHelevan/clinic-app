import {type ChangeEvent, useState} from 'react';
import type { ChatMessage } from "../../../domains/chat/types";

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    onTyping: (type: "TYPING" | "STOPPED_TYPING") => void;
    placeholder: string;
    replyingTo: ChatMessage | null;
    onCancelReply: () => void;
}

export const ChatInput = ({
                              onSendMessage,
                              onTyping,
                              placeholder,
                              replyingTo,
                              onCancelReply
                          }: ChatInputProps) => {
    const [value, setValue] = useState('');

    const handleSend = () => {
        if (!value.trim()) return;
        onSendMessage(value);
        setValue('');
        onTyping("STOPPED_TYPING");
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setValue(text);
        onTyping(text ? "TYPING" : "STOPPED_TYPING");
    };

    return (
        <footer className="chat-footer-wrapper">
            {replyingTo && (
                <div className="chat-reply-bar">
                    <div className="chat-reply-bar-content">
                        <span className="chat-reply-bar-title">
                            Reply to message
                        </span>
                        <p className="chat-reply-bar-text">
                            {replyingTo.content}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onCancelReply}
                        className="chat-reply-bar-close"
                        aria-label="Скасувати відповідь"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}

            <div className="chat-footer">
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={() => onTyping("STOPPED_TYPING")}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={placeholder}
                    className="chat-input"
                />
                <button
                    onClick={handleSend}
                    className="chat-send-btn"
                    disabled={!value.trim()}
                >
                    Send
                </button>
            </div>
        </footer>
    );
};
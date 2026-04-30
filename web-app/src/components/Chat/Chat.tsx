import React, { useState, useRef, useEffect } from 'react';
import type { DoctorResponse } from "../../domains/doctors/types.ts";
import './Chat.css';
import {useChat} from "../../domains/chat/useChat/useChat.ts";

interface ChatProps {
    doctor: DoctorResponse;
    onClose: () => void;
    currentUserId: string;
}

export const Chat = ({ doctor, onClose, currentUserId }: ChatProps) => {
    const [inputValue, setInputValue] = useState('');
    const {
        messages,
        isTyping,
        connected,
        sendMessage,
        sendTypingEvent
    } = useChat(currentUserId, doctor.id);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue('');
        sendTypingEvent("STOPPED_TYPING");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="chat-overlay">
            <div className="chat-container">
                <header className="chat-header">
                    <div className="chat-header-info">
                        <span className="chat-header-title">
                            {doctor.firstName} {doctor.lastName}
                        </span>
                        <div className="chat-header-status">
                            <span className={`status-indicator ${connected ? 'online' : 'offline'}`}></span>
                            {connected ? 'Online' : 'Offline'}
                            {isTyping && <span className="typing-text">• typing...</span>}
                        </div>
                    </div>
                    <button onClick={onClose} className="chat-close-btn" aria-label="Close chat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </header>

                <div className="chat-messages">
                    {messages.map((msg, index) => {
                        const isSentByMe = msg.senderId === currentUserId;
                        return (
                            <div
                                key={index}
                                className={`chat-bubble-wrapper ${isSentByMe ? 'sent' : 'received'}`}
                            >
                                <div className={`chat-bubble ${isSentByMe ? 'sent' : 'received'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="chat-footer">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            sendTypingEvent(e.target.value ? "TYPING" : "STOPPED_TYPING");
                        }}
                        onBlur={() => sendTypingEvent("STOPPED_TYPING")}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="chat-input"
                    />
                    <button
                        onClick={handleSend}
                        className="chat-send-btn"
                        disabled={!inputValue.trim()}
                    >
                        Send
                    </button>
                </footer>
            </div>
        </div>
    );
};
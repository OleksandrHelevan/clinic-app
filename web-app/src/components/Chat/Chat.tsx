import React, { useState } from 'react';
import type { DoctorResponse } from "../../domains/doctors/types.ts";
import { useChat } from "../../hooks/useChat/useChat.ts";

interface ChatProps {
    doctor: DoctorResponse;
    onClose: () => void;
    currentUserId: string;
}

export const Chat = ({ doctor, onClose, currentUserId }: ChatProps) => {
    const [inputValue, setInputValue] = useState('');
    const { messages, sendMessage, sendTypingEvent, isTyping, connected } = useChat(currentUserId, doctor.id);

    const handleSend = () => {
        sendMessage(inputValue);
        setInputValue('');
        sendTypingEvent("STOPPED_TYPING");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={popupOverlayStyle}>
            <div style={popupContentStyle}>
                <header style={popupHeaderStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Чат з: <strong>{doctor.firstName} {doctor.lastName}</strong></span>
                        <span style={{ fontSize: '10px' }}>
                            {connected ? '🟢 В мережі' : '🔴 Офлайн'} {isTyping && '| друкує...'}
                        </span>
                    </div>
                    <button onClick={onClose} style={closeButtonStyle}>✕</button>
                </header>

                <div style={messageListStyle}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            textAlign: msg.senderId === currentUserId ? 'right' : 'left',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                ...bubbleStyle,
                                backgroundColor: msg.senderId === currentUserId ? '#007bff' : '#e9ecef',
                                color: msg.senderId === currentUserId ? '#fff' : '#000',
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                <footer style={footerStyle}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            sendTypingEvent(e.target.value ? "TYPING" : "STOPPED_TYPING");
                        }}
                        onBlur={() => sendTypingEvent("STOPPED_TYPING")}
                        onKeyDown={handleKeyDown}
                        placeholder="Напишіть..."
                        style={inputStyle}
                    />
                    <button onClick={handleSend} style={sendButtonStyle}>Відправити</button>
                </footer>
            </div>
        </div>
    );
};

// Styles
const popupOverlayStyle: React.CSSProperties = { position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 };
const popupContentStyle: React.CSSProperties = { width: '320px', height: '450px', backgroundColor: '#fff', boxShadow: '0 5px 25px rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', flexDirection: 'column' };
const popupHeaderStyle: React.CSSProperties = { padding: '12px', backgroundColor: '#007bff', color: '#fff', display: 'flex', justifyContent: 'space-between', borderRadius: '12px 12px 0 0', alignItems: 'center' };
const closeButtonStyle: React.CSSProperties = { background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' };
const messageListStyle: React.CSSProperties = { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfd' };
const bubbleStyle: React.CSSProperties = { display: 'inline-block', padding: '8px 12px', borderRadius: '15px', maxWidth: '80%', fontSize: '0.9rem', wordBreak: 'break-word' };
const footerStyle: React.CSSProperties = { padding: '10px', borderTop: '1px solid #eee', display: 'flex', gap: '5px' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none' };
const sendButtonStyle: React.CSSProperties = { backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' };
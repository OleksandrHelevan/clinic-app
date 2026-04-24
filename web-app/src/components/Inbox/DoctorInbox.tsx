import React from 'react';
import type {ChatMessage} from "../../types/chat.ts";

interface DoctorInboxProps {
    messages: ChatMessage[];
    onSelectPatient: (patientId: string) => void;
    activePatientId?: string;
}

export const DoctorInbox: React.FC<DoctorInboxProps> = ({ messages, onSelectPatient, activePatientId }) => {
    // Групуємо повідомлення за пацієнтами, щоб показати унікальних відправників
    const chatPartners = Array.from(new Set(messages.map(m => m.senderId)));

    return (
        <div style={inboxStyle}>
        <h3 style={{ padding: '15px' }}>Чати з пацієнтами</h3>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {chatPartners.map(id => (
        <div
            key={id}
        onClick={() => onSelectPatient(id)}
        style={{
    ...chatItemStyle,
            backgroundColor: activePatientId === id ? '#e7f3ff' : 'transparent'
    }}
    >
        <strong>Пацієнт ID: {id}</strong>
    <p style={lastMsgStyle}>
        {messages.filter(m => m.senderId === id || m.recipientId === id).slice(-1)[0]?.content}
        </p>
        </div>
    ))}
    </div>
    </div>
);
};

const inboxStyle: React.CSSProperties = { width: '300px', borderRight: '1px solid #ddd', backgroundColor: '#fff' };
const chatItemStyle: React.CSSProperties = { padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer', transition: '0.2s' };
const lastMsgStyle: React.CSSProperties = { fontSize: '0.8rem', color: '#888', margin: '5px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
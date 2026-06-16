import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    AiChatContainer,
    AiChatHeader,
    AiChatMessages,
    AiChatBubble,
    AiChatInputRow,
    AiChatInput,
    AiChatSendBtn,
    AiChatTyping,
    AiChatClearBtn,
    AiChatWelcome,
    AiChatHeaderInfo,
    AiChatHeaderTitle,
    AiChatHeaderSubtitle,
    ChatCloseBtn,
} from '../Chat.styles';
import { useAiChat } from '../../../domains/ai/useAiChat/useAiChat.ts';

// ── Types ────────────────────────────────────────────────────────────────────

interface RecommendedDoctor {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    photoUrl?: string;
    rating?: number;
    experience?: number;
}

interface AiChatViewProps {
    currentUserId: string;
    onClose: () => void;
    onBack: () => void;
    onBookDoctor?: (doctorId: string) => void;
}

// ── Doctor Card Styles ───────────────────────────────────────────────────────

const DoctorCardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 4px 12px 4px 12px;
`;

const Card = styled.div`
    background: #ffffff;
    border: 1px solid #e3ecfd;
    border-radius: 16px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 240px;
    box-shadow: 0 2px 12px rgba(66, 133, 244, 0.08);
`;

const CardLabel = styled.div`
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #4285F4;
    opacity: 0.8;
`;

const DoctorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const AvatarPlaceholder = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
`;

const AvatarImg = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
`;

const DoctorDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
`;

const DoctorName = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #1a1a2e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SpecBadge = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: #4285F4;
    background: #e8f0fe;
    border-radius: 6px;
    padding: 2px 7px;
    width: fit-content;
`;

const MetaRow = styled.div`
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: #888;
`;


const BookBtn = styled.button`
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 9px 0;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.15s;

    &:hover {
        opacity: 0.88;
    }

    &:active {
        opacity: 0.75;
    }
`;

const SPEC_LABELS: Record<string, string> = {
    CARDIOLOGIST: 'Cardiologist',
    NEUROLOGIST: 'Neurologist',
    DERMATOLOGIST: 'Dermatologist',
    ORTHOPEDIST: 'Orthopedist',
    THERAPIST: 'Therapist',
    OPHTHALMOLOGIST: 'Ophthalmologist',
    ENT: 'ENT Specialist',
    GASTROENTEROLOGIST: 'Gastroenterologist',
    ENDOCRINOLOGIST: 'Endocrinologist',
    SURGEON: 'Surgeon',
};

interface DoctorCardProps {
    doctor: RecommendedDoctor;
    onBook: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
    const initials = `${doctor.firstName[0] ?? ''}${doctor.lastName[0] ?? ''}`.toUpperCase();
    const specLabel = SPEC_LABELS[doctor.specialization] ?? doctor.specialization;

    return (
        <DoctorCardWrapper>
            <Card>
                <CardLabel>Recommended Doctor</CardLabel>

                <DoctorInfo>
                    {doctor.photoUrl ? (
                        <AvatarImg src={doctor.photoUrl} alt={`${doctor.firstName} ${doctor.lastName}`} />
                    ) : (
                        <AvatarPlaceholder>{initials}</AvatarPlaceholder>
                    )}
                    <DoctorDetails>
                        <DoctorName>{doctor.firstName} {doctor.lastName}</DoctorName>
                        <SpecBadge>{specLabel}</SpecBadge>
                    </DoctorDetails>
                </DoctorInfo>

                {(doctor.rating != null || doctor.experience != null) && (
                    <MetaRow>
                        {doctor.rating != null && <span>⭐ {doctor.rating.toFixed(1)}</span>}
                        {doctor.experience != null && <span>🩺 {doctor.experience} yrs exp.</span>}
                    </MetaRow>
                )}

                <BookBtn onClick={() => onBook(doctor.id)}>
                    View Doctor Profile
                </BookBtn>
            </Card>
        </DoctorCardWrapper>
    );
};


const GeminiLogo = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <defs>
            <linearGradient id="gem1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#8AB4F8" />
            </linearGradient>
        </defs>
        <path
            d="M14 2C14 2 14 13 2 14C14 14 14 26 14 26C14 26 14 14 26 14C14 14 14 2 14 2Z"
            fill="url(#gem1)"
        />
    </svg>
);


export const AiChatView = ({ currentUserId, onClose, onBack, onBookDoctor }: AiChatViewProps) => {
    const { messages, isLoading, sendMessage, loadHistory, clearHistory } = useAiChat(currentUserId);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        sendMessage(input.trim());
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleBook = (doctorId: string) => {
        onBookDoctor?.(doctorId);
    };

    return (
        <AiChatContainer>
            <AiChatHeader>
                <button
                    onClick={onBack}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px 4px 0' }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <GeminiLogo />

                <AiChatHeaderInfo>
                    <AiChatHeaderTitle>AI Assistant</AiChatHeaderTitle>
                    <AiChatHeaderSubtitle>Powered by Gemini</AiChatHeaderSubtitle>
                </AiChatHeaderInfo>

                <AiChatClearBtn onClick={clearHistory} title="Clear history">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                    </svg>
                </AiChatClearBtn>

                <ChatCloseBtn onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </ChatCloseBtn>
            </AiChatHeader>

            <AiChatMessages>
                {messages.length === 0 && !isLoading && (
                    <AiChatWelcome>
                        <GeminiLogo size={40} />
                        <p>Hello! I'm your clinic's medical AI assistant.</p>
                        <p>Describe your symptoms and I'll help you figure out next steps.</p>
                    </AiChatWelcome>
                )}

                {messages.map((msg, i) => (
                    <div key={i}>
                        <AiChatBubble isUser={msg.role === 'user'}>
                            {msg.message}
                        </AiChatBubble>

                        {msg.role === 'assistant' && msg.recommendedDoctor && (
                            <DoctorCard
                                doctor={msg.recommendedDoctor}
                                onBook={handleBook}
                            />
                        )}
                    </div>
                ))}

                {isLoading && (
                    <AiChatTyping>
                        <span /><span /><span />
                    </AiChatTyping>
                )}

                <div ref={messagesEndRef} />
            </AiChatMessages>

            <AiChatInputRow>
                <AiChatInput
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your symptoms..."
                    disabled={isLoading}
                />
                <AiChatSendBtn onClick={handleSend} disabled={isLoading || !input.trim()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </AiChatSendBtn>
            </AiChatInputRow>
        </AiChatContainer>
    );
};
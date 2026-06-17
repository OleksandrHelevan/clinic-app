import { useEffect, useRef, useState } from 'react';
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
import { GeminiLogo } from "../../../assets/GeminiLogo.tsx";
import {DoctorCard} from "../components/DoctorCard/DoctorCard.tsx";


interface AiChatViewProps {
    currentUserId: string;
    onClose: () => void;
    onBack: () => void;
    onBookDoctor?: (doctorId: string) => void;
}

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
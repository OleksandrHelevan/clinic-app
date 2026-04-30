import { useRef, useEffect } from 'react';
import type { ChatMessage } from "../../../domains/chat/types";

interface ChatMessagesProps {
    messages: ChatMessage[];
    currentUserId: string;
    isTyping: boolean;
}

export const ChatMessages = ({ messages, currentUserId, isTyping }: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 150;

        const lastMessage = messages[messages.length - 1];
        const isMyMessage = lastMessage?.senderId === currentUserId;

        if (isAtBottom || isMyMessage) {
            scrollToBottom();
        }
    }, [messages, isTyping, currentUserId]);

    return (
        <div className="chat-messages" ref={containerRef}>
            {messages.map((msg, index) => {
                const isSentByMe = msg.senderId === currentUserId;
                return (
                    <div key={msg.id || index} className={`chat-bubble-wrapper ${isSentByMe ? 'sent' : 'received'}`}>
                        <div className={`chat-bubble ${isSentByMe ? 'sent' : 'received'}`}>
                            {msg.content}
                        </div>
                    </div>
                );
            })}

            {isTyping && (
                <div className="chat-bubble-wrapper received typing-indicator-wrapper">
                    <div className="chat-bubble received typing-bubble">
                        <span className="typing-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                        <small className="typing-name"></small>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};
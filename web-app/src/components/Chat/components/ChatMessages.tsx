import { useRef, useEffect } from 'react';
import type { ChatMessage } from "../../../domains/chat/types";
import type {ChatUser} from "./ChatHeader.tsx";

interface ChatMessagesProps {
    messages: ChatMessage[];
    currentUserId: string;
    otherUser: ChatUser;
    isTyping: boolean;
    onLikeMessage: (messageId: string, currentLikedStatus: boolean) => void;
    onReplyMessage: (message: ChatMessage) => void;
}

export const ChatMessages = ({ messages, currentUserId, otherUser, isTyping, onLikeMessage, onReplyMessage }: ChatMessagesProps) => {
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
                const isActuallyLiked = msg.liked === true;

                return (
                    <div key={msg.id || index} className={`chat-bubble-wrapper ${isSentByMe ? 'sent' : 'received'}`}>
                        <div className={`chat-bubble ${isSentByMe ? 'sent' : 'received'}`}>

                            {msg.replyToMessageId && (
                                <div className="chat-message-reply-preview">
                                    <small className="reply-sender">
                                        {`${otherUser.firstName || "Some"} ${otherUser.lastName || "User"}`}
                                    </small>
                                    <p className="reply-text">{msg.replyPreview}</p>
                                </div>
                            )}

                            <div className="chat-message-content">
                                {msg.content}
                            </div>

                            <div className="chat-message-actions">
                                <button
                                    className="chat-reply-btn"
                                    onClick={() => onReplyMessage(msg)}
                                    aria-label="Reply to message"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 17 4 12 9 7"></polyline>
                                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                                    </svg>
                                </button>

                                <button
                                    className={`chat-like-btn ${isActuallyLiked ? 'liked' : ''}`}
                                    onClick={() => onLikeMessage(msg.id, isActuallyLiked)}
                                    aria-label="Like message"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={isActuallyLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>


                            </div>
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
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};
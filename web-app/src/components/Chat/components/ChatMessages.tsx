import { useRef, useLayoutEffect } from 'react';
import type { ChatMessage } from "../../../domains/chat/types";
import type { ChatUser } from "./ChatHeader.tsx";
import { Loader } from "../../Loader/Loader.tsx";
import { ChatMessageItem } from "./ChatMessageItem.tsx";

interface ChatMessagesProps {
    messages: ChatMessage[];
    currentUserId: string;
    otherUser: ChatUser;
    isTyping: boolean;
    onLikeMessage: (messageId: string, currentLikedStatus: boolean) => void;
    onReplyMessage: (message: ChatMessage) => void;
    onLoadMore: () => void;
    hasMore: boolean;
    isLoadingMore: boolean;
}

export const ChatMessages = ({
                                 messages,
                                 currentUserId,
                                 otherUser,
                                 isTyping,
                                 onLikeMessage,
                                 onReplyMessage,
                                 onLoadMore,
                                 hasMore,
                                 isLoadingMore
                             }: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const prevScrollHeightRef = useRef<number>(0);
    const shouldRestoreScrollRef = useRef<boolean>(false);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        if (shouldRestoreScrollRef.current) {
            const { scrollHeight } = containerRef.current;
            containerRef.current.scrollTop = scrollHeight - prevScrollHeightRef.current;
            shouldRestoreScrollRef.current = false;
        } else {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 150;
            const lastMessage = messages[messages.length - 1];
            const isMyMessage = lastMessage?.senderId === currentUserId;

            if (isAtBottom || isMyMessage || messages.length <= 50) {
                scrollToBottom(messages.length <= 50 ? "auto" : "smooth");
            }
        }
    }, [messages, isTyping, currentUserId]);

    const handleScroll = () => {
        if (!containerRef.current || !hasMore || isLoadingMore) return;

        const { scrollTop, scrollHeight } = containerRef.current;

        if (scrollTop <= 5) {
            prevScrollHeightRef.current = scrollHeight;
            shouldRestoreScrollRef.current = true;
            onLoadMore();
        }
    };

    return (
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {isLoadingMore && (
                <div className="chat-loading-more-overlay">
                    <Loader />
                </div>
            )}

            <div className="chat-messages" ref={containerRef} onScroll={handleScroll}>
                {messages.map((msg, index) => (
                    <ChatMessageItem
                        key={msg.id || index}
                        msg={msg}
                        allMessages={messages}
                        currentUserId={currentUserId}
                        otherUser={otherUser}
                        onLikeMessage={onLikeMessage}
                        onReplyMessage={onReplyMessage}
                    />
                ))}

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
        </div>
    );
};
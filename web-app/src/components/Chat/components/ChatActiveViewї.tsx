import { useState } from 'react';
import { useChat } from "../../../domains/chat/useChat/useChat.ts";
import { ChatHeader, type ChatUser } from "./ChatHeader.tsx";
import { ChatMessages } from "./ChatMessages.tsx";
import { ChatInput } from "./ChatInput.tsx";
import type { ChatMessage } from "../../../domains/chat/types";

interface ChatActiveViewProps {
    user: ChatUser;
    currentUserId: string;
    onClose: () => void;
    onBack?: () => void;
}

export const ChatActiveView = ({
                                   user,
                                   currentUserId,
                                   onClose,
                                   onBack
                               }: ChatActiveViewProps) => {
    const {
        messages,
        isTyping,
        connected,
        sendMessage,
        sendTypingEvent,
        toggleLikeMessage,
        otherUser,
        loadMoreMessages,
        hasMoreMessages,
        isLoadingHistory
    } = useChat(currentUserId, user.id);

    const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);

    const displayUser: ChatUser = {
        id: user.id,
        firstName: otherUser?.firstName || user.firstName,
        lastName: otherUser?.lastName || user.lastName
    };

    const handleSendMessage = (content: string) => {
        if (replyingTo) {
            const isMe = replyingTo.senderId === currentUserId;
            const replySenderName = isMe ? "Ви" : `${displayUser.firstName} ${displayUser.lastName}`;
            sendMessage(content, replyingTo.id, replyingTo.content, replySenderName);

            setReplyingTo(null);
        } else {
            sendMessage(content);
        }
    };

    return (
        <>
            <ChatHeader
                user={displayUser}
                connected={connected}
                onClose={onClose}
                onBack={onBack}
            />

            <ChatMessages
                messages={messages}
                currentUserId={currentUserId}
                isTyping={isTyping}
                onLikeMessage={toggleLikeMessage}
                onReplyMessage={setReplyingTo}
                otherUser={displayUser}
                onLoadMore={loadMoreMessages}
                hasMore={hasMoreMessages ?? false}
                isLoadingMore={isLoadingHistory ?? false}
            />

            <ChatInput
                onSendMessage={handleSendMessage}
                onTyping={sendTypingEvent}
                placeholder={isTyping ? `${displayUser.firstName} typing...` : "Enter message..."}
                replyingTo={replyingTo}
                onCancelReply={() => setReplyingTo(null)}
            />
        </>
    );
};
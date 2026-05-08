import { useChat } from "../../../domains/chat/useChat/useChat.ts";
import { ChatHeader, type ChatUser } from "./ChatHeader.tsx";
import { ChatMessages } from "./ChatMessages.tsx";
import { ChatInput } from "./ChatInput.tsx";

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
    const { messages, isTyping, connected, sendMessage, sendTypingEvent } = useChat(currentUserId, user.id);

    return (
        <>
            <ChatHeader
                user={user}
                connected={connected}
                onClose={onClose}
                onBack={onBack}
            />
            <ChatMessages
                messages={messages}
                currentUserId={currentUserId}
                isTyping={isTyping}
            />
            <ChatInput
                onSendMessage={sendMessage}
                onTyping={sendTypingEvent}
                placeholder={isTyping ? `${user.firstName} typing...` : "Enter message..."}
            />
        </>
    );
};
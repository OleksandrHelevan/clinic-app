import { useState, type ReactNode } from 'react';
import type { ChatUser } from "../components/ChatHeader.tsx";
import { Chat } from "../Chat.tsx";
import { ChatContext } from "./ChatContext.tsx";

export const ChatProvider = ({ children, currentUserId }: { children: ReactNode, currentUserId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeUser, setActiveUser] = useState<ChatUser | undefined>(undefined);

    const openChat = (user?: ChatUser) => {
        setActiveUser(user);
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
        setActiveUser(undefined);
    };

    return (
        <ChatContext.Provider value={{ isOpen, activeUser, openChat, closeChat }}>
            {children}
            {isOpen && (
                <Chat
                    user={activeUser}
                    currentUserId={currentUserId}
                    onClose={closeChat}
                />
            )}
        </ChatContext.Provider>
    );
};
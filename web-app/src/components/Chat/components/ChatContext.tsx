import { createContext, useContext } from 'react';
import type { ChatUser } from "./ChatHeader.tsx";

export interface ChatContextType {
    isOpen: boolean;
    activeUser?: ChatUser;
    openChat: (user?: ChatUser) => void;
    closeChat: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatGlobal = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChatGlobal must be used within ChatProvider");
    return context;
};
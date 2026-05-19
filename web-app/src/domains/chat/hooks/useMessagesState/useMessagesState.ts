import { useCallback, useState } from "react";
import type { ChatMessage } from "../../types.ts";

export const useMessagesState = (initialMessages: ChatMessage[] = []) => {
    const [messages, setMessagesInternal] = useState<ChatMessage[]>(initialMessages);

    const setMessages = useCallback((newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
        setMessagesInternal(newMessages);
    }, []);

    const addMessage = useCallback((msg: ChatMessage) => {
        setMessagesInternal(prev => {
            if (prev.some(m => m.id === msg.id)) return prev;
            const filtered = prev.filter(
                m => !m.id.startsWith("temp-") || m.content !== msg.content
            );
            return [...filtered, msg];
        });
    }, []);

    const updateMessageStructure = useCallback((messageId: string, updatedFields: Partial<ChatMessage>) => {
        setMessagesInternal(prev =>
            prev.map(msg => (msg.id === messageId ? { ...msg, ...updatedFields } : msg))
        );
    }, []);

    return {
        messages,
        setMessages,
        addMessage,
        updateMessageStructure
    };
};
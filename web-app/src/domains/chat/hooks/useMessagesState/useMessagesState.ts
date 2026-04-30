import {
    useCallback,
    useEffect,
    useState
} from "react";

import type {ChatMessage} from "../../types.ts";

export const useMessagesState = (
    initialMessages: ChatMessage[] = []
) => {
    const [messages, setMessages] = useState<ChatMessage[]>(
        initialMessages
    );
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);
    const addMessage = useCallback(
        (msg: ChatMessage) => {
            setMessages(prev => {
                if (prev.some(m => m.id === msg.id)) {
                    return prev;
                }

                const filtered = prev.filter(
                    m =>
                        !m.id.startsWith("temp-") ||
                        m.content !== msg.content
                );

                return [...filtered, msg];
            });
        },
        []
    );

    return {
        messages,
        setMessages,
        addMessage
    };
};
import {useEffect, useRef, useState, useCallback} from 'react';
import {chatService} from "../services/chatService.ts";
import type {ChatEvent, ChatMessage} from "../types.ts";

export const useChat = (currentUserId: string, defaultRecipientId?: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [connected, setConnected] = useState(false);

    const wsService = useRef<chatService>(new chatService());

    const handleIncomingEvent = useCallback((event: ChatEvent) => {
        if (!defaultRecipientId || event.senderId === defaultRecipientId) {
            if (event.type === "TYPING") setIsTyping(true);
            if (event.type === "STOPPED_TYPING") setIsTyping(false);
        }
    }, [defaultRecipientId]);

    useEffect(() => {
        if (!currentUserId) return;

        const service = wsService.current;

        service.connect(currentUserId, {
            onConnect: () => setConnected(true),
            onDisconnect: () => setConnected(false),
            onMessage: (msg) => {
                setMessages((prev) => [...prev, msg]);
            },
            onEvent: handleIncomingEvent
        });

        return () => {
            service.disconnect();
        };
    }, [currentUserId, handleIncomingEvent]);

    const sendMessage = useCallback((content: string, overrideRecipientId?: string) => {
        const targetId = overrideRecipientId || defaultRecipientId;

        if (content.trim() && targetId) {
            const message: ChatMessage = {
                senderId: currentUserId,
                recipientId: targetId,
                content: content,
                timestamp: new Date().toISOString(),
            };

            wsService.current.sendMessage(message);

            setMessages((prev) => [...prev, message]);
        }
    }, [currentUserId, defaultRecipientId]);

    const sendTypingEvent = useCallback((type: "TYPING" | "STOPPED_TYPING", overrideRecipientId?: string) => {
        const targetId = overrideRecipientId || defaultRecipientId;

        if (targetId) {
            wsService.current.sendEvent(type, targetId);
        }
    }, [defaultRecipientId]);

    return {
        messages,
        sendMessage,
        sendTypingEvent,
        isTyping,
        connected
    };
};
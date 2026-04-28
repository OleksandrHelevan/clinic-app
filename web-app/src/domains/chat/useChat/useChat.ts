import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatService } from "../services/chatService.ts";
import type { ChatEvent, ChatMessage, SendMessagePayload } from "../types.ts";

export const useChat = (currentUserId: string, defaultRecipientId?: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [connected, setConnected] = useState(false);

    const wsService = useRef<ChatService>(new ChatService());

    const onMessageRef = useRef<(msg: ChatMessage) => void>(() => {});
    const onEventRef = useRef<(event: ChatEvent) => void>(() => {});

    useEffect(() => {
        onMessageRef.current = (msg: ChatMessage) => {
            const isRelevant =
                (msg.senderId === defaultRecipientId && msg.recipientId === currentUserId) ||
                (msg.senderId === currentUserId && msg.recipientId === defaultRecipientId);

            if (isRelevant) {
                setMessages((prev) => {
                    if (prev.some(m => m.id === msg.id)) return prev;
                    const filtered = prev.filter(m => !m.id.startsWith('temp-') || m.content !== msg.content);
                    return [...filtered, msg];
                });
            }
        };

        onEventRef.current = (event: ChatEvent) => {
            if (event.senderId === defaultRecipientId) {
                if (event.type === "TYPING") setIsTyping(true);
                if (event.type === "STOPPED_TYPING") setIsTyping(false);
                if (event.type === "LIKE_UPDATE" && event.messageId) {
                    setMessages(prev => prev.map(msg =>
                        msg.id === event.messageId ? { ...msg, isLiked: event.isLiked } : msg
                    ));
                }
            }
        };
    }, [currentUserId, defaultRecipientId]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!currentUserId || !defaultRecipientId) return;
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch(
                    `/api/chat/history/${currentUserId}/${defaultRecipientId}`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (e) {
                console.error("History load error:", e);
            }
        };
        fetchHistory();
    }, [currentUserId, defaultRecipientId]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!currentUserId || !token) return;

        const service = wsService.current;
        service.connect(currentUserId, {
            onConnect: () => setConnected(true),
            onDisconnect: () => setConnected(false),
            onMessage: (msg) => onMessageRef.current(msg),
            onEvent: (event) => onEventRef.current(event)
        });

        return () => service.disconnect();
    }, [currentUserId]);

    const sendMessage = useCallback((content: string) => {
        if (content.trim() && defaultRecipientId) {
            const payload: SendMessagePayload = {
                senderId: currentUserId,
                recipientId: defaultRecipientId,
                content: content,
            };

            wsService.current.sendMessage(payload);

            const optimisticMessage: ChatMessage = {
                id: `temp-${Date.now()}`,
                senderId: currentUserId,
                recipientId: defaultRecipientId,
                content: content,
                timestamp: new Date().toISOString(),
                isLiked: false
            };

            setMessages((prev) => [...prev, optimisticMessage]);
        }
    }, [currentUserId, defaultRecipientId]);

    const sendTypingEvent = useCallback((type: "TYPING" | "STOPPED_TYPING") => {
        if (defaultRecipientId) {
            wsService.current.sendEvent({ type, recipientId: defaultRecipientId });
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
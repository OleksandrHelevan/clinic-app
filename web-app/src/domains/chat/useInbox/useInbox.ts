import { useEffect, useState, useCallback, useRef } from 'react';
import { ChatService } from "../services/chatService.ts";
import type { ChatMessage, ChatEvent } from "../types.ts";

export const useInbox = (currentUserId: string) => {
    const [inbox, setInbox] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [connected, setConnected] = useState(false);

    const wsService = useRef<ChatService>(new ChatService());

    const updateInboxWithNewMessage = useCallback((msg: ChatMessage) => {
        setInbox(prevInbox => {
            const filtered = prevInbox.filter(m =>
                !((m.senderId === msg.senderId && m.recipientId === msg.recipientId) ||
                    (m.senderId === msg.recipientId && m.recipientId === msg.senderId))
            );
            return [msg, ...filtered];
        });
    }, []);

    useEffect(() => {
        const fetchInbox = async () => {
            if (!currentUserId) return;

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                setIsLoading(true);
                const response = await fetch(
                    `api/chat/inbox/${currentUserId}`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setInbox(data);
                }
            } catch (e) {
                console.error("Failed to fetch inbox:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInbox();
    }, [currentUserId]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!currentUserId || !token) return;

        const service = wsService.current;

        service.connect(currentUserId, {
            onConnect: () => setConnected(true),
            onDisconnect: () => setConnected(false),
            onMessage: (msg) => {
                updateInboxWithNewMessage(msg);
            },
            onEvent: (event: ChatEvent) => {
                if (event.type === "LIKE_UPDATE" && event.messageId) {
                    setInbox(prev => prev.map(m =>
                        m.id === event.messageId ? { ...m, isLiked: event.isLiked } : m
                    ));
                }
            }
        });

        return () => {
            service.disconnect();
        };
    }, [currentUserId, updateInboxWithNewMessage]);

    return {
        inbox,
        isLoading,
        connected,
        setInbox
    };
};
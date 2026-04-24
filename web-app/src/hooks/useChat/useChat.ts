import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ChatEvent, ChatMessage } from "../../types/chat.ts";

// recipientId тепер опціональний (?)
export const useChat = (currentUserId: string, recipientId?: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [connected, setConnected] = useState(false);
    const stompClient = useRef<Client | null>(null);

    const handleIncomingEvent = useCallback((event: ChatEvent) => {
        // Логіка typing працює лише якщо івент прийшов від того, з ким ми зараз спілкуємось
        if (event.senderId === recipientId) {
            if (event.type === "TYPING") setIsTyping(true);
            if (event.type === "STOPPED_TYPING") setIsTyping(false);
        }
    }, [recipientId]);

    useEffect(() => {
        if (!currentUserId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                setConnected(true);

                // Підписка на вхідні повідомлення для поточного юзера
                client.subscribe(`/user/${currentUserId}/queue/messages`, (payload) => {
                    const msg: ChatMessage = JSON.parse(payload.body);
                    setMessages((prev) => [...prev, msg]);
                });

                // Підписка на події
                client.subscribe(`/user/${currentUserId}/queue/events`, (payload) => {
                    const event: ChatEvent = JSON.parse(payload.body);
                    handleIncomingEvent(event);
                });
            },
            onDisconnect: () => setConnected(false),
        });

        client.activate();
        stompClient.current = client;

        return () => {
            if (client.active) client.deactivate();
        };
    }, [currentUserId, handleIncomingEvent]);

    // Додано параметр targetId, щоб можна було слати повідомлення будь-кому
    const sendMessage = (content: string, targetId?: string) => {
        const finalRecipientId = targetId || recipientId;

        if (stompClient.current?.connected && content.trim() && finalRecipientId) {
            const message: ChatMessage = {
                senderId: currentUserId,
                recipientId: finalRecipientId,
                content: content,
                timestamp: new Date().toISOString(),
            };

            stompClient.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(message),
            });

            setMessages((prev) => [...prev, message]);
        }
    };

    const sendTypingEvent = (type: "TYPING" | "STOPPED_TYPING", targetId?: string) => {
        const finalRecipientId = targetId || recipientId;

        if (stompClient.current?.connected && finalRecipientId) {
            const event = { type, senderId: currentUserId, recipientId: finalRecipientId };
            stompClient.current.publish({
                destination: '/app/chat.sendEvent',
                body: JSON.stringify(event),
            });
        }
    };

    return { messages, sendMessage, sendTypingEvent, isTyping, connected };
};
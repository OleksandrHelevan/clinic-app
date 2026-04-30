import { useEffect, useRef, useState } from "react";
import type { ChatEvent, ChatMessage } from "../../types.ts";
import { ChatWsService } from "../../services/chatWsService.ts";

interface UseChatConnectionHandlers {
    onMessage?: (msg: ChatMessage) => void;
    onEvent?: (event: ChatEvent) => void;
}

export const useChatConnection = (
    currentUserId: string,
    handlers: UseChatConnectionHandlers
) => {
    const [connected, setConnected] = useState(false);

    const wsServiceRef = useRef<ChatWsService | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!currentUserId || !token) {
            return;
        }

        const service = new ChatWsService();

        wsServiceRef.current = service;

        service.connect(currentUserId, {
            onConnect: () => setConnected(true),

            onDisconnect: () => setConnected(false),

            onMessage: handlers.onMessage ?? (() => {}),

            onEvent: handlers.onEvent ?? (() => {})
        });

        return () => {
            service.disconnect();
        };
    }, [
        currentUserId,
        handlers.onMessage,
        handlers.onEvent
    ]);

    return {
        connected,
        wsService: wsServiceRef
    };
};
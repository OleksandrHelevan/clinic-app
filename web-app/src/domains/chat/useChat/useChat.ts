import {useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useMessagesState} from "../hooks/useMessagesState/useMessagesState.ts";
import {useChatHistory} from "../useChatHistory/useChatHistory.ts";
import {useTypingIndicator} from "../hooks/useTypingIndicator/useTypingIndicator.ts";
import {useChatConnection} from "../hooks/useChatConnection/useChatConnection.ts";
import {INBOX_QUERY_KEY} from "../useInbox/useInbox.ts";
import type {ChatMessage, SendMessagePayload} from "../types.ts";

export const useChat = (
    currentUserId: string,
    recipientId?: string
) => {
    const queryClient = useQueryClient();
    const {data: history = []} = useChatHistory(currentUserId, recipientId);
    const {messages, addMessage} = useMessagesState(history);
    const {isTyping, handleTypingEvent} = useTypingIndicator(recipientId);

    const handleMessage = useCallback(
        (msg: ChatMessage) => {
            const isRelevant =
                (msg.senderId === recipientId && msg.recipientId === currentUserId) ||
                (msg.senderId === currentUserId && msg.recipientId === recipientId);

            if (isRelevant) {
                addMessage(msg);
            }

            queryClient.invalidateQueries({queryKey: [INBOX_QUERY_KEY, currentUserId]});
        },
        [recipientId, currentUserId, addMessage, queryClient]
    );

    const {connected, wsService} = useChatConnection(
        currentUserId, {onMessage: handleMessage, onEvent: handleTypingEvent}
    );

    const sendMessage = useCallback(
        (content: string) => {
            if (!content.trim() || !recipientId)
                return;

            const payload: SendMessagePayload = {
                senderId: currentUserId,
                recipientId,
                content
            };

            wsService.current?.sendMessage(payload);

            const optimisticMessage: ChatMessage = {
                id: `temp-${Date.now()}`,
                senderId: currentUserId,
                recipientId,
                content,
                timestamp: new Date().toISOString(),
                isLiked: false
            };
            addMessage(optimisticMessage);
            queryClient.invalidateQueries({queryKey: [INBOX_QUERY_KEY, currentUserId]}).then(() => {
            });
        },
        [currentUserId, recipientId, wsService, addMessage, queryClient]
    );

    const sendTypingEvent = useCallback(
        (type: "TYPING" | "STOPPED_TYPING") => {
            if (!recipientId)
                return;
            wsService.current?.sendEvent({type, recipientId});
        }, [recipientId, wsService]
    );

    return {
        messages,
        connected,
        isTyping,
        sendMessage,
        sendTypingEvent
    };
};
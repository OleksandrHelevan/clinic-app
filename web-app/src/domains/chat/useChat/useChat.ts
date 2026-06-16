import { useCallback, useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMessagesState } from "../hooks/useMessagesState/useMessagesState.ts";
import { useChatHistory } from "../useChatHistory/useChatHistory.ts";
import { useTypingIndicator } from "../hooks/useTypingIndicator/useTypingIndicator.ts";
import { useChatConnection } from "../hooks/useChatConnection/useChatConnection.ts";
import { INBOX_QUERY_KEY } from "../useInbox/useInbox.ts";
import { useLikeMessage } from "../hooks/useLikeMessage/useLikeMessage.ts";
import type { ChatMessage, SendMessagePayload, ChatEvent } from "../types.ts";

export const useChat = (
    currentUserId: string,
    recipientId?: string
) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(0);
    const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

    const { data: historyData, refetch } = useChatHistory(currentUserId, recipientId, page);

    const chatMessages = historyData?.messages;
    const loadedPagesRef = useRef<Set<number>>(new Set());

    const { messages, addMessage, updateMessageStructure, setMessages } = useMessagesState(
        page === 0 ? chatMessages ?? [] : []
    );

    useEffect(() => {
        setPage(0);
        setHasMoreMessages(true);
        loadedPagesRef.current.clear();
    }, [recipientId]);

    useEffect(() => {
        if (!chatMessages) return;

        if (page === 0) {
            setMessages(chatMessages);
            loadedPagesRef.current.add(0);
        } else if (!loadedPagesRef.current.has(page)) {
            if (chatMessages.length === 0) {
                setHasMoreMessages(false);
                return;
            }

            setMessages(prev => {
                const existingIds = new Set(prev.map(m => m.id));
                const uniqueNew = chatMessages.filter(m => !existingIds.has(m.id));
                return [...uniqueNew, ...prev];
            });

            loadedPagesRef.current.add(page);
        }
    }, [chatMessages, page, setMessages]);

    const loadMoreMessages = useCallback(async () => {
        if (isLoadingHistory || !hasMoreMessages || !recipientId) return;

        setIsLoadingHistory(true);
        const nextPage = page + 1;
        setPage(nextPage);

        try {
            await refetch();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingHistory(false);
        }
    }, [page, hasMoreMessages, isLoadingHistory, recipientId, refetch]);

    const { isTyping, handleTypingEvent } = useTypingIndicator(recipientId);

    const handleChatEvent = useCallback(
        (event: ChatEvent) => {
            if (event.type === "LIKE_UPDATE" && event.messageId) {
                updateMessageStructure(event.messageId, { liked: event.isLiked });
            } else {
                handleTypingEvent(event);
            }
        },
        [handleTypingEvent, updateMessageStructure]
    );

    const handleMessage = useCallback(
        (msg: ChatMessage) => {
            const isRelevant =
                (msg.senderId === recipientId && msg.recipientId === currentUserId) ||
                (msg.senderId === currentUserId && msg.recipientId === recipientId);

            if (isRelevant) {
                addMessage(msg);
            }

            queryClient.invalidateQueries({ queryKey: [INBOX_QUERY_KEY, currentUserId] });
        },
        [recipientId, currentUserId, addMessage, queryClient]
    );

    const { connected, wsService } = useChatConnection(
        currentUserId, { onMessage: handleMessage, onEvent: handleChatEvent }
    );

    const sendMessage = useCallback(
        (
            content: string,
            replyToMessageId?: string,
            replyPreview?: string,
            replySenderName?: string
        ) => {
            if (!content.trim() || !recipientId)
                return;

            const payload: SendMessagePayload & {
                replyToMessageId?: string;
                replyPreview?: string;
                replySenderName?: string;
            } = {
                senderId: currentUserId,
                recipientId,
                content,
                replyToMessageId,
                replyPreview,
                replySenderName
            };

            wsService.current?.sendMessage(payload);

            const optimisticMessage: ChatMessage = {
                id: `temp-${Date.now()}`,
                senderId: currentUserId,
                recipientId,
                content,
                timestamp: new Date().toISOString(),
                liked: false,
                replyToMessageId,
                replyPreview,
                replySenderName
            };

            addMessage(optimisticMessage);
            queryClient.invalidateQueries({ queryKey: [INBOX_QUERY_KEY, currentUserId] }).then(() => {});
        },
        [currentUserId, recipientId, wsService, addMessage, queryClient]
    );

    const sendTypingEvent = useCallback(
        (type: "TYPING" | "STOPPED_TYPING") => {
            if (!recipientId)
                return;
            wsService.current?.sendEvent({ type, recipientId });
        }, [recipientId, wsService]
    );

    const { toggleLikeMessage } = useLikeMessage({
        currentUserId,
        recipientId,
        wsServiceRef: wsService,
        onLocalUpdate: (messageId, fields) => {
            updateMessageStructure(messageId, {
                liked: fields.isLiked
            });
        }
    });

    return {
        messages,
        connected,
        isTyping,
        sendMessage,
        sendTypingEvent,
        toggleLikeMessage,
        loadMoreMessages,
        hasMoreMessages,
        isLoadingHistory,
        otherUser: {
            firstName: historyData?.otherUserFirstName,
            lastName: historyData?.otherUserLastName,
            avatar: historyData?.otherUserAvatar
        }
    };
};
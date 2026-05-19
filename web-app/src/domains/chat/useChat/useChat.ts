import {useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useMessagesState} from "../hooks/useMessagesState/useMessagesState.ts";
import {useChatHistory} from "../useChatHistory/useChatHistory.ts";
import {useTypingIndicator} from "../hooks/useTypingIndicator/useTypingIndicator.ts";
import {useChatConnection} from "../hooks/useChatConnection/useChatConnection.ts";
import {INBOX_QUERY_KEY} from "../useInbox/useInbox.ts";
import {useLikeMessage} from "../hooks/useLikeMessage/useLikeMessage.ts";
import type {ChatMessage, SendMessagePayload, ChatEvent} from "../types.ts";

export const useChat = (
    currentUserId: string,
    recipientId?: string
) => {
    const queryClient = useQueryClient();

    const {data: historyData} = useChatHistory(currentUserId, recipientId);

    const chatMessages = historyData?.messages ?? [];

    const {messages, addMessage, updateMessageStructure} = useMessagesState(chatMessages);

    const {isTyping, handleTypingEvent} = useTypingIndicator(recipientId);

    const handleChatEvent = useCallback(
        (event: ChatEvent) => {
            if (event.type === "LIKE_UPDATE" && event.messageId) {
                updateMessageStructure(event.messageId, {liked: event.isLiked});
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

            queryClient.invalidateQueries({queryKey: [INBOX_QUERY_KEY, currentUserId]});
        },
        [recipientId, currentUserId, addMessage, queryClient]
    );

    const {connected, wsService} = useChatConnection(
        currentUserId, {onMessage: handleMessage, onEvent: handleChatEvent}
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
        otherUser: {
            firstName: historyData?.otherUserFirstName,
            lastName: historyData?.otherUserLastName,
            avatar: historyData?.otherUserAvatar
        }
    };
};
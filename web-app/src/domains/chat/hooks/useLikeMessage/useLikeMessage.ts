import {type RefObject, useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import type {ChatEvent, GetHistoryResponse} from "../../types.ts";

interface WsService {
    sendEvent: (event: ChatEvent) => void;
}

interface UseLikeMessageProps {
    currentUserId: string;
    recipientId?: string;
    wsServiceRef: RefObject<WsService | null>;
    onLocalUpdate: (messageId: string, updatedFields: { isLiked: boolean }) => void;
}

export const useLikeMessage =
    ({currentUserId, recipientId, wsServiceRef, onLocalUpdate}: UseLikeMessageProps) => {
        const queryClient = useQueryClient();

        const toggleLikeMessage = useCallback(
            (messageId: string, currentLikedStatus: boolean) => {
                if (!recipientId) return;

                const newLikedStatus = !currentLikedStatus;
                const eventPayload: ChatEvent = {
                    type: "LIKE_UPDATE",
                    senderId: currentUserId,
                    recipientId: recipientId,
                    messageId: messageId,
                    isLiked: newLikedStatus
                };
                wsServiceRef.current?.sendEvent(eventPayload);
                onLocalUpdate(messageId, {isLiked: newLikedStatus});
                queryClient.setQueryData<GetHistoryResponse>(
                    ["chat-history", currentUserId, recipientId],
                    (oldData) => {
                        if (!oldData || !oldData.messages) return oldData;
                        return {
                            ...oldData,
                            messages: oldData.messages.map((msg) =>
                                msg.id === messageId ? {...msg, liked: newLikedStatus} : msg
                            )
                        };
                    }
                );
            },
            [currentUserId, recipientId, wsServiceRef, queryClient, onLocalUpdate]
        );

        return {toggleLikeMessage};
    };
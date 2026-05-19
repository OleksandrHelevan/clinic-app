import {useQuery} from "@tanstack/react-query";
import {chatService} from "../services/chatService.ts";
import type {GetHistoryResponse} from "../types.ts";

export const useChatHistory = (
    currentUserId: string,
    recipientId?: string
) => {
    return useQuery<GetHistoryResponse>({
        queryKey: [
            "chat-history",
            currentUserId,
            recipientId
        ],
        enabled: !!currentUserId && !!recipientId,
        queryFn: async () => {
            const data = await chatService.getHistory(
                currentUserId,
                recipientId!,
                0
            );
            return data ?? [];
        }
    });
};
import {useQuery} from "@tanstack/react-query";
import {chatService} from "../services/chatService.ts";
import type {GetHistoryResponse} from "../types.ts";

export const useChatHistory = (
    currentUserId: string,
    recipientId?: string,
    page: number = 0
) => {
    return useQuery<GetHistoryResponse>({
        queryKey: [
            "chat-history",
            currentUserId,
            recipientId,
            page
        ],
        enabled: !!currentUserId && !!recipientId,
        queryFn: async () => {
            return await chatService.getHistory(
                currentUserId,
                recipientId!,
                page
            );
        }
    });
};
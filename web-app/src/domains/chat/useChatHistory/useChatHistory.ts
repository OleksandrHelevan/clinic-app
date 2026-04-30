import {useQuery} from "@tanstack/react-query";
import {chatService} from "../services/chatService.ts";
import type {ChatMessage} from "../types.ts";

export const useChatHistory = (
    currentUserId: string,
    recipientId?: string
) => {
    return useQuery<ChatMessage[]>({
        queryKey: [
            "chat-history",
            currentUserId,
            recipientId
        ],
        enabled: !!currentUserId && !!recipientId,
        initialData: [],
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
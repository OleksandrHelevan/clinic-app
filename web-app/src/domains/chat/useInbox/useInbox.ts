import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useCallback} from "react";
import {chatService} from "../services/chatService.ts";
import {useChatConnection} from "../hooks/useChatConnection/useChatConnection.ts";
import type {GetInboxResponse} from "../types.ts";

export const INBOX_QUERY_KEY = 'inbox';

export const useInbox = (currentUserId: string) => {
    const queryClient = useQueryClient();

    const query = useQuery<GetInboxResponse>({
        queryKey: [INBOX_QUERY_KEY, currentUserId],
        enabled: !!currentUserId,
        queryFn: async () => {
            const data = await chatService.getInbox(currentUserId);
            return data ?? [];
        },
    });

    const handleMessage = useCallback(() => {
        queryClient.invalidateQueries({queryKey: [INBOX_QUERY_KEY, currentUserId]});
    }, [currentUserId, queryClient]);

    useChatConnection(currentUserId, {
        onMessage: handleMessage
    });

    return query;
};
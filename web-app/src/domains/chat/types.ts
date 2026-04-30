export interface ChatMessage {
    id: string;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
    status?: string;
    isLiked?: boolean;
}

export interface SendMessagePayload {
    senderId: string;
    recipientId: string;
    content: string;
}

export interface ChatEvent {
    type: "TYPING" | "STOPPED_TYPING" | "LIKE_UPDATE" | "STATUS_UPDATE";
    senderId: string;
    recipientId: string;
    messageId?: string;
    isLiked?: boolean;
    status?: string;
}

export interface ChatCallbacks {
    onConnect: () => void;
    onDisconnect: () => void;
    onMessage: (msg: ChatMessage) => void;
    onEvent: (event: ChatEvent) => void;
}

export type GetHistoryResponse = ChatMessage[];
export interface ChatMessage {
    id: string;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
    status?: string;
    liked?: boolean;
    replyToMessageId?: string;
    replyPreview?: string;
    replySenderName?: string;
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

export interface GetHistoryResponse {
    otherUserFirstName: string;
    otherUserLastName: string;
    otherUserId: string;
    otherUserAvatar: string | null;
    currentUserId: string;
    messages?: ChatMessage[];
}

export interface InboxResponse {
    chatId: string;
    lastMessage: string;
    lastMessageLiked: boolean;
    lastMessageStatus?: string;
    lastMessageTime: string;
    otherUserAvatar: string;
    otherUserFirstName: string;
    otherUserLastName: string;
    otherUserId: string;
    unreadCount: number;
}

export type GetInboxResponse = InboxResponse[];
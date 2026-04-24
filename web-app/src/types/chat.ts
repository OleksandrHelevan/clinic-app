export type ChatEventType = "TYPING" | "STOPPED_TYPING" | "STATUS_UPDATE" | "ERROR";
export type MessageStatus = "RECEIVED" | "DELIVERED" | "READ";

export interface ChatMessage {
    id?: string;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
    status?: MessageStatus;
}

export interface ChatEvent {
    type: ChatEventType;
    senderId: string;
    recipientId: string;
    messageId?: string;
    status?: MessageStatus;
    timestamp?: string;
}
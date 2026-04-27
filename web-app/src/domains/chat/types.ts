export interface ChatMessage {
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
}

export interface ChatEvent {
    type: "TYPING" | "STOPPED_TYPING";
    senderId: string;
    recipientId: string;
}

export interface ChatCallbacks {
    onConnect: () => void;
    onDisconnect: () => void;
    onMessage: (msg: ChatMessage) => void;
    onEvent: (event: ChatEvent) => void;
}
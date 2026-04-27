import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ChatMessage, ChatEvent, ChatCallbacks } from '../types.ts';

export class chatService {
    private client: Client | null = null;
    private currentUserId: string | null = null;
    private readonly WS_URL = 'http://localhost:8085/ws';

    public connect(userId: string, callbacks: ChatCallbacks): void {
        if (this.client?.connected) return;

        this.currentUserId = userId;

        this.client = new Client({
            webSocketFactory: () => new SockJS(this.WS_URL),
            reconnectDelay: 5000,
            onConnect: () => {
                callbacks.onConnect();

                this.client?.subscribe(`/user/${this.currentUserId}/queue/messages`, (payload) => {
                    const message: ChatMessage = JSON.parse(payload.body);
                    callbacks.onMessage(message);
                });

                this.client?.subscribe(`/user/${this.currentUserId}/queue/events`, (payload) => {
                    const event: ChatEvent = JSON.parse(payload.body);
                    callbacks.onEvent(event);
                });
            },
            onDisconnect: () => {
                callbacks.onDisconnect();
            },
            onStompError: (frame) => {
                console.error('STOMP Error:', frame.headers['message']);
            }
        });

        this.client.activate();
    }

    public disconnect(): void {
        if (this.client?.active) {
            this.client.deactivate();
        }
        this.client = null;
        this.currentUserId = null;
    }

    public get isConnected(): boolean {
        return !!this.client?.connected;
    }

    public sendMessage(message: ChatMessage): void {
        if (!this.isConnected) {
            console.warn("Cannot send message: WebSocket is not connected.");
            return;
        }

        this.client!.publish({
            destination: '/app/chat',
            body: JSON.stringify(message),
        });
    }

    public sendEvent(type: "TYPING" | "STOPPED_TYPING", recipientId: string): void {
        if (!this.isConnected || !this.currentUserId) return;

        const event: ChatEvent = {
            type,
            senderId: this.currentUserId,
            recipientId
        };

        this.client!.publish({
            destination: '/app/chat.sendEvent',
            body: JSON.stringify(event),
        });
    }
}
export interface AiMessage {
    role: 'user' | 'assistant';
    message: string;
    timestamp: string;
    recommendedDoctor?: {
        id: string;
        firstName: string;
        lastName: string;
        specialization: string;
        photoUrl?: string;
        rating?: number;
        experience?: number;
    };
}
import type { ChatMessage } from "../../../domains/chat/types";

interface ChatReplyBtnProps {
    message: ChatMessage;
    onReplyMessage: (message: ChatMessage) => void;
}

export const ChatReplyBtn = ({ message, onReplyMessage }: ChatReplyBtnProps) => {
    return (
        <button
            className="chat-reply-btn"
            onClick={() => onReplyMessage(message)}
            aria-label="Reply to message"
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 17 4 12 9 7"></polyline>
                <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
            </svg>
        </button>
    );
};
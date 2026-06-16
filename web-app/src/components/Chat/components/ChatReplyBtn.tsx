import type { ChatMessage } from '../../../domains/chat/types';
import { ActionBtn } from '../Chat.styles';

interface ChatReplyBtnProps {
  message: ChatMessage;
  onReplyMessage: (message: ChatMessage) => void;
}

export const ChatReplyBtn = ({ message, onReplyMessage }: ChatReplyBtnProps) => (
  <ActionBtn data-action-btn onClick={() => onReplyMessage(message)} aria-label="Reply to message">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  </ActionBtn>
);

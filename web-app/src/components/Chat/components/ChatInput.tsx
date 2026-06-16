import { type ChangeEvent, useState } from 'react';
import type { ChatMessage } from '../../../domains/chat/types';
import {
  ChatFooter,
  ChatFooterWrapper,
  ChatInput as StyledInput,
  ChatReplyBar,
  ChatReplyBarClose,
  ChatReplyBarContent,
  ChatReplyBarText,
  ChatReplyBarTitle,
  ChatSendBtn,
} from '../Chat.styles';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTyping: (type: 'TYPING' | 'STOPPED_TYPING') => void;
  placeholder: string;
  replyingTo: ChatMessage | null;
  onCancelReply: () => void;
}

export const ChatInput = ({
  onSendMessage,
  onTyping,
  placeholder,
  replyingTo,
  onCancelReply,
}: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSendMessage(value);
    setValue('');
    onTyping('STOPPED_TYPING');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    onTyping(text ? 'TYPING' : 'STOPPED_TYPING');
  };

  return (
    <ChatFooterWrapper>
      {replyingTo && (
        <ChatReplyBar>
          <ChatReplyBarContent>
            <ChatReplyBarTitle>Reply to message</ChatReplyBarTitle>
            <ChatReplyBarText>{replyingTo.content}</ChatReplyBarText>
          </ChatReplyBarContent>
          <ChatReplyBarClose type="button" onClick={onCancelReply} aria-label="Скасувати відповідь">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </ChatReplyBarClose>
        </ChatReplyBar>
      )}

      <ChatFooter>
        <StyledInput
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={() => onTyping('STOPPED_TYPING')}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={placeholder}
        />
        <ChatSendBtn onClick={handleSend} disabled={!value.trim()}>
          Send
        </ChatSendBtn>
      </ChatFooter>
    </ChatFooterWrapper>
  );
};

import { useInbox } from '../../../domains/chat/useInbox/useInbox';
import type { ChatUser } from '../components/ChatHeader';
import { Loader } from '../../Loader/Loader';
import {
  ChatCloseBtn, ChatHeader, ChatHeaderInfo, ChatHeaderTitle,
  ChatInboxItem, ChatMessages, InboxItemContent,
  InboxItemHeader, InboxStatus,
} from '../Chat.styles';

interface ChatInboxViewProps {
  currentUserId: string;
  onSelectChat: (user: ChatUser) => void;
  onSelectAi: () => void;
  onClose: () => void;
}

const GeminiLogoSmall = () => (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="gem2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#8AB4F8" />
        </linearGradient>
      </defs>
      <path d="M14 2C14 2 14 13 2 14C14 14 14 26 14 26C14 26 14 14 26 14C14 14 14 2 14 2Z" fill="url(#gem2)" />
    </svg>
);

export const ChatInboxView = ({ currentUserId, onSelectChat, onSelectAi, onClose }: ChatInboxViewProps) => {
  const { data: messages = [], isLoading, isError } = useInbox(currentUserId);

  return (
      <>
        <ChatHeader>
          <ChatHeaderInfo>
            <ChatHeaderTitle>Chats</ChatHeaderTitle>
          </ChatHeaderInfo>
          <ChatCloseBtn onClick={onClose} aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </ChatCloseBtn>
        </ChatHeader>

        <ChatMessages compact>
          {/* AI Асистент завжди зверху */}
          <ChatInboxItem onClick={onSelectAi} style={{ borderLeft: '3px solid #4285F4' }}>
            <InboxItemHeader style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <GeminiLogoSmall />
              <strong>AI Асистент</strong>
            </InboxItemHeader>
            <InboxItemContent>Запитати про симптоми</InboxItemContent>
          </ChatInboxItem>

          {isLoading && <Loader />}
          {isError && <InboxStatus error>Error</InboxStatus>}
          {!isLoading && !isError && messages.length === 0 && (
              <InboxStatus>No active messages</InboxStatus>
          )}
          {!isLoading && messages.map((msg) => (
              <ChatInboxItem key={msg.chatId} onClick={() => onSelectChat({
                id: msg.otherUserId,
                firstName: msg.otherUserFirstName,
                lastName: msg.otherUserLastName,
              })}>
                <InboxItemHeader>
                  <strong>{`${msg.otherUserFirstName} ${msg.otherUserLastName}`}</strong>
                </InboxItemHeader>
                <InboxItemContent>{msg.lastMessage}</InboxItemContent>
              </ChatInboxItem>
          ))}
        </ChatMessages>
      </>
  );
};
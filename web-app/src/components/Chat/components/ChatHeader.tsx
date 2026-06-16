import { ChatCloseBtn, ChatHeaderInfo, ChatHeaderTitle, ChatHeader as Header } from '../Chat.styles';

export interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface ChatHeaderProps {
  user: ChatUser;
  connected: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const BackBtn = ChatCloseBtn.withComponent('button');

export const ChatHeader = ({ user, onClose, onBack }: ChatHeaderProps) => (
  <Header>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {onBack && (
        <BackBtn onClick={onBack} aria-label="Back to inbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </BackBtn>
      )}
      <ChatHeaderInfo>
        <ChatHeaderTitle>
          {user.firstName} {user.lastName}
        </ChatHeaderTitle>
      </ChatHeaderInfo>
    </div>

    <ChatCloseBtn onClick={onClose} aria-label="Close chat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </ChatCloseBtn>
  </Header>
);

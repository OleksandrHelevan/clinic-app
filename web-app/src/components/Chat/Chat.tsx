import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatUser } from './components/ChatHeader';
import { ChatInboxView } from './view/ChatInboxView';
import { ChatActiveView } from './view/ChatActiveView';
import { AiChatView } from './view/AiChatView';
import { ChatContainer, ChatOverlay } from './Chat.styles';

type ChatView = 'inbox' | 'active' | 'ai';

interface ChatProps {
  user?: ChatUser;
  onClose: () => void;
  currentUserId: string;
}

export const Chat = ({ user, onClose, currentUserId }: ChatProps) => {
  const navigate = useNavigate();
  const [view, setView] = useState<ChatView>(user ? 'active' : 'inbox');
  const [selectedUser, setSelectedUser] = useState<ChatUser | undefined>(user);

  const handleSelectFromInbox = (chatUser: ChatUser) => {
    setSelectedUser(chatUser);
    setView('active');
  };

  const handleBack = () => {
    setSelectedUser(undefined);
    setView('inbox');
  };

  const handleBookDoctor = (doctorId: string) => {
    onClose();
    navigate(`/doctors/${doctorId}`);
  };

  return (
      <ChatOverlay>
        <ChatContainer>
          {view === 'inbox' && (
              <ChatInboxView
                  currentUserId={currentUserId}
                  onSelectChat={handleSelectFromInbox}
                  onSelectAi={() => setView('ai')}
                  onClose={onClose}
              />
          )}
          {view === 'active' && selectedUser && (
              <ChatActiveView
                  user={selectedUser}
                  currentUserId={currentUserId}
                  onClose={onClose}
                  onBack={handleBack}
              />
          )}
          {view === 'ai' && (
              <AiChatView
                  currentUserId={currentUserId}
                  onClose={onClose}
                  onBack={handleBack}
                  onBookDoctor={handleBookDoctor}
              />
          )}
        </ChatContainer>
      </ChatOverlay>
  );
};
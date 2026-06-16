import type { ChatMessage } from '../../../domains/chat/types';
import type { ChatUser } from './ChatHeader';
import { ChatReplyBtn } from './ChatReplyBtn';
import { ChatLikeBtn } from './ChatLikeBtn';
import {
  BubbleWrapper,
  ChatBubble,
  MessageActions,
  MessageContent,
  ReplyPreview,
  ReplySender,
  ReplyText,
} from '../Chat.styles';

interface ChatMessageItemProps {
  msg: ChatMessage;
  allMessages: ChatMessage[];
  currentUserId: string;
  otherUser: ChatUser;
  onLikeMessage: (messageId: string, currentLikedStatus: boolean) => void;
  onReplyMessage: (message: ChatMessage) => void;
}

export const ChatMessageItem = ({
  msg,
  allMessages,
  currentUserId,
  otherUser,
  onLikeMessage,
  onReplyMessage,
}: ChatMessageItemProps) => {
  const isSentByMe = msg.senderId === currentUserId;
  const isActuallyLiked = msg.liked === true;

  const getReplySenderName = () => {
    const originalMessage = allMessages.find((m) => m.id === msg.replyToMessageId);
    if (originalMessage) {
      return originalMessage.senderId === currentUserId
        ? 'You'
        : `${otherUser.firstName} ${otherUser.lastName}`;
    }
    return 'User';
  };

  return (
    <BubbleWrapper sent={isSentByMe}>
      <ChatBubble sent={isSentByMe}>
        {msg.replyToMessageId && (
          <ReplyPreview sent={isSentByMe}>
            <ReplySender>{getReplySenderName()}</ReplySender>
            <ReplyText>{msg.replyPreview}</ReplyText>
          </ReplyPreview>
        )}

        <MessageContent>{msg.content}</MessageContent>

        <MessageActions sent={isSentByMe}>
          <ChatReplyBtn message={msg} onReplyMessage={onReplyMessage} />
          <ChatLikeBtn messageId={msg.id} isLiked={isActuallyLiked} onLikeMessage={onLikeMessage} />
        </MessageActions>
      </ChatBubble>
    </BubbleWrapper>
  );
};

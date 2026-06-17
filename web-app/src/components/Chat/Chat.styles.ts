import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '../../styles/theme';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUpFast = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const slideIn = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const ChatOverlay = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ChatContainer = styled.div`
  width: 360px;
  height: 520px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(20px);
  box-shadow: 0 16px 48px rgba(31, 38, 135, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${theme.glass.border};
`;

export const ChatHeader = styled.header`
  padding: 16px 20px;
  background: ${theme.gradients.primary};
  color: ${theme.colors.textInverse};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChatHeaderTitle = styled.span`
  font-size: 1.05rem;
  font-weight: 600;
`;

export const ChatCloseBtn = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textInverse};
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ChatLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  z-index: 100;
`;

export const ChatMessages = styled.div<{ compact?: boolean }>`
  flex: 1;
  padding: ${({ compact }) => (compact ? '0' : '20px 20px 0')};
  overflow-y: auto;
  display: ${({ compact }) => (compact ? 'block' : 'flex')};
  flex-direction: column;
  gap: ${({ compact }) => (compact ? '0' : '12px')};
  background: transparent;
`;

export const BubbleWrapper = styled.div<{ sent?: boolean }>`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: ${({ sent }) => (sent ? 'flex-end' : 'flex-start')};

  &:hover [data-action-btn] {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ChatBubble = styled.div<{ sent?: boolean }>`
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 75%;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
  background: ${({ sent }) => (sent ? theme.gradients.primary : theme.glass.bgStrong)};
  color: ${({ sent }) => (sent ? theme.colors.textInverse : theme.colors.textGray)};
  border: ${({ sent }) => (sent ? 'none' : `1px solid ${theme.glass.border}`)};
  border-bottom-right-radius: ${({ sent }) => (sent ? '4px' : '18px')};
  border-bottom-left-radius: ${({ sent }) => (sent ? '18px' : '4px')};
`;

export const MessageActions = styled.div<{ sent?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
  ${({ sent }) => (sent ? 'left: -68px; flex-direction: row;' : 'right: -68px; flex-direction: row-reverse;')}
`;

export const ActionBtn = styled.button<{ liked?: boolean }>`
  background: ${theme.glass.bgStrong} !important;
  border: 1px solid ${theme.glass.border} !important;
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer;
  color: ${({ liked }) => (liked ? '#ef5350' : '#8e8e93')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  padding: 0 !important;
  margin: 0 !important;
  outline: none;
  opacity: ${({ liked }) => (liked ? 1 : 0)};
  pointer-events: ${({ liked }) => (liked ? 'auto' : 'none')};
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover {
    transform: scale(1.1);
    color: ${theme.colors.textGray};
  }

  svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

export const ReplyPreview = styled.div<{ sent?: boolean }>`
  background: ${({ sent }) => (sent ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.06)')};
  border-left: 3px solid ${({ sent }) => (sent ? '#ffffff' : '#007bff')};
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  max-width: 100%;
  margin-bottom: 2px;
  color: ${({ sent }) => (sent ? 'rgba(255, 255, 255, 0.9)' : 'inherit')};
`;

export const ReplySender = styled.small`
  font-weight: 700;
  display: block;
  margin-bottom: 1px;
`;

export const ReplyText = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MessageContent = styled.div`
  font-size: 0.95rem;
`;

export const ChatFooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.glass.bgStrong};
  border-top: 1px solid ${theme.glass.border};
`;

export const ChatReplyBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f5f9;
  border-left: 4px solid #007bff;
  padding: 8px 16px;
  border-bottom: 1px solid ${theme.glass.border};
  animation: ${slideUpFast} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ChatReplyBarContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatReplyBarTitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #007bff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
`;

export const ChatReplyBarText = styled.p`
  margin: 2px 0 0;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatReplyBarClose = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  &:hover {
    color: #333;
  }
`;

export const ChatFooter = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid ${theme.glass.border};
  background: rgba(255, 255, 255, 0.7);
  color: ${theme.colors.textGray};
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: ${theme.colors.medBlue};
    background: rgba(255, 255, 255, 0.95);
  }
`;

export const ChatSendBtn = styled.button`
  background: ${theme.gradients.primary};
  color: ${theme.colors.textInverse};
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TypingWrapper = styled.div`
  animation: ${slideIn} 0.3s ease-out;
`;

export const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f0f0;
  color: #666;
  font-style: italic;
  padding: 8px 12px;
  border-radius: 15px 15px 15px 5px;
  width: fit-content;
`;

export const TypingDots = styled.span`
  span {
    animation: ${blink} 1.4s infinite both;
    font-weight: bold;
  }
  span:nth-of-type(2) { animation-delay: 0.2s; }
  span:nth-of-type(3) { animation-delay: 0.4s; }
`;

export const InboxStatus = styled.div<{ error?: boolean }>`
  padding: 24px 16px;
  text-align: center;
  color: ${({ error }) => (error ? theme.colors.danger : theme.colors.textMuted)};
  font-size: 14px;
`;

export const ChatInboxItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const InboxItemHeader = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  color: ${theme.colors.textDark};
`;

export const InboxItemContent = styled.div`
  font-size: 13px;
  color: ${theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const AiChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AiChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.05);
`;

export const AiChatHeaderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AiChatHeaderTitle = styled.span`
  font-weight: 700;
  font-size: 15px;
`;

export const AiChatHeaderSubtitle = styled.span`
  font-size: 11px;
  color: #4285F4;
  opacity: 0.9;
`;

export const AiChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AiChatBubble = styled.div<{ isUser: boolean }>`
  max-width: ${({ isUser }) => (isUser ? '80%' : '100%')};
  width: ${({ isUser }) => (isUser ? 'fit-content' : '100%')};
  box-sizing: border-box;
  margin-left: ${({ isUser }) => (isUser ? 'auto' : '0')};
  padding: 10px 14px;
  border-radius: ${({ isUser }) => isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  background: ${({ isUser }) => isUser
      ? 'linear-gradient(135deg, #4285F4, #8AB4F8)'
      : 'rgba(255,255,255,0.12)'};
  color: ${({ isUser }) => isUser ? 'white' : 'inherit'};
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'stretch'};
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const AiChatWelcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  text-align: center;
  opacity: 0.7;
  font-size: 14px;
  p { margin: 0; }
`;

export const AiChatTyping = styled.div`
  display: flex;
  gap: 4px;
  align-self: flex-start;
  padding: 12px 16px;
  background: rgba(255,255,255,0.12);
  border-radius: 18px 18px 18px 4px;

  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4285F4;
    animation: typing 1.2s infinite;
    &:nth-of-type(2) { animation-delay: 0.2s; }
    &:nth-of-type(3) { animation-delay: 0.4s; }
  }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-6px); opacity: 1; }
  }
`;

export const AiChatInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

export const AiChatInput = styled.textarea`
  flex: 1;
  resize: none;
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  background: rgba(255,255,255,0.08);
  color: inherit;
  outline: none;
  max-height: 100px;
  line-height: 1.4;

  &:focus { border-color: #4285F4; }
  &::placeholder { opacity: 0.5; }
`;

export const AiChatSendBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4285F4, #8AB4F8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
  flex-shrink: 0;

  &:disabled { opacity: 0.4; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.85; }
`;

export const AiChatClearBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.5;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
`;
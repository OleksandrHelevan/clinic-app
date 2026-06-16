import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.textGray};
    margin-left: 2px;
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const Input = styled.input<{ hasError?: boolean }>`
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    border: 1.5px solid ${({ hasError }) => (hasError ? theme.colors.danger : 'rgba(255, 255, 255, 0.9)')};
    border-radius: 12px;
    background: ${({ hasError }) => (hasError ? theme.colors.dangerBg : 'rgba(255, 255, 255, 0.7)')};
    color: ${theme.colors.textDark};
    transition: all 0.3s ease;
    box-sizing: border-box;
    font-family: inherit;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.95);
        border-color: ${theme.colors.medBlue};
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }
`;

export const TogglePasswordButton = styled.button`
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: #94a3b8;
    transition: color 0.2s ease;

    &:hover {
        color: ${theme.colors.textGray};
    }
`;

export const ErrorText = styled.span`
    font-size: 12px;
    color: ${theme.colors.danger};
    font-weight: 500;
    margin-left: 2px;
`;
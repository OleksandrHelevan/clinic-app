import styled from "@emotion/styled";

export const DoctorCardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 4px 12px 4px 12px;
`;

export const Card = styled.div`
    background: #ffffff;
    border: 1px solid #e3ecfd;
    border-radius: 16px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 240px;
    box-shadow: 0 2px 12px rgba(66, 133, 244, 0.08);
`;

export const CardLabel = styled.div`
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #4285F4;
    opacity: 0.8;
`;

export const DoctorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const AvatarPlaceholder = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
`;

export const AvatarImg = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
`;

export const DoctorDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
`;

export const DoctorName = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #1a1a2e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpecBadge = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: #4285F4;
    background: #e8f0fe;
    border-radius: 6px;
    padding: 2px 7px;
    width: fit-content;
`;

export const MetaRow = styled.div`
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: #888;
`;

export const BookBtn = styled.button`
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 9px 0;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.15s;

    &:hover {
        opacity: 0.88;
    }

    &:active {
        opacity: 0.75;
    }
`;

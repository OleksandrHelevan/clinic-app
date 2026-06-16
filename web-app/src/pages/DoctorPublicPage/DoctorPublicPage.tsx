import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type {UserResponse} from "../../domains/doctors/types.ts";
import { doctorService } from "../../domains/doctors/services/doctorService.ts";

// ── Spec labels ───────────────────────────────────────────────────────────────

const SPEC_LABELS: Record<string, string> = {
    CARDIOLOGIST: 'Cardiologist',
    NEUROLOGIST: 'Neurologist',
    DERMATOLOGIST: 'Dermatologist',
    ORTHOPEDIST: 'Orthopedist',
    THERAPIST: 'Therapist',
    OPHTHALMOLOGIST: 'Ophthalmologist',
    ENT: 'ENT Specialist',
    GASTROENTEROLOGIST: 'Gastroenterologist',
    ENDOCRINOLOGIST: 'Endocrinologist',
    SURGEON: 'Surgeon',
    PEDIATRICIAN: 'Pediatrician',
};

// ── Styles ────────────────────────────────────────────────────────────────────

const Page = styled.div`
    min-height: 100vh;
    background: #f4f7fe;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px 48px;
`;

const BackBtn = styled.button`
    align-self: flex-start;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #4285F4;
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    margin-bottom: 20px;

    &:hover { opacity: 0.75; }
`;

const Card = styled.div`
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(66, 133, 244, 0.10);
    border: 1px solid #e3ecfd;
    width: 100%;
    max-width: 480px;
    overflow: hidden;
`;

const HeroSection = styled.div`
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    padding: 36px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const Avatar = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255,255,255,0.6);
`;

const AvatarPlaceholder = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    border: 3px solid rgba(255,255,255,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 36px;
    font-weight: 700;
`;

const DoctorName = styled.h1`
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    text-align: center;
`;

const SpecBadge = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: #4285F4;
    background: #fff;
    border-radius: 20px;
    padding: 4px 14px;
`;

const Body = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Divider = styled.div`
    height: 1px;
    background: #e8f0fe;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
`;

const InfoItem = styled.div`
    background: #f4f7fe;
    border-radius: 12px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const InfoLabel = styled.span`
    font-size: 11px;
    color: #888;
    font-weight: 500;
`;

const InfoValue = styled.span`
    font-size: 14px;
    color: #1a1a2e;
    font-weight: 600;
`;

const BookBtn = styled.button`
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 14px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.15s;

    &:hover { opacity: 0.88; }
    &:active { opacity: 0.75; }
`;

const ErrorText = styled.p`
    text-align: center;
    color: #e53935;
    font-size: 14px;
`;

const SkeletonBox = styled.div<{ w?: string; h?: string; radius?: string }>`
    background: linear-gradient(90deg, #e8f0fe 25%, #d0e1fd 50%, #e8f0fe 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: ${p => p.radius ?? '8px'};
    width: ${p => p.w ?? '100%'};
    height: ${p => p.h ?? '16px'};

    @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;

const SkeletonHero = styled.div`
    background: linear-gradient(135deg, #4285F4 0%, #8AB4F8 100%);
    padding: 36px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const Skeleton = () => (
    <Card>
        <SkeletonHero>
            <SkeletonBox w="96px" h="96px" radius="50%" />
            <SkeletonBox w="180px" h="22px" />
            <SkeletonBox w="120px" h="28px" radius="20px" />
        </SkeletonHero>
        <Body>
            <InfoGrid>
                <SkeletonBox h="52px" radius="12px" />
                <SkeletonBox h="52px" radius="12px" />
            </InfoGrid>
            <Divider />
            <SkeletonBox h="14px" />
            <SkeletonBox h="14px" w="80%" />
            <SkeletonBox h="48px" radius="14px" />
        </Body>
    </Card>
);

// ── Component ─────────────────────────────────────────────────────────────────

export const DoctorPublicPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        doctorService.getDoctorById(id)
            .then(setDoctor)
            .catch(() => setError('Failed to load doctor profile.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBook = () => navigate(`/appointments/new?doctorId=${id}`);

    const firstName = doctor?.firstName ?? '';
    const lastName = doctor?.lastName ?? '';
    const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
    const specLabel = doctor?.specialization
        ? (SPEC_LABELS[doctor.specialization] ?? doctor.specialization)
        : '';

    return (
        <Page>
            <BackBtn onClick={() => navigate(-1)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
            </BackBtn>

            {loading && <Skeleton />}

            {error && (
                <Card>
                    <Body><ErrorText>{error}</ErrorText></Body>
                </Card>
            )}

            {!loading && !error && doctor && (
                <Card>
                    <HeroSection>
                        {doctor.avatarUrl ? (
                            <Avatar src={doctor.avatarUrl} alt={`${firstName} ${lastName}`} />
                        ) : (
                            <AvatarPlaceholder>{initials || '?'}</AvatarPlaceholder>
                        )}

                        <DoctorName>Dr. {firstName} {lastName}</DoctorName>

                        {specLabel && <SpecBadge>{specLabel}</SpecBadge>}

                    </HeroSection>

                    <Body>
                        <InfoGrid>
                            {doctor.email && (
                                <InfoItem>
                                    <InfoLabel>Email</InfoLabel>
                                    <InfoValue>{doctor.email}</InfoValue>
                                </InfoItem>
                            )}
                            {doctor.phone && (
                                <InfoItem>
                                    <InfoLabel>Phone</InfoLabel>
                                    <InfoValue>{doctor.phone}</InfoValue>
                                </InfoItem>
                            )}
                        </InfoGrid>


                        <Divider />

                        <BookBtn onClick={handleBook}>
                            Book Appointment
                        </BookBtn>
                    </Body>
                </Card>
            )}
        </Page>
    );
};
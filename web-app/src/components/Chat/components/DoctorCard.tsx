import styled from 'styled-components';

interface DoctorCardProps {
    doctor: {
        id: string;
        firstName: string;
        lastName: string;
        specialization: string;
        photoUrl?: string;
        rating?: number;
        experience?: number;
    };
    onBook: (doctorId: string) => void;
}

const Card = styled.div`
    background: white;
    border-radius: 16px;
    padding: 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8f0fe;
    max-width: 280px;
`;

const DoctorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Avatar = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    background: #e8f0fe;
`;

const AvatarPlaceholder = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4285F4, #8AB4F8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
    flex-shrink: 0;
`;

const DoctorDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const DoctorName = styled.span`
    font-weight: 600;
    font-size: 15px;
    color: #1a1a2e;
`;

const DoctorSpec = styled.span`
    font-size: 12px;
    color: #4285F4;
    background: #e8f0fe;
    border-radius: 6px;
    padding: 2px 8px;
    width: fit-content;
`;

const DoctorMeta = styled.div`
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #666;
`;

const BookBtn = styled.button`
    background: linear-gradient(135deg, #4285F4, #8AB4F8);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const SPECIALIZATION_LABELS: Record<string, string> = {
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
};

export const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
    const initials = `${doctor.firstName[0]}${doctor.lastName[0]}`;
    const specLabel = SPECIALIZATION_LABELS[doctor.specialization] ?? doctor.specialization;

    return (
        <Card>
            <DoctorInfo>
                {doctor.photoUrl ? (
                    <Avatar src={doctor.photoUrl} alt={`${doctor.firstName} ${doctor.lastName}`} />
                ) : (
                    <AvatarPlaceholder>{initials}</AvatarPlaceholder>
                )}
                <DoctorDetails>
                    <DoctorName>{doctor.firstName} {doctor.lastName}</DoctorName>
                    <DoctorSpec>{specLabel}</DoctorSpec>
                </DoctorDetails>
            </DoctorInfo>

            {(doctor.rating || doctor.experience) && (
                <DoctorMeta>
                    {doctor.rating && <span>⭐ {doctor.rating.toFixed(1)}</span>}
                    {doctor.experience && <span>🩺 {doctor.experience} yrs exp.</span>}
                </DoctorMeta>
            )}

            <BookBtn onClick={() => onBook(doctor.id)}>
                Book Appointment
            </BookBtn>
        </Card>
    );
};
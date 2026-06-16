import { useState } from 'react';
import type { UserResponse } from '../../../domains/doctors/types';
import { DefaultAvatar } from '../../../assets/DefaultAvatar';
import {
  DoctorAvatar,
  DoctorAvatarPlaceholder,
  DoctorCardRoot,
  DoctorContacts,
  DoctorInfo,
  DoctorName,
  DoctorSpecialty,
  WriteButton,
} from './DoctorCard.styles';

interface DoctorCardProps {
  doctor: UserResponse;
  onWriteMessage: (doctor: UserResponse) => void;
}

export const DoctorCard = ({ doctor, onWriteMessage }: DoctorCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <DoctorCardRoot>
      {doctor.avatarUrl && !imageError ? (
        <DoctorAvatar
          src={doctor.avatarUrl}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <DoctorAvatarPlaceholder>
          <DefaultAvatar />
        </DoctorAvatarPlaceholder>
      )}

      <DoctorInfo>
        <DoctorName>
          {doctor.firstName} {doctor.lastName}
        </DoctorName>
        <DoctorSpecialty>{doctor.specialization}</DoctorSpecialty>
        <DoctorContacts>
          <p>{doctor.email}</p>
          <p>{doctor.phone}</p>
        </DoctorContacts>
        <WriteButton type="button" onClick={() => onWriteMessage(doctor)}>
          Message
        </WriteButton>
      </DoctorInfo>
    </DoctorCardRoot>
  );
};

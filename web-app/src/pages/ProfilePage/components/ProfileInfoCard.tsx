import { useState } from 'react';
import {
  Badge,
  InfoItem,
  InfoLabel,
  InfoValue,
  ProfileAvatarFallback,
  ProfileAvatarImg,
  ProfileCard,
  ProfileHeader,
  ProfileInfoGrid,
  ProfileTitles,
  SpecializationText,
} from './ProfileInfoCard.styles';

interface ProfileInfoCardProps {
  user: {
    role: string;
    profile: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      avatarUrl?: string;
      specialization?: string;
    };
  };
}

export const ProfileInfoCard = ({ user }: ProfileInfoCardProps) => {
  const { profile, role } = user;
  const [imageError, setImageError] = useState(false);

  const getRoleLabel = (r?: string) => {
    switch (r) {
      case 'PATIENT':
        return 'Patient';
      case 'DOCTOR':
        return 'Doctor';
      case 'ADMIN':
        return 'Admin';
      default:
        return r || 'Unknown';
    }
  };

  return (
    <ProfileCard>
      <ProfileHeader>
        {profile.avatarUrl && !imageError ? (
          <ProfileAvatarImg
            src={profile.avatarUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <ProfileAvatarFallback>
            {profile.firstName
              ? profile.firstName.charAt(0).toUpperCase()
              : profile.email.charAt(0).toUpperCase()}
          </ProfileAvatarFallback>
        )}

        <ProfileTitles>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <Badge>{getRoleLabel(role)}</Badge>
          {role === 'DOCTOR' && profile.specialization && (
            <SpecializationText>{profile.specialization}</SpecializationText>
          )}
        </ProfileTitles>
      </ProfileHeader>

      <ProfileInfoGrid>
        <InfoItem>
          <InfoLabel>Email</InfoLabel>
          <InfoValue>{profile.email}</InfoValue>
        </InfoItem>
        {profile.phone && (
          <InfoItem>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>{profile.phone}</InfoValue>
          </InfoItem>
        )}
      </ProfileInfoGrid>
    </ProfileCard>
  );
};

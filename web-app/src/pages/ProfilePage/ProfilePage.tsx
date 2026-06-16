import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from '../../domains/users/useMe/useMe';
import Button from '../../components/Button/Button';
import { Chat } from '../../components/Chat/Chat';
import { Loader } from '../../components/Loader/Loader';
import { ProfileInfoCard } from './components/ProfileInfoCard';
import { LOGIN_PATH } from '../../constants/paths';
import {
  LogoutButton,
  ProfileActions,
  ProfileCentered,
  ProfileContainer,
  ProfileErrorCard,
  ProfileWrapper,
} from './ProfilePage.styles';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useMe();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate(LOGIN_PATH);
  };

  if (isLoading) {
    return (
      <ProfileCentered>
        <Loader />
      </ProfileCentered>
    );
  }

  if (isError || !user) {
    return (
      <ProfileCentered>
        <ProfileErrorCard>
          <h2>Access Denied</h2>
          <p>Please log in to view your profile.</p>
          <Button variant="primary" onClick={() => navigate(LOGIN_PATH)}>
            Log in
          </Button>
        </ProfileErrorCard>
      </ProfileCentered>
    );
  }

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileInfoCard user={user} />
        <ProfileActions>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </ProfileActions>
      </ProfileContainer>

      {selectedPatientId && user.profile?.id && (
        <Chat
          currentUserId={user.profile.id}
          onClose={() => setSelectedPatientId(null)}
          user={{ id: selectedPatientId, firstName: 'Patient', lastName: '' }}
        />
      )}
    </ProfileWrapper>
  );
}

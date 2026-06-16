import { useState } from 'react';
import type { Specialization, UserResponse } from '../../domains/doctors/types';
import { useGetDoctors } from '../../domains/doctors/useGetDoctors/useGetDoctors';
import { DoctorCard } from './components/DoctorCard';
import { ALL_SPECIALIZATIONS } from '../../domains/doctors/contants';
import { getFromStorage } from '../../utils/localStorageUtil';
import { Loader } from '../../components/Loader/Loader';
import { useChatGlobal } from '../../components/Chat/context/ChatContext';
import {
  DoctorsGrid,
  DoctorsLayout,
  DoctorsMain,
  DoctorsSidebar,
  EmptyState,
  ErrorText,
  MainHeader,
  PaginationBtn,
  PaginationInfo,
  PaginationWrapper,
  ResetBtn,
  SidebarNav,
  SidebarTitle,
  SpecBtn,
  Subtitle,
} from './DoctorsPage.styles';

export const DoctorsPage = () => {
  const [selectedSpec, setSelectedSpec] = useState<Specialization | undefined>(undefined);
  const [page, setPage] = useState(0);
  const { openChat } = useChatGlobal();
  const { data, isLoading, isError, isPlaceholderData } = useGetDoctors(selectedSpec, page);
  const currentUserId = getFromStorage<string>('userId') || '';

  const handleWriteMessage = (doctor: UserResponse) => {
    if (!currentUserId) {
      alert('Please log in to start a chat.');
      return;
    }
    openChat({
      id: doctor.id,
      firstName: doctor.firstName || ' ',
      lastName: doctor.lastName || ' ',
    });
  };

  return (
    <DoctorsLayout>
      <DoctorsSidebar>
        <SidebarTitle>Specializations</SidebarTitle>
        <SidebarNav>
          {ALL_SPECIALIZATIONS.map((spec) => (
            <SpecBtn
              key={spec}
              active={selectedSpec === spec}
              onClick={() => {
                setSelectedSpec(spec);
                setPage(0);
              }}
            >
              {spec.charAt(0) + spec.slice(1).toLowerCase()}
            </SpecBtn>
          ))}
          {selectedSpec && (
            <ResetBtn
              onClick={() => {
                setSelectedSpec(undefined);
                setPage(0);
              }}
            >
              Reset filter
            </ResetBtn>
          )}
        </SidebarNav>
      </DoctorsSidebar>

      <DoctorsMain>
        <MainHeader>
          <h1>Our Specialists</h1>
          {selectedSpec && (
            <Subtitle>
              Results for category: <strong>{selectedSpec}</strong>
            </Subtitle>
          )}
        </MainHeader>

        {!selectedSpec && !isLoading && (
          <EmptyState>
            <h2>Welcome!</h2>
            <p>Please select a specialization from the left menu to view available doctors.</p>
          </EmptyState>
        )}

        {isLoading && <Loader />}
        {isError && <ErrorText>Error loading doctors. Please try again later.</ErrorText>}

        <DoctorsGrid loading={isPlaceholderData}>
          {data?.content.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onWriteMessage={handleWriteMessage} />
          ))}
        </DoctorsGrid>

        {data && data.totalPages > 1 && (
          <PaginationWrapper>
            <PaginationBtn
              disabled={page === 0 || isPlaceholderData}
              onClick={() => setPage((prev) => prev - 1)}
            >
              ← Previous
            </PaginationBtn>
            <PaginationInfo>
              Page {page + 1} of {data.totalPages}
            </PaginationInfo>
            <PaginationBtn
              disabled={page >= data.totalPages - 1 || isPlaceholderData}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next →
            </PaginationBtn>
          </PaginationWrapper>
        )}
      </DoctorsMain>
    </DoctorsLayout>
  );
};

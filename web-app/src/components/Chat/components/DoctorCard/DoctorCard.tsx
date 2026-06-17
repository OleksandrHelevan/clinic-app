import type {RecommendedDoctor} from "../../../../domains/doctors/types.ts";
import {SPEC_LABELS} from "../../../../domains/doctors/contants.ts";
import {
    AvatarImg, AvatarPlaceholder, BookBtn, Card, CardLabel, DoctorCardWrapper, DoctorDetails, DoctorInfo, DoctorName,
    MetaRow, SpecBadge
} from "./DoctorCard.styles.ts";



interface DoctorCardProps {
    doctor: RecommendedDoctor;
    onBook: (doctorId: string) => void;
}

export const DoctorCard = ({doctor, onBook}: DoctorCardProps) => {
    const initials = `${doctor.firstName[0] ?? ''}${doctor.lastName[0] ?? ''}`.toUpperCase();
    const specLabel = SPEC_LABELS[doctor.specialization] ?? doctor.specialization;

    return (
        <DoctorCardWrapper>
            <Card>
                <CardLabel>Recommended Doctor</CardLabel>

                <DoctorInfo>
                    {doctor.photoUrl ? (
                        <AvatarImg src={doctor.photoUrl} alt={`${doctor.firstName} ${doctor.lastName}`}/>
                    ) : (
                        <AvatarPlaceholder>{initials}</AvatarPlaceholder>
                    )}
                    <DoctorDetails>
                        <DoctorName>{doctor.firstName} {doctor.lastName}</DoctorName>
                        <SpecBadge>{specLabel}</SpecBadge>
                    </DoctorDetails>
                </DoctorInfo>

                {(doctor.rating != null || doctor.experience != null) && (
                    <MetaRow>
                        {doctor.rating != null && <span>{doctor.rating.toFixed(1)}</span>}
                        {doctor.experience != null && <span>{doctor.experience} yrs exp.</span>}
                    </MetaRow>
                )}

                <BookBtn onClick={() => onBook(doctor.id)}>
                    View Doctor Profile
                </BookBtn>
            </Card>
        </DoctorCardWrapper>
    );
};

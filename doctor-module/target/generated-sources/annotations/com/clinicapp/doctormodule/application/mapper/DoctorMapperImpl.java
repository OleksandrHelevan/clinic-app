package com.clinicapp.doctormodule.application.mapper;

import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;
import com.clinicapp.doctormodule.domain.doctor.Doctor;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T12:33:58+0200",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorResponse toDto(Doctor doctor) {
        if ( doctor == null ) {
            return null;
        }

        DoctorResponse doctorResponse = new DoctorResponse();

        if ( doctor.getEmail() != null ) {
            doctorResponse.setEmail( doctor.getEmail() );
        }
        if ( doctor.getFirstName() != null ) {
            doctorResponse.setFirstName( doctor.getFirstName() );
        }
        if ( doctor.getId() != null ) {
            doctorResponse.setId( doctor.getId() );
        }
        if ( doctor.getLastName() != null ) {
            doctorResponse.setLastName( doctor.getLastName() );
        }
        if ( doctor.getPhone() != null ) {
            doctorResponse.setPhone( doctor.getPhone() );
        }
        if ( doctor.getSpecialization() != null ) {
            doctorResponse.setSpecialization( doctor.getSpecialization() );
        }

        return doctorResponse;
    }

    @Override
    public Doctor toEntity(CreateDoctorRequest doctorRequest) {
        if ( doctorRequest == null ) {
            return null;
        }

        Doctor doctor = new Doctor();

        if ( doctorRequest.getEmail() != null ) {
            doctor.setEmail( doctorRequest.getEmail() );
        }
        if ( doctorRequest.getFirstName() != null ) {
            doctor.setFirstName( doctorRequest.getFirstName() );
        }
        if ( doctorRequest.getLastName() != null ) {
            doctor.setLastName( doctorRequest.getLastName() );
        }
        if ( doctorRequest.getPhone() != null ) {
            doctor.setPhone( doctorRequest.getPhone() );
        }
        if ( doctorRequest.getSpecialization() != null ) {
            doctor.setSpecialization( doctorRequest.getSpecialization() );
        }

        return doctor;
    }
}

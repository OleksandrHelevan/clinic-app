package com.clinicapp.patientmodule.application.mapper;

import com.clinicapp.patientmodule.application.request.CreatePatientRequest;
import com.clinicapp.patientmodule.application.response.PatientResponse;
import com.clinicapp.patientmodule.domain.patient.Patient;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T12:34:05+0200",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PatientMapperImpl implements PatientMapper {

    @Override
    public PatientResponse toDto(Patient patient) {
        if ( patient == null ) {
            return null;
        }

        PatientResponse patientResponse = new PatientResponse();

        if ( patient.getAddress() != null ) {
            patientResponse.setAddress( patient.getAddress() );
        }
        patientResponse.setAge( patient.getAge() );
        if ( patient.getEmail() != null ) {
            patientResponse.setEmail( patient.getEmail() );
        }
        if ( patient.getFirstName() != null ) {
            patientResponse.setFirstName( patient.getFirstName() );
        }
        if ( patient.getId() != null ) {
            patientResponse.setId( patient.getId() );
        }
        if ( patient.getLastName() != null ) {
            patientResponse.setLastName( patient.getLastName() );
        }
        if ( patient.getPhone() != null ) {
            patientResponse.setPhone( patient.getPhone() );
        }

        return patientResponse;
    }

    @Override
    public Patient toEntity(CreatePatientRequest patientRequest) {
        if ( patientRequest == null ) {
            return null;
        }

        Patient patient = new Patient();

        if ( patientRequest.getAddress() != null ) {
            patient.setAddress( patientRequest.getAddress() );
        }
        if ( patientRequest.getAge() != null ) {
            patient.setAge( patientRequest.getAge() );
        }
        if ( patientRequest.getEmail() != null ) {
            patient.setEmail( patientRequest.getEmail() );
        }
        if ( patientRequest.getFirstName() != null ) {
            patient.setFirstName( patientRequest.getFirstName() );
        }
        if ( patientRequest.getLastName() != null ) {
            patient.setLastName( patientRequest.getLastName() );
        }
        if ( patientRequest.getPhone() != null ) {
            patient.setPhone( patientRequest.getPhone() );
        }

        return patient;
    }
}

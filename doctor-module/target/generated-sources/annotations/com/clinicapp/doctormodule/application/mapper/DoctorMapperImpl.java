package com.clinicapp.doctormodule.application.mapper;

import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;
import com.clinicapp.doctormodule.domain.doctor.Doctor;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-22T15:17:11+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorResponse toDto(Doctor doctor) {
        if ( doctor == null ) {
            return null;
        }

        DoctorResponse doctorResponse = new DoctorResponse();

        return doctorResponse;
    }

    @Override
    public Doctor toEntity(CreateDoctorRequest doctorRequest) {
        if ( doctorRequest == null ) {
            return null;
        }

        Doctor doctor = new Doctor();

        return doctor;
    }
}

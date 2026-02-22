package com.clinicapp.patientmodule.application.mapper;

import com.clinicapp.patientmodule.application.request.CreatePatientRequest;
import com.clinicapp.patientmodule.application.response.PatientResponse;
import com.clinicapp.patientmodule.config.MapperConfig;
import com.clinicapp.patientmodule.domain.patient.Patient;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface PatientMapper {
    PatientResponse toDto(Patient patient);
    Patient toEntity(CreatePatientRequest patientRequest);
}

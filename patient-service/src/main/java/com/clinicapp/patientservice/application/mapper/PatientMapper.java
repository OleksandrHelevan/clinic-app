package com.clinicapp.patientservice.application.mapper;

import com.clinicapp.patientservice.application.dto.PatientResponse;
import com.clinicapp.patientservice.application.mapper.config.MapperConfig;
import com.clinicapp.patientservice.domain.patient.model.Patient;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface PatientMapper {
    PatientResponse toDto(Patient patient);
}

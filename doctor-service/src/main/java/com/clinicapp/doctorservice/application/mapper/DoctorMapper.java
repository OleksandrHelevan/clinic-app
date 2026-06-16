package com.clinicapp.doctorservice.application.mapper;

import com.clinicapp.doctorservice.application.dto.AddDoctorProfileRequest;
import com.clinicapp.common.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.mapper.config.MapperConfig;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class)
public interface DoctorMapper {
    DoctorResponse toDto(Doctor doctor);
    void updateDoctorFromDto(AddDoctorProfileRequest request, @MappingTarget Doctor entity);
}

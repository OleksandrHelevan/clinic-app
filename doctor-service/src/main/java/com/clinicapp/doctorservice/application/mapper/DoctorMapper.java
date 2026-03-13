package com.clinicapp.doctorservice.application.mapper;

import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.mapper.config.MapperConfig;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface DoctorMapper {
    DoctorResponse toDto(Doctor doctor);
}

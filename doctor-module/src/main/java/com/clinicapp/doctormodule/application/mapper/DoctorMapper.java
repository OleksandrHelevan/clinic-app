package com.clinicapp.doctormodule.application.mapper;

import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;
import com.clinicapp.doctormodule.config.MapperConfig;
import com.clinicapp.doctormodule.domain.doctor.Doctor;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface DoctorMapper {
    DoctorResponse toDto(Doctor doctor);
    Doctor toEntity(CreateDoctorRequest doctorRequest);
}

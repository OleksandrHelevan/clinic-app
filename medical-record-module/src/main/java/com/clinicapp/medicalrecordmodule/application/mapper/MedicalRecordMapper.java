package com.clinicapp.medicalrecordmodule.application.mapper;

import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;
import com.clinicapp.medicalrecordmodule.config.MapperConfig;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecord;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface MedicalRecordMapper {
    MedicalRecordResponse toDto(MedicalRecord medicalRecord);
    MedicalRecord toEntity(CreateMedicalRecordRequest medicalRecordRequest);
}

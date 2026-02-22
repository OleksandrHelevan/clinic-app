package com.clinicapp.medicalrecordmodule.application.mapper;

import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecord;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-22T15:17:11+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class MedicalRecordMapperImpl implements MedicalRecordMapper {

    @Override
    public MedicalRecordResponse toDto(MedicalRecord medicalRecord) {
        if ( medicalRecord == null ) {
            return null;
        }

        MedicalRecordResponse medicalRecordResponse = new MedicalRecordResponse();

        return medicalRecordResponse;
    }

    @Override
    public MedicalRecord toEntity(CreateMedicalRecordRequest medicalRecordRequest) {
        if ( medicalRecordRequest == null ) {
            return null;
        }

        MedicalRecord medicalRecord = new MedicalRecord();

        return medicalRecord;
    }
}

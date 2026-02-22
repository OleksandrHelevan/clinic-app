package com.clinicapp.medicalrecordmodule.application.service;

import com.clinicapp.medicalrecordmodule.application.mapper.MedicalRecordMapper;
import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecord;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecordService;
import com.clinicapp.medicalrecordmodule.exception.MedicalRecordNotFoundException;
import com.clinicapp.medicalrecordmodule.infrastructure.persistence.MedicalRecordRepository;
import com.clinicapp.medicalrecordmodule.infrastructure.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;

    @Autowired
    public MedicalRecordServiceImpl(MedicalRecordRepository medicalRecordRepository, MedicalRecordMapper medicalRecordMapper) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.medicalRecordMapper = medicalRecordMapper;
    }

    @Override
    @Transactional
    public MedicalRecordResponse createMedicalRecord(CreateMedicalRecordRequest medicalRecord) {
        MedicalRecord medicalRecordEntity = medicalRecordMapper.toEntity(medicalRecord);
        return medicalRecordMapper.toDto(medicalRecordRepository.save(medicalRecordEntity));
    }

    @Override
    public MedicalRecordResponse getMedicalRecordById(UUID id) {
        return medicalRecordMapper
                .toDto(medicalRecordRepository
                        .findById(id)
                        .orElseThrow(() -> new MedicalRecordNotFoundException(
                                ErrorMessage.MEDICAL_RECORD_NOT_FOUND
                        )));
    }
}

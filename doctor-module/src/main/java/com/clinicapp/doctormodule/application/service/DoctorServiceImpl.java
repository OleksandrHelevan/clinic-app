package com.clinicapp.doctormodule.application.service;

import com.clinicapp.doctormodule.application.mapper.DoctorMapper;
import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;
import com.clinicapp.doctormodule.domain.doctor.Doctor;
import com.clinicapp.doctormodule.domain.doctor.DoctorService;
import com.clinicapp.doctormodule.exception.DoctorAlreadyExistsException;
import com.clinicapp.doctormodule.exception.DoctorNotFoundException;
import com.clinicapp.doctormodule.infrastructure.persistence.DoctorRepository;
import com.clinicapp.doctormodule.infrastructure.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, DoctorMapper doctorMapper) {
        this.doctorRepository = doctorRepository;
        this.doctorMapper = doctorMapper;
    }

    @Override
    @Transactional("doctorTransactionManager")
    public DoctorResponse createDoctor(CreateDoctorRequest doctor) {
        if(doctorRepository.existsDoctorByEmail(doctor.getEmail()))
            throw new DoctorAlreadyExistsException(ErrorMessage.DOCTOR_ALREADY_EXISTS);
        Doctor doctorEntity = doctorMapper.toEntity(doctor);
        return doctorMapper.toDto(doctorRepository.save(doctorEntity));
    }

    @Override
    public DoctorResponse getDoctorById(UUID id) {
        return doctorMapper
                .toDto(doctorRepository
                        .findById(id)
                        .orElseThrow(() -> new DoctorNotFoundException(
                                ErrorMessage.DOCTOR_NOT_FOUND
                        )));
    }
}

package com.clinicapp.doctorservice.infrastructure.persistence;

import com.clinicapp.doctorservice.domain.doctor.Doctor;
import com.clinicapp.common.dto.Specialization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Page<Doctor> findBySpecialization(Specialization specialization, Pageable pageable);

}
package com.clinicapp.doctorservice.infrastructure.persistence;

import com.clinicapp.doctorservice.domain.doctor.Doctor;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Page<Doctor> findBySpecialization(Specialization specialization, Pageable pageable);

}
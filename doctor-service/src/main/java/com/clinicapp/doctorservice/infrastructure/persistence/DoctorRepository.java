package com.clinicapp.doctorservice.infrastructure.persistence;

import com.clinicapp.doctorservice.domain.doctor.Doctor;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, UUID> {
    List<Doctor> getDoctorBySpecialization(Specialization specialization);
}

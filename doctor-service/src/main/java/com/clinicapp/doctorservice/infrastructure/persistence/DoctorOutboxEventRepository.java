package com.clinicapp.doctorservice.infrastructure.persistence;

import com.clinicapp.doctorservice.domain.doctor.DoctorOutboxEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorOutboxEventRepository extends MongoRepository<DoctorOutboxEvent, UUID> {
    List<DoctorOutboxEvent> findByProcessedFalseOrderByCreatedAtAsc();
}
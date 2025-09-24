package com.payoyo.agro_track.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Certification;
import java.time.LocalDate;


public interface CertificationRepository extends JpaRepository<Certification, UUID>{
    
    // devuelve todas las certificaciones registradas para un empleado 
    List<Certification> findCertificationByEmployeed(UUID employeeId);

    // permite detectar certificaciones cuya fecha de expiración es anterior a una fecha dada 
    List<Certification> findByExpiresAtBefore(LocalDate expiresAt);
}

package com.payoyo.agro_track.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.certification.CertificationRequestDTO;
import com.payoyo.agro_track.dtos.certification.CertificationResponseDTO;

public interface CertificationService {
    
    // CRUD
    CertificationResponseDTO create(CertificationRequestDTO dto);
    List<CertificationResponseDTO> findAll();
    CertificationResponseDTO findById(UUID id);
    CertificationResponseDTO update(CertificationRequestDTO dto, UUID id);
    void delete(UUID id);

    // metodos personalizados
    List<CertificationResponseDTO> findByEmployeeId(UUID employeeId);
    List<CertificationResponseDTO> findByExpiresAtBefore(LocalDate expiresAt);
}

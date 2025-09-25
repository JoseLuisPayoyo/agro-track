package com.payoyo.agro_track.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.certification.CertificationRequestDTO;
import com.payoyo.agro_track.dtos.certification.CertificationResponseDTO;
import com.payoyo.agro_track.exception.CertificationNotFoundException;
import com.payoyo.agro_track.exception.EmployeeNotFoundException;
import com.payoyo.agro_track.mappers.CertificationMapper;
import com.payoyo.agro_track.models.Certification;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.repositories.CertificationRepository;
import com.payoyo.agro_track.repositories.EmployeeRepository;
import com.payoyo.agro_track.services.CertificationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService{
    
    private final CertificationRepository certificationRepository;
    private final EmployeeRepository employeeRepository;

    // crear certificado
    @Override
    public CertificationResponseDTO create(CertificationRequestDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmployeeId()));
        Certification certification = CertificationMapper.toEntity(dto, employee);
        Certification certificationSave = certificationRepository.save(certification);
        
        return CertificationMapper.toDTO(certificationSave);
    }

    // listar certificados
    @Override
    public List<CertificationResponseDTO> findAll() {
        return certificationRepository.findAll()
            .stream()
            .map(CertificationMapper::toDTO)
            .collect(Collectors.toList());
    }

    // buscar certificado por id
    @Override
    public CertificationResponseDTO findById(UUID id) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new CertificationNotFoundException(id));
        
            return CertificationMapper.toDTO(certification);    
    }

    // actualizar certificado
    @Override
    public CertificationResponseDTO update(CertificationRequestDTO dto, UUID id) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new CertificationNotFoundException(id));
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmployeeId()));
        
        // actualizamos los datos
        certification.setEmployee(employee);
        certification.setExpiresAt(dto.getExpiresAt());
        certification.setType(dto.getType());

        Certification certificationSave = certificationRepository.save(certification);

        return CertificationMapper.toDTO(certificationSave);

    }

    // eliminar certificado por id
    @Override
    public void delete(UUID id) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new CertificationNotFoundException(id));
        certificationRepository.delete(certification);   
    }

    // buscar certificados del empleado
    @Override
    public List<CertificationResponseDTO> findByEmployeeId(UUID employeeId) {
        employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
        // buscar todas las certificaciones dle empleado
        List<Certification> certifications = certificationRepository.findByEmployeeId(employeeId);

        return certifications
            .stream()
            .map(CertificationMapper::toDTO)
            .collect(Collectors.toList());
    }

    // devolver certificados con fecha de expiracion anterior a la introducida
    @Override
    public List<CertificationResponseDTO> findByExpiresAtBefore(LocalDate expiresAt) {
        List<Certification> certifications = certificationRepository.findByExpiresAtBefore(expiresAt);

        return certifications
            .stream()
            .map(CertificationMapper::toDTO)
            .collect(Collectors.toList());
    }
}

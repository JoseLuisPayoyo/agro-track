package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.certification.CertificationRequestDTO;
import com.payoyo.agro_track.dtos.certification.CertificationResponseDTO;
import com.payoyo.agro_track.models.Certification;
import com.payoyo.agro_track.models.Employee;

public class CertificationMapper {

    public static Certification toEntity(CertificationRequestDTO dto, Employee employee){
        return Certification.builder()
                .employee(employee)
                .type(dto.getType())
                .expiresAt(dto.getExpiresAt())
                .build();
    }

    public static CertificationResponseDTO toDTO(Certification certification){
        return CertificationResponseDTO.builder()
                .id(certification.getId())
                .employeeId(certification.getEmployee().getId())
                .employeeName(certification.getEmployee().getName())
                .type(certification.getType())
                .expiresAt(certification.getExpiresAt())
                .build();
    }
    
}

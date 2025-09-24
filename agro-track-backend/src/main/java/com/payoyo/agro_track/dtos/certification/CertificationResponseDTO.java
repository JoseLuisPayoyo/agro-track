package com.payoyo.agro_track.dtos.certification;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.CertificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationResponseDTO {
    
    private UUID id;
    private UUID employeeId;
    private String employeeName;
    private CertificationType type;
    private LocalDate expiresAt;

}

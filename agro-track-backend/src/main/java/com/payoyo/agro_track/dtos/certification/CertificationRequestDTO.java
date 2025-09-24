package com.payoyo.agro_track.dtos.certification;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.CertificationType;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationRequestDTO {
    
    @NotNull(message = "El empleado es obligatorio")
    private UUID employeeId;

    @NotNull(message = "El tipo de certificado es obligatorio")
    private CertificationType type;

    private LocalDate expiresAt;
}

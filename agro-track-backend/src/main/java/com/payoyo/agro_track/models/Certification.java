package com.payoyo.agro_track.models;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.CertificationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "certifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {
    
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @NotNull(message = "El empleado es obligatorio")
    private Employee employee;

    @Column(nullable = false, length = 200)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "El tipo de certificado es obligatorio")
    private CertificationType type;

    @Column(nullable = false)
    @NotNull(message = "La fecha de caducidad es obligatoria")
    private LocalDate expiresAt;

}

package com.payoyo.agro_track.dtos.campaign;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 80)
    private String name;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate startDate;

    private LocalDate endDate;

    @NotBlank(message = "La tarea principal es obligatoria")
    @Size(max = 200)
    private String mainTask;

    @NotNull(message = "La finca es obligatoria")
    private UUID farmId;

    @NotNull(message = "La cuadrilla es obligatoria")
    private UUID crewId; 
}

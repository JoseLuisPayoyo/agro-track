package com.payoyo.agro_track.dtos.campaign;

import java.time.LocalDate;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CampaignResponseDTO {
    
    private UUID id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String mainTask;

    private UUID farmId;
    private String farmName;

    private UUID crewId;
    private String crewName;
}

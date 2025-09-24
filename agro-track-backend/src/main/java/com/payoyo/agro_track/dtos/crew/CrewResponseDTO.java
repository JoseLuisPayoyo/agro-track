package com.payoyo.agro_track.dtos.crew;

import java.util.UUID;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrewResponseDTO {

    private UUID id;
    private String name;

    private UUID foremanId;
    private String foremanName;
    
}

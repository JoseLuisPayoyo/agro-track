package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.crew.CrewRequestDTO;
import com.payoyo.agro_track.dtos.crew.CrewResponseDTO;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Employee;

public class CrewMapper {

    public static Crew toEntity(CrewRequestDTO dto, Employee employee){
        return Crew.builder()
                .name(dto.getName())
                .foreman(employee)
                .build();
    }

    public static CrewResponseDTO toDTO(Crew crew){
        return CrewResponseDTO.builder()
                .id(crew.getId())
                .name(crew.getName())
                .foremanId(crew.getForeman().getId())
                .foremanName(crew.getForeman().getName())
                .build();
    }
    
}

package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.farm.FarmRequestDTO;
import com.payoyo.agro_track.dtos.farm.FarmResponseDTO;
import com.payoyo.agro_track.models.Farm;

public class FarmMapper {

    public static Farm toEntity(FarmRequestDTO dto){
        return Farm.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .build();
    }

    public static FarmResponseDTO toDTO(Farm farm){
        return FarmResponseDTO.builder()
                .id(farm.getId())
                .name(farm.getName())
                .location(farm.getLocation())
                .build();
    }
    
}

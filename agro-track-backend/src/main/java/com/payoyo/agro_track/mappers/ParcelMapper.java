package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.parcel.ParcelRequestDTO;
import com.payoyo.agro_track.dtos.parcel.ParcelResponseDTO;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.models.Parcel;

public class ParcelMapper {

    public static Parcel toEntity(ParcelRequestDTO dto, Farm farm){
        return Parcel.builder()
                .name(dto.getName())
                .farm(farm)
                .build();
    }

    public static ParcelResponseDTO toDTO(Parcel parcel){
        return ParcelResponseDTO.builder()
                .id(parcel.getId())
                .name(parcel.getName())
                .farmId(parcel.getFarm().getId())
                .farmName(parcel.getFarm().getName())
                .build();
    }
    
}

package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.workPart.WorkPartRequestDTO;
import com.payoyo.agro_track.dtos.workPart.WorkPartResponseDTO;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.models.Parcel;
import com.payoyo.agro_track.models.WorkPart;

public class WorkPartMapper {

    public static WorkPart toEntity(WorkPartRequestDTO dto, Farm farm, Parcel parcel, Crew crew){
        return WorkPart.builder()
                .date(dto.getDate())
                .task(dto.getTask())
                .status(dto.getStatus())
                .notes(dto.getNotes())
                .farm(farm)
                .parcel(parcel)
                .crew(crew)
                .build();
    }

    public static WorkPartResponseDTO toDTO(WorkPart workPart){
        return WorkPartResponseDTO.builder()
                .id(workPart.getId())
                .date(workPart.getDate())
                .task(workPart.getTask())
                .status(workPart.getStatus())
                .notes(workPart.getNotes())
                .farmId(workPart.getFarm().getId())
                .farmName(workPart.getFarm().getName())
                .campaignId(workPart.getCampaign().getId())
                .campaignName(workPart.getCampaign().getName())
                .parcelId(workPart.getParcel() != null ? workPart.getParcel().getId() : null)
                .parcelName(workPart.getParcel() != null ? workPart.getParcel().getName() : null)
                .crewId(workPart.getCrew().getId())
                .crewName(workPart.getCrew().getName())
                .build();
                
    }
    
}

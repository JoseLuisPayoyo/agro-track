package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.campaign.CampaignRequestDTO;
import com.payoyo.agro_track.dtos.campaign.CampaignResponseDTO;
import com.payoyo.agro_track.models.Campaign;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Farm;

public class CampaignMapper {

    public static Campaign toEntity(CampaignRequestDTO dto, Farm farm, Crew crew){
        return Campaign.builder()
                .name(dto.getName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .mainTask(dto.getMainTask())
                .farm(farm)
                .crew(crew)
                .build();
    }

    public static CampaignResponseDTO toDTO(Campaign campaign){
        return CampaignResponseDTO.builder()
                .id(campaign.getId())
                .name(campaign.getName())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .mainTask(campaign.getMainTask())
                .farmId(campaign.getFarm().getId())
                .farmName(campaign.getFarm().getName())
                .crewId(campaign.getCrew().getId())
                .crewName(campaign.getCrew().getName())
                .build();
    }
    
}

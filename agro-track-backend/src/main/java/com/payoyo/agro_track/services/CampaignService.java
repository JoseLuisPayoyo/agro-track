package com.payoyo.agro_track.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.campaign.CampaignRequestDTO;
import com.payoyo.agro_track.dtos.campaign.CampaignResponseDTO;

public interface CampaignService {
    
    // crud
    CampaignResponseDTO create(CampaignRequestDTO dto);
    List<CampaignResponseDTO> findAll();
    CampaignResponseDTO findById(UUID id);
    CampaignResponseDTO update(UUID id, CampaignRequestDTO dto);
    void delete(UUID id);

    // metodos personalizados
    List<CampaignResponseDTO> findByFarmId(UUID farmId);
    List<CampaignResponseDTO> findByCrewId(UUID crewId);
    List<CampaignResponseDTO> findByStartDateBetween(LocalDate from, LocalDate to);
}

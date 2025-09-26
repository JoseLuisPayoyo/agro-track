package com.payoyo.agro_track.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.campaign.CampaignRequestDTO;
import com.payoyo.agro_track.dtos.campaign.CampaignResponseDTO;
import com.payoyo.agro_track.exception.CampaignNotFoundException;
import com.payoyo.agro_track.exception.CrewNotFoundException;
import com.payoyo.agro_track.exception.FarmNotFoundException;
import com.payoyo.agro_track.mappers.CampaignMapper;
import com.payoyo.agro_track.models.Campaign;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.repositories.CampaignRepository;
import com.payoyo.agro_track.repositories.CrewRepository;
import com.payoyo.agro_track.repositories.FarmRepository;
import com.payoyo.agro_track.services.CampaignService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService{

    private final CampaignRepository campaignRepository;
    private final CrewRepository crewRepository;
    private final FarmRepository farmRepository;

    // crear campaña
    @Override
    public CampaignResponseDTO create(CampaignRequestDTO dto) {
        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new CrewNotFoundException(dto.getCrewId()));
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
                
        Campaign campaign = CampaignMapper.toEntity(dto, farm, crew);
        Campaign campaignSaved = campaignRepository.save(campaign);

        return CampaignMapper.toDTO(campaignSaved);
    }

    // listar todas las campañas
    @Override
    public List<CampaignResponseDTO> findAll() {
        return campaignRepository.findAll()
            .stream()
            .map(CampaignMapper::toDTO)
            .collect(Collectors.toList());
    }

    // buscar campaña por id
    @Override
    public CampaignResponseDTO findById(UUID id) {
        Campaign campaign = campaignRepository.findById(id)
            .orElseThrow(() -> new CampaignNotFoundException(id));
        return CampaignMapper.toDTO(campaign);    
    }
    @Override
    public CampaignResponseDTO update(UUID id, CampaignRequestDTO dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }
    @Override
    public void delete(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
    @Override
    public List<CampaignResponseDTO> findByFarmId(UUID farmId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByFarmId'");
    }
    @Override
    public List<CampaignResponseDTO> findByCrewId(UUID crewId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByCrewId'");
    }
    @Override
    public List<CampaignResponseDTO> findByStartDateBetween(LocalDate from, LocalDate to) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByStartDateBetween'");
    }
    
}

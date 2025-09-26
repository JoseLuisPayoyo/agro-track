package com.payoyo.agro_track.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.workPart.WorkPartRequestDTO;
import com.payoyo.agro_track.dtos.workPart.WorkPartResponseDTO;
import com.payoyo.agro_track.exception.CampaignNotFoundException;
import com.payoyo.agro_track.exception.CrewNotFoundException;
import com.payoyo.agro_track.exception.FarmNotFoundException;
import com.payoyo.agro_track.exception.ParcelNotFoundException;
import com.payoyo.agro_track.exception.WorkPartNotFoundException;
import com.payoyo.agro_track.mappers.WorkPartMapper;
import com.payoyo.agro_track.models.Campaign;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.models.Parcel;
import com.payoyo.agro_track.models.WorkPart;
import com.payoyo.agro_track.models.enums.WorkPartStatus;
import com.payoyo.agro_track.repositories.CampaignRepository;
import com.payoyo.agro_track.repositories.CrewRepository;
import com.payoyo.agro_track.repositories.FarmRepository;
import com.payoyo.agro_track.repositories.ParcelRepository;
import com.payoyo.agro_track.repositories.WorkPartRepository;
import com.payoyo.agro_track.services.WorkPartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkPartServiceImpl implements WorkPartService{

    private final WorkPartRepository workPartRepository;
    private final CrewRepository crewRepository;
    private final FarmRepository farmRepository;
    private final ParcelRepository parcelRepository;
    private final CampaignRepository campaignRepository;

    // crear parte
    @Override
    public WorkPartResponseDTO create(WorkPartRequestDTO dto) {
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
        Parcel parcel = parcelRepository.findById(dto.getParcelId())
            .orElseThrow(() -> new ParcelNotFoundException(dto.getParcelId()));
        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new CrewNotFoundException(dto.getCrewId()));  
        Campaign campaign = campaignRepository.findById(dto.getCampaignId())
            .orElseThrow(() -> new CampaignNotFoundException(dto.getCampaignId())); 
             
        WorkPart workPart  = WorkPartMapper.toEntity(dto, farm, parcel, crew, campaign);

        WorkPart workPartSaved = workPartRepository.save(workPart);

        return WorkPartMapper.toDTO(workPartSaved);
    }

    // listar todos los partes
    @Override
    public List<WorkPartResponseDTO> findAll() {
        return workPartRepository.findAll()
            .stream()
            .map(WorkPartMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar parte por id
    @Override
    public WorkPartResponseDTO findById(UUID id) {
        WorkPart workPart = workPartRepository.findById(id)
            .orElseThrow(() -> new WorkPartNotFoundException(id));

        return WorkPartMapper.toDTO(workPart);    
    }

    // actualizar parte de trabajo
    @Override
    public WorkPartResponseDTO update(UUID id, WorkPartRequestDTO dto) {
        WorkPart workPart = workPartRepository.findById(id)
            .orElseThrow(() -> new WorkPartNotFoundException(id));
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
        Parcel parcel = parcelRepository.findById(dto.getParcelId())
            .orElseThrow(() -> new ParcelNotFoundException(dto.getParcelId()));
        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new CrewNotFoundException(dto.getCrewId()));

        // actualizamos los datos
        workPart.setDate(dto.getDate());
        workPart.setTask(dto.getTask());
        workPart.setStatus(dto.getStatus());
        workPart.setNotes(dto.getNotes());
        workPart.setFarm(farm);
        workPart.setParcel(parcel);
        workPart.setCrew(crew);

        WorkPart workPartSaved = workPartRepository.save(workPart);

        return WorkPartMapper.toDTO(workPartSaved);
    }

    // eliminar parte de trabajo
    @Override
    public void delete(UUID id) {
        WorkPart workPart = workPartRepository.findById(id)
            .orElseThrow(() -> new WorkPartNotFoundException(id));
        workPartRepository.delete(workPart);    
    }

    // listar partes por fecha
    @Override
    public List<WorkPartResponseDTO> findByDate(LocalDate date) {
        List<WorkPart> workParts = workPartRepository.findByDate(date);

        return workParts
            .stream()
            .map(WorkPartMapper::toDTO)
            .collect(Collectors.toList());

    }

    // listar por estado
    @Override
    public List<WorkPartResponseDTO> findByStatus(WorkPartStatus status) {
        List<WorkPart> workParts = workPartRepository.findByStatus(status);

        return workParts
            .stream()
            .map(WorkPartMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar por cuadrilla
    @Override
    public List<WorkPartResponseDTO> findByCrewId(UUID crewId) {
        crewRepository.findById(crewId)
            .orElseThrow(() -> new CrewNotFoundException(crewId));
        List<WorkPart> workParts = workPartRepository.findByCrewId(crewId);

        return workParts
            .stream()
            .map(WorkPartMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar por campaña
    @Override
    public List<WorkPartResponseDTO> findByCampaignId(UUID campainId) {
        campaignRepository.findById(campainId)
            .orElseThrow(() -> new CampaignNotFoundException(campainId));
        List<WorkPart> workParts = workPartRepository.findByCampaignId(campainId);
        
        return workParts
            .stream()
            .map(WorkPartMapper::toDTO)
            .collect(Collectors.toList());
    }
}

package com.payoyo.agro_track.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.parcel.ParcelRequestDTO;
import com.payoyo.agro_track.dtos.parcel.ParcelResponseDTO;
import com.payoyo.agro_track.exception.FarmNotFoundException;
import com.payoyo.agro_track.exception.ParcelNotFoundException;
import com.payoyo.agro_track.mappers.ParcelMapper;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.models.Parcel;
import com.payoyo.agro_track.repositories.FarmRepository;
import com.payoyo.agro_track.repositories.ParcelRepository;
import com.payoyo.agro_track.services.ParcelService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParcelServiceImpl implements ParcelService{
    
    private final ParcelRepository parcelRepository;
    private final FarmRepository farmRepository;

    // crear parcela
    @Override
    public ParcelResponseDTO create(ParcelRequestDTO dto) {
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));

        Parcel parcel = ParcelMapper.toEntity(dto, farm);
        Parcel parcelSaved = parcelRepository.save(parcel);
        
        return ParcelMapper.toDTO(parcelSaved);
    }

    // listar todas las parcelas
    @Override
    public List<ParcelResponseDTO> findAll() {
        return parcelRepository.findAll()
            .stream()
            .map(ParcelMapper::toDTO)
            .collect(Collectors.toList());
    }

    // buscar parcela por id
    @Override
    public ParcelResponseDTO findById(UUID id) {
        Parcel parcel = parcelRepository.findById(id)
            .orElseThrow(() -> new ParcelNotFoundException(id));

        return ParcelMapper.toDTO(parcel);    
    }

    // actualizar parcela
    @Override
    public ParcelResponseDTO update(UUID id, ParcelRequestDTO dto) {
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
        Parcel parcel = parcelRepository.findById(id)
            .orElseThrow(() -> new ParcelNotFoundException(id));

        // actualiazmoa los datos
        parcel.setName(dto.getName());
        parcel.setFarm(farm); 
        
        Parcel parcelSaved = parcelRepository.save(parcel);

        return ParcelMapper.toDTO(parcelSaved);
    }

    // eliminar parcela
    @Override
    public void delete(UUID id) {
        Parcel parcel = parcelRepository.findById(id)
            .orElseThrow(() -> new ParcelNotFoundException(id));
        parcelRepository.delete(parcel);    
    }

    // buscar por id de finca
    @Override
    public List<ParcelResponseDTO> findByFarmId(UUID farmId) {
        return parcelRepository.findByFarmId(farmId)
            .stream()
            .map(ParcelMapper::toDTO)
            .collect(Collectors.toList());
    }
    
}

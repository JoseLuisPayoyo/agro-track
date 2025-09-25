package com.payoyo.agro_track.services;

import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.parcel.ParcelRequestDTO;
import com.payoyo.agro_track.dtos.parcel.ParcelResponseDTO;

public interface ParcelService {
    
    // crud
    ParcelResponseDTO create(ParcelRequestDTO dto);
    List<ParcelResponseDTO> findAll();
    ParcelResponseDTO findById(UUID id);
    ParcelResponseDTO update(UUID id, ParcelRequestDTO dto);
    void delete(UUID id);

    // metodos personalizados
    List<ParcelResponseDTO> findByFarmId(UUID farmId);
}

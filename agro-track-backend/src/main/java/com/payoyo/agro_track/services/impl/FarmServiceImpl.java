package com.payoyo.agro_track.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.farm.FarmRequestDTO;
import com.payoyo.agro_track.dtos.farm.FarmResponseDTO;
import com.payoyo.agro_track.exception.FarmNotFoundException;
import com.payoyo.agro_track.mappers.FarmMapper;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.repositories.FarmRepository;
import com.payoyo.agro_track.services.FarmService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmServiceImpl implements FarmService{

    private final FarmRepository farmRepository;

    // crear finca
    @Override
    public FarmResponseDTO create(FarmRequestDTO dto) {
        Farm farm = FarmMapper.toEntity(dto);
        Farm farmSaved = farmRepository.save(farm);

        return FarmMapper.toDTO(farmSaved);
    }

    // listar todas las fincas
    @Override
    public List<FarmResponseDTO> findAll() {
        return farmRepository.findAll()
            .stream()
            .map(FarmMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar finca por id
    @Override
    public FarmResponseDTO findById(UUID id) {
        Farm farm = farmRepository.findById(id)
            .orElseThrow(() -> new FarmNotFoundException(id));
        
            return FarmMapper.toDTO(farm);    
    }

    // actualizar finca
    @Override
    public FarmResponseDTO update(UUID id, FarmRequestDTO dto) {
        Farm farm = farmRepository.findById(id)
            .orElseThrow(() -> new FarmNotFoundException(id));
        
        // actualizamos los datos    
        farm.setName(dto.getName());
        farm.setLocation(dto.getLocation());

        Farm farmSaved = farmRepository.save(farm);

        return FarmMapper.toDTO(farmSaved);
    }

    // eliminar finca
    @Override
    public void delete(UUID id) {
        Farm farm = farmRepository.findById(id)
            .orElseThrow(() -> new FarmNotFoundException(id));
        farmRepository.delete(farm);    
    }

    // buscar finca por nombre
    @Override
    public FarmResponseDTO findByName(String name) {
        Farm farm = farmRepository.findByName(name)
            .orElseThrow(() -> new FarmNotFoundException(name));
        
        return FarmMapper.toDTO(farm);    
    }
    
}

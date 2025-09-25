package com.payoyo.agro_track.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.crew.CrewRequestDTO;
import com.payoyo.agro_track.dtos.crew.CrewResponseDTO;
import com.payoyo.agro_track.exception.CrewNotFoundException;
import com.payoyo.agro_track.exception.EmployeeNotFoundException;
import com.payoyo.agro_track.mappers.CrewMapper;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.repositories.CrewRepository;
import com.payoyo.agro_track.repositories.EmployeeRepository;
import com.payoyo.agro_track.services.CrewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CrewServiceImpl implements CrewService{

    private final CrewRepository crewRepository;
    private final EmployeeRepository employeeRepository;

    // crear cuadrilla
    @Override
    public CrewResponseDTO create(CrewRequestDTO dto) {
        Employee foreman = employeeRepository.findById(dto.getForemanId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getForemanId()));

        Crew crew = CrewMapper.toEntity(dto, foreman);
        Crew crewSave = crewRepository.save(crew);

        return CrewMapper.toDTO(crewSave);
    }

    // buscar cuadrilla por id
    @Override
    public CrewResponseDTO findById(UUID id) {
        Crew crew = crewRepository.findById(id)
            .orElseThrow(() -> new CrewNotFoundException(id));
        
        return CrewMapper.toDTO(crew);
    }

    // devolvemos todas las cuadrillas
    @Override
    public List<CrewResponseDTO> findAll() {
        return crewRepository.findAll()
            .stream()
            .map(CrewMapper::toDTO)
            .collect(Collectors.toList());
    }

    //actualizamos cuadrilla
    @Override
    public CrewResponseDTO update(UUID id, CrewRequestDTO dto) {
        Crew crew = crewRepository.findById(id)
            .orElseThrow(() -> new CrewNotFoundException(id));
        Employee foreman = employeeRepository.findById(dto.getForemanId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getForemanId()));    

        // actualizamos los datos
        crew.setName(dto.getName());
        crew.setForeman(foreman);
        
        // guardamos en la db
        Crew crewSave = crewRepository.save(crew);

        return CrewMapper.toDTO(crewSave); 
    }

    // eliminar cuadrilla
    @Override
    public void delete(UUID id) {
        Crew crew = crewRepository.findById(id)
            .orElseThrow(() -> new CrewNotFoundException(id));

        crewRepository.delete(crew);    
    }

    // buscar cuadrilla por nombre
    @Override
    public CrewResponseDTO findByName(String name) {
        Crew crew = crewRepository.findByName(name)
            .orElseThrow(() -> new CrewNotFoundException(name));

        return CrewMapper.toDTO(crew);    
    }

    // buscar cuadrilla por encargado
    @Override
    public List<CrewResponseDTO> findByForemanId(UUID employeeId) {
        List<Crew> crews = crewRepository.findByForemanId(employeeId);

        return crews.stream()
            .map(CrewMapper::toDTO)
            .toList();
    }


    
}

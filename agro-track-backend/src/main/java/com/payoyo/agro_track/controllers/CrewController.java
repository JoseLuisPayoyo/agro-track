package com.payoyo.agro_track.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.dtos.crew.CrewRequestDTO;
import com.payoyo.agro_track.dtos.crew.CrewResponseDTO;
import com.payoyo.agro_track.services.CrewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {
    
    private final CrewService crewService;

    // crear cuadrilla
    @PostMapping
    public ResponseEntity<CrewResponseDTO> create(@Valid @RequestBody CrewRequestDTO dto){
        CrewResponseDTO crew = crewService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(crew);
    }

    // buscar cuadrilla por id
    @GetMapping("/id/{id}")
    public ResponseEntity<CrewResponseDTO> findById(@PathVariable UUID id){
        CrewResponseDTO crew = crewService.findById(id);

        return ResponseEntity
            .ok(crew);
    }

    // devolvemos todas las cuadrillas
    @GetMapping
    public ResponseEntity<List<CrewResponseDTO>> findAll(){
        List<CrewResponseDTO> crews = crewService.findAll();

        return ResponseEntity
            .ok(crews);
    }

    //actualizamos cuadrilla
    @PutMapping("/{id}")
    public ResponseEntity<CrewResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody CrewRequestDTO dto
    ){
        CrewResponseDTO crew = crewService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(crew);
    }

    // eliminar cuadrilla
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        crewService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar cuadrilla por nombre
    @GetMapping("/name/{name}")
    public ResponseEntity<CrewResponseDTO> findByName(@PathVariable String name){
        CrewResponseDTO crew = crewService.findByName(name);

        return ResponseEntity
            .ok(crew);
    }

    // buscar cuadrilla por encargado
    @GetMapping("/foreman/{employeeId}")
    public ResponseEntity<List<CrewResponseDTO>> findByForemanId(@PathVariable UUID employeeId){
        List<CrewResponseDTO> crews = crewService.findByForemanId(employeeId);

        return ResponseEntity
            .ok(crews);
    }
}

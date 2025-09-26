package com.payoyo.agro_track.controllers;

import java.time.LocalDate;
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

import com.payoyo.agro_track.dtos.workPart.WorkPartRequestDTO;
import com.payoyo.agro_track.dtos.workPart.WorkPartResponseDTO;
import com.payoyo.agro_track.models.enums.WorkPartStatus;
import com.payoyo.agro_track.services.WorkPartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/workparts")
@RequiredArgsConstructor
public class WorkPartController {
    
    private final WorkPartService workPartService;

    // crear parte
    @PostMapping
    public ResponseEntity<WorkPartResponseDTO> create(@Valid @RequestBody WorkPartRequestDTO dto){
        WorkPartResponseDTO workPart = workPartService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(workPart);
    }

    // listar todos los partes
    @GetMapping
    public ResponseEntity<List<WorkPartResponseDTO>> findAll(){
        List<WorkPartResponseDTO> workParts = workPartService.findAll();

        return ResponseEntity
            .ok(workParts);
    }

    // listar parte por id
    @GetMapping("/id/{id}")
    public ResponseEntity<WorkPartResponseDTO> findById(@PathVariable UUID id){
        WorkPartResponseDTO workPart = workPartService.findById(id);

        return ResponseEntity
            .ok(workPart);
    }

    // actualizar parte de trabajo
    @PutMapping("/{id}")
    public ResponseEntity<WorkPartResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody WorkPartRequestDTO dto
    ){
        WorkPartResponseDTO workPart = workPartService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(workPart);
    }

    // eliminar parte de trabajo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        workPartService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // listar partes por fecha
    @GetMapping("/date/{date}")
    public ResponseEntity<List<WorkPartResponseDTO>> findByDate(@PathVariable LocalDate date){
        List<WorkPartResponseDTO> workParts = workPartService.findByDate(date);

        return ResponseEntity
            .ok(workParts);
    }

    // listar por estado
    @GetMapping("status/{status}")
    public ResponseEntity<List<WorkPartResponseDTO>> findByStatus(@PathVariable WorkPartStatus status){
        List<WorkPartResponseDTO> workParts = workPartService.findByStatus(status);

        return ResponseEntity
            .ok(workParts);
    }

    // listar por cuadrilla
    @GetMapping("crew/{crewId}")
    public ResponseEntity<List<WorkPartResponseDTO>> findByCrewId(@PathVariable UUID crewId){
        List<WorkPartResponseDTO> workParts = workPartService.findByCrewId(crewId);

        return ResponseEntity
            .ok(workParts);
    }

    // listar por campaña
    @GetMapping("campaign/{campaignId}")
    public ResponseEntity<List<WorkPartResponseDTO>> findByCampaignId(@PathVariable UUID campaignId){
        List<WorkPartResponseDTO> workParts = workPartService.findByCampaignId(campaignId);

        return ResponseEntity
            .ok(workParts);
    }
}

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

import com.payoyo.agro_track.dtos.campaign.CampaignRequestDTO;
import com.payoyo.agro_track.dtos.campaign.CampaignResponseDTO;
import com.payoyo.agro_track.services.CampaignService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {
    
    private final CampaignService campaignService;

    // crear campaña
    @PostMapping
    public ResponseEntity<CampaignResponseDTO> create(@Valid @RequestBody CampaignRequestDTO dto){
        CampaignResponseDTO campaign = campaignService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(campaign);
    }

    // listar todas las campañas
    @GetMapping
    public ResponseEntity<List<CampaignResponseDTO>> findAll(){
        List<CampaignResponseDTO> campaigns = campaignService.findAll();

        return ResponseEntity
            .ok(campaigns);
    }

    // buscar campaña por id
    @GetMapping("/id/{id}")
    public ResponseEntity<CampaignResponseDTO> findById(@PathVariable UUID id){
        CampaignResponseDTO campaign = campaignService.findById(id);

        return ResponseEntity
            .ok(campaign);
    }

    // actualizar campaña
    @PutMapping("/{id}")
    public ResponseEntity<CampaignResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody CampaignRequestDTO dto
    ){
        CampaignResponseDTO campaign = campaignService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(campaign);
    }

    // eliminar campaña
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        campaignService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar camapañas por fincas
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<CampaignResponseDTO>> findByFarmId(@PathVariable UUID farmId){
        List<CampaignResponseDTO> campaigns = campaignService.findByFarmId(farmId);

        return ResponseEntity
            .ok(campaigns);
    }

    // buscar campañas por cuadrilla
    @GetMapping("/crew/{crewId}")
    public ResponseEntity<List<CampaignResponseDTO>> findByCrewId(@PathVariable UUID crewId){
        List<CampaignResponseDTO> campaigns = campaignService.findByCrewId(crewId);

        return ResponseEntity
            .ok(campaigns);
    }

    // buscar campañas por fecha
    @GetMapping("/from/{from}/to/{to}")
    public ResponseEntity<List<CampaignResponseDTO>> findByStartDateBetween(
        @PathVariable LocalDate from, 
        @PathVariable LocalDate to
    ){
        List<CampaignResponseDTO> campaigns = campaignService.findByStartDateBetween(from, to);

        return ResponseEntity
            .ok(campaigns);
    }
}

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

import com.payoyo.agro_track.dtos.parcel.ParcelRequestDTO;
import com.payoyo.agro_track.dtos.parcel.ParcelResponseDTO;
import com.payoyo.agro_track.services.ParcelService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parcels")
@RequiredArgsConstructor
public class ParcelController {

    private final ParcelService parcelService;

    // crear parcela
    @PostMapping
    public ResponseEntity<ParcelResponseDTO> create(@Valid @RequestBody ParcelRequestDTO dto){
        ParcelResponseDTO parcel = parcelService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(parcel);
    }

    // listar todas las parcelas
    @GetMapping
    public ResponseEntity<List<ParcelResponseDTO>> findAll(){
        List<ParcelResponseDTO> parcels = parcelService.findAll();

        return ResponseEntity
            .ok(parcels);
    }

    // buscar parcela por id
    @GetMapping("/id/{id}")
    public ResponseEntity<ParcelResponseDTO> findById(@PathVariable UUID id){
        ParcelResponseDTO parcel = parcelService.findById(id);
        
        return ResponseEntity
            .ok(parcel);
    }

    // actualizar parcela
    @PutMapping("/{id}")
    public ResponseEntity<ParcelResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody ParcelRequestDTO dto
    ){
        ParcelResponseDTO parcel = parcelService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(parcel);
    }

    // eliminar parcela
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        parcelService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar por id de finca
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<ParcelResponseDTO>> findByFarmId(@PathVariable UUID farmId){
        List<ParcelResponseDTO> parcels = parcelService.findByFarmId(farmId);

        return ResponseEntity
            .ok(parcels);
    }

}

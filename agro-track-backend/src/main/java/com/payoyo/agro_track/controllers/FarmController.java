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

import com.payoyo.agro_track.dtos.farm.FarmRequestDTO;
import com.payoyo.agro_track.dtos.farm.FarmResponseDTO;
import com.payoyo.agro_track.services.FarmService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/farms")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;

    // crear finca
    @PostMapping
    public ResponseEntity<FarmResponseDTO> create(@Valid @RequestBody FarmRequestDTO dto){
        FarmResponseDTO farm = farmService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(farm);
    }

    // listar todas las fincas
    @GetMapping
    public ResponseEntity<List<FarmResponseDTO>> findAll(){
        List<FarmResponseDTO> farms = farmService.findAll();

        return ResponseEntity
            .ok(farms);
    }

    // listar finca por id
    @GetMapping("/id/{id}")
    public ResponseEntity<FarmResponseDTO> findById(@PathVariable UUID id){
        FarmResponseDTO farm = farmService.findById(id);

        return ResponseEntity
            .ok(farm);
    }

    // actualizar finca
    @PutMapping("/{id}")
    public ResponseEntity<FarmResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody FarmRequestDTO dto
    ){
        FarmResponseDTO farm = farmService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(farm);
    }

    // eliminar finca
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        farmService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar finca por nombre
    @GetMapping("/name/{name}")
    public ResponseEntity<FarmResponseDTO> findByName(@PathVariable String name){
        FarmResponseDTO farm = farmService.findByName(name);

        return ResponseEntity
            .ok(farm);
    }
}

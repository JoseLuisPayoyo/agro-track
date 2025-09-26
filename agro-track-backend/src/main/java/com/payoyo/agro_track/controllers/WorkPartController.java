package com.payoyo.agro_track.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.dtos.workPart.WorkPartRequestDTO;
import com.payoyo.agro_track.dtos.workPart.WorkPartResponseDTO;
import com.payoyo.agro_track.services.WorkPartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/workParts")
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
    // listar parte por id
    // actualizar parte de trabajo
    // eliminar parte de trabajo
    // listar partes por fecha
    // listar por estado
    // listar por cuadrilla
    // listar por campaña
}

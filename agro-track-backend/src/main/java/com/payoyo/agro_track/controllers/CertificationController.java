package com.payoyo.agro_track.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.dtos.certification.CertificationRequestDTO;
import com.payoyo.agro_track.dtos.certification.CertificationResponseDTO;
import com.payoyo.agro_track.services.CertificationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/certifications")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    // crear certificado
    @PostMapping
    public ResponseEntity<CertificationResponseDTO> create(@Valid @RequestBody CertificationRequestDTO dto){
        CertificationResponseDTO certification = certificationService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(certification);
    }

    // listar certificados
    @GetMapping
    public ResponseEntity<List<CertificationResponseDTO>> findAll(){
        List<CertificationResponseDTO> certifications = certificationService.findAll();
        
        return ResponseEntity
            .ok(certifications);
    }

    // buscar certificado por id
    @GetMapping("/id/{id}")
    public ResponseEntity<CertificationResponseDTO> findById(@PathVariable UUID id){
        CertificationResponseDTO certification = certificationService.findById(id);

        return ResponseEntity
            .ok(certification);
    }

    // actualizar certificado
    @PutMapping("/{id}")
    public ResponseEntity<CertificationResponseDTO> update(
        @PathVariable UUID id, 
        @Valid @RequestBody CertificationRequestDTO dto
    ){
        CertificationResponseDTO certification = certificationService.update(dto, id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(certification);
    }

    // eliminar certificado por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        certificationService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar certificados del empleado
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<CertificationResponseDTO>> findByEmployeeId(@PathVariable UUID employeeId){
        List<CertificationResponseDTO> certifications = certificationService.findByEmployeeId(employeeId);
        
        return ResponseEntity
            .ok(certifications);
    }

    // devolver certificados con fecha de expiracion anterior a la introducida
    @GetMapping("/expiresAt/{expiresAt}")
    public ResponseEntity<List<CertificationResponseDTO>> findByExpiresAtBefore(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate expiresAt
    ){
        List<CertificationResponseDTO> certifications = certificationService.findByExpiresAtBefore(expiresAt);

        return ResponseEntity
            .ok(certifications);
    }
    
}

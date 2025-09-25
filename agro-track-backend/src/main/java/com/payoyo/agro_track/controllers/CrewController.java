package com.payoyo.agro_track.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.services.CrewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {
    
    private final CrewService crewService;

    // crear cuadrilla
    // buscar cuadrilla por id
    // devolvemos todas las cuadrillas
    //actualizamos cuadrilla
    // eliminar cuadrilla

    // buscar cuadrilla por nombre
    // buscar cuadrilla por encargado




}

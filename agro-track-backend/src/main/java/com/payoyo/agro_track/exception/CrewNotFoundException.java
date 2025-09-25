package com.payoyo.agro_track.exception;

import java.util.UUID;

public class CrewNotFoundException extends RuntimeException{

    public CrewNotFoundException(UUID id){
        super("Cuadrilla no encontrado con id: " + id);
    }
}

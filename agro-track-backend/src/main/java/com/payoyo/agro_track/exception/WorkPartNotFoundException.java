package com.payoyo.agro_track.exception;

import java.util.UUID;

public class WorkPartNotFoundException extends RuntimeException{

    public WorkPartNotFoundException(UUID id){
        super("Parte de trabajo no encontrado con id: " + id);
    }
}

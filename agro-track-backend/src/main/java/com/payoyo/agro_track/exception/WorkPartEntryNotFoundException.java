package com.payoyo.agro_track.exception;

import java.util.UUID;

public class WorkPartEntryNotFoundException extends RuntimeException{

    public WorkPartEntryNotFoundException(UUID id){
        super("Parte de ntrada de trabajo no encontrado con id: " + id);
    }
}

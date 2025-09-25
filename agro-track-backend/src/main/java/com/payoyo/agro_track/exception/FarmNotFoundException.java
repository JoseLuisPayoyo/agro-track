package com.payoyo.agro_track.exception;

import java.util.UUID;

public class FarmNotFoundException extends RuntimeException{

    public FarmNotFoundException(UUID id){
        super("Finca no encontrado con id: " + id);
    }
}

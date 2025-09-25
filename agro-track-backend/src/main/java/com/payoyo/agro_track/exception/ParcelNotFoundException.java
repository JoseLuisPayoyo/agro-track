package com.payoyo.agro_track.exception;

import java.util.UUID;

public class ParcelNotFoundException extends RuntimeException{

    public ParcelNotFoundException(UUID id){
        super("Parcela no encontrada con id: " + id);
    }
}

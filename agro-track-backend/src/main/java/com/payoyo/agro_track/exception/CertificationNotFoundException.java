package com.payoyo.agro_track.exception;

import java.util.UUID;

public class CertificationNotFoundException extends RuntimeException{

    public CertificationNotFoundException(UUID id){
        super("Certificado no encontrado con id: " + id);
    }
}

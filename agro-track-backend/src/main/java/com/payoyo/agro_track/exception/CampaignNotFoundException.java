package com.payoyo.agro_track.exception;

import java.util.UUID;

public class CampaignNotFoundException extends RuntimeException{

    public CampaignNotFoundException(UUID id){
        super("Campaña no encontrada con id: " + id);
    }
}

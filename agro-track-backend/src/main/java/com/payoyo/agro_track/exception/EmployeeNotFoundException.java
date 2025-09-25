package com.payoyo.agro_track.exception;

import java.util.UUID;

public class EmployeeNotFoundException extends RuntimeException{

    public EmployeeNotFoundException(UUID id){
        super("Empleado no encontrado con id: " + id);
    }
}

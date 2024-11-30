package com.jaden_detalles.jaden.exceptions;

public class ProductAlreadyExistsException extends RuntimeException {
    public ProductAlreadyExistsException(String message){
        super(message);
    }
}

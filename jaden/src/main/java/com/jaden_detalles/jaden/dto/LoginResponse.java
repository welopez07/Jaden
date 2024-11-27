package com.jaden_detalles.jaden.dto;

import java.util.List;

public class LoginResponse {
    private String token;

    private List<String> roles;

    public LoginResponse(String token, List<String> roles) {
        this.token = token;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}

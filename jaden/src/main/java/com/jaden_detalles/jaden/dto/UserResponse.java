package com.jaden_detalles.jaden.dto;

public class UserResponse {

    private Long id;
    private String name;
    private String address;
    private String email;
    private String role;

    public UserResponse(Long id, String name, String address, String email, String role) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

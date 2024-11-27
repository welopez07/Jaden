package com.jaden_detalles.jaden.dto;

import com.jaden_detalles.jaden.model.RoleType;

public class RoleChangeRequest {
    private Long userId;
    private RoleType newRoleType;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public RoleType getNewRoleType() {
        return newRoleType;
    }

    public void setNewRoleType(RoleType newRoleType) {
        this.newRoleType = newRoleType;
    }
}

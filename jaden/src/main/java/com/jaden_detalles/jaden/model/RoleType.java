package com.jaden_detalles.jaden.model;

public enum RoleType {

    ADMIN(3),
    EMPLOYEE(2),
    CLIENT(1);

    private final int level;

    RoleType(int level) {
        this.level = level;
    }

    public boolean canUpgradeTo(RoleType targetRole) {
        return this.level < targetRole.level;
    }

}





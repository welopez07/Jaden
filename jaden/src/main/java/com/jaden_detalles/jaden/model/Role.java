package com.jaden_detalles.jaden.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
/**
 * Clase que representa un rol dentro de la plataforma.
 * Un rol define los permisos de un usuario (por ejemplo, ADMIN, EMPLOYEE, CLIENT).
 */
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * Tipo de rol (ADMIN, EMPLOYEE, CLIENT) definido en el enum RoleType.
     */
    @Enumerated(EnumType.STRING)//Almacena el valor del enum como texto en la base de datos.
    @Column(unique = true)
    private RoleType roleType;
    private String description;

    private Integer hierarchyLevel;
    /**
     * Relación uno a muchos con la entidad User.
     * Un rol puede estar asociado con múltiples usuarios.
     */
    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private List<User> users;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleType getRoleType() {
        return roleType;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getHierarchyLevel() {
        return hierarchyLevel;
    }

    public void setHierarchyLevel(Integer hierarchyLevel) {
        this.hierarchyLevel = hierarchyLevel;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}

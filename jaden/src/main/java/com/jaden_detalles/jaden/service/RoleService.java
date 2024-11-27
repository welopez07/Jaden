package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.RoleType;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    private final IRoleRepository iRoleRepository;

    @Autowired
    public RoleService(IRoleRepository roleRepository) {
        this.iRoleRepository = roleRepository;
    }

    // Crear nuevo Role
    public Role createRole(Role role) {
        return iRoleRepository.save(role);
    }

    // Obtener un Role por ID
    public Role findRoleByType(RoleType type) {
        return iRoleRepository.findByRoleType(type)
                .orElseThrow(() -> new RuntimeException("Role not found: " + type));
    }

    // Obtener todos los Roles
    public List<Role> getAllRoles() {
        return iRoleRepository.findAll();
    }

    // Obtener Role por ID
    public Role getRoleById(Integer id) {
        return iRoleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + id));
    }



    // Eliminar un Role por ID
    public void deleteRole(Integer id) {
        Role role = getRoleById(id);
        iRoleRepository.delete(role);
    }
}

package com.jaden_detalles.jaden.controller;

import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private IRoleRepository iRoleRepository;

    // Crear un nuevo rol
    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role newRole = iRoleRepository.save(role);
        return new ResponseEntity<>(newRole, HttpStatus.CREATED);
    }

    // Obtener todos los roles
    @GetMapping("/all")
    public List<Role> getAllRoles() {
        return iRoleRepository.findAll();
    }

    // Obtener un rol por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable int id) {
        Optional<Role> role = iRoleRepository.findById(id);
        return role.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar un rol
    @PutMapping("/update/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable int id, @RequestBody Role updatedRole) {
        Optional<Role> roleOptional = iRoleRepository.findById(id);
        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();
            role.setRoleType(updatedRole.getRoleType());
            role.setDescription(updatedRole.getDescription());
            return new ResponseEntity<>(iRoleRepository.save(role), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un rol
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable int id) {
        Optional<Role> role = iRoleRepository.findById(id);
        if (role.isPresent()) {
            iRoleRepository.delete(role.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}

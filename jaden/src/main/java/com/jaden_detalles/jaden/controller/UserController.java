package com.jaden_detalles.jaden.controller;

import com.jaden_detalles.jaden.dto.UserRequest;
import com.jaden_detalles.jaden.dto.UserResponse;
import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import com.jaden_detalles.jaden.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private IRoleRepository iRoleRepository;

    // Crear un nuevo usuario

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest) {
        try {
            User createdUser = userService.createUser(userRequest); // Solo pasamos userRequest
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Error al registrar el usuario" + e.getMessage()));
        }
    }

    //Obtener todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> userResponses = userService.getAllUsers();

        return new ResponseEntity<>(userResponses, HttpStatus.OK);
    }

    //Obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //Actualizar un usuario
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        User updatedUser = userService.updateUser(id, userRequest);
        return ResponseEntity.ok(updatedUser);
    }

    //Eliminar un usuario
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.dto.UserRequest;
import com.jaden_detalles.jaden.dto.UserResponse;
import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.RoleType;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    private RoleService roleService;
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IRoleRepository iRoleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Transactional
    public User updateUserRole(Long userId, RoleType newRoleType) {
        User user = iUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Role currentRole = user.getRole();
        Role newRole = iRoleRepository.findByRoleType(newRoleType)
                .orElseThrow(() -> new RuntimeException("Role not found: " + newRoleType));

        // Validar cambio de rol (simplificado)
        if (!isRoleChangeAllowed(currentRole.getRoleType(), newRoleType)) {
            throw new RuntimeException("Role change not allowed");
        }

        user.setRole(newRole);
        return iUserRepository.save(user);
    }

    private boolean isRoleChangeAllowed(RoleType currentRole, RoleType newRole) {
        // Reglas básicas de cambio de roles
        switch (currentRole) {
            case CLIENT:
                // Un cliente puede ascender a empleado o admin
                return newRole == RoleType.EMPLOYEE || newRole == RoleType.ADMIN;

            case EMPLOYEE:
                // Un empleado puede ascender a admin
                return newRole == RoleType.ADMIN;

            case ADMIN:
                // Un admin puede bajar a empleado o cliente
                return newRole == RoleType.EMPLOYEE || newRole == RoleType.CLIENT;

            default:
                // Si hay algún rol no definido, no permitir cambios
                return false;
        }
    }



    //Crear un nuevo usuario
    public User createUser(UserRequest userRequest) {

        // Validar que no exista ya un usuario con ese username o email
        if (iUserRepository.existsByUsername(userRequest.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        if (iUserRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Buscar el rol
        Role role = iRoleRepository.findByRoleType(userRequest.getRoleType())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + userRequest.getRoleType()));


        // Crear una nueva instancia de User
        User user = new User();
        user.setName(userRequest.getName());
        user.setAddress(userRequest.getAddress());
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setBirthdayDate(userRequest.getBirthdayDate());
        user.setRole(role);


        // Guardar el nuevo usuario en la base de datos
        return iUserRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        return iUserRepository.findAll().stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getAddress(),
                        user.getEmail(),
                        user.getRole().getRoleType().name() // Convertir el enum RoleType a su representación en texto
                ))
                .collect(Collectors.toList());
    }

    // Obtener un usuario por su ID
    public User getUserById(Long id) {
        return iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    //Actualizar un usuario
    public User updateUser(Long id, UserRequest updateUserRequest) {
        User user = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        user.setName(updateUserRequest.getName());
        user.setAddress(updateUserRequest.getAddress());
        user.setEmail(updateUserRequest.getEmail());

        if (updateUserRequest.getPassword() != null && !updateUserRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
        }

        user.setBirthdayDate(updateUserRequest.getBirthdayDate());

        Role role = iRoleRepository.findByRoleType(updateUserRequest.getRoleType())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        user.setRole(role);

        return iUserRepository.save(user);
    }

    //Eliminar un usuario
    public void deleteUser(Long id) {
        User user = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        iUserRepository.delete(user);
    }

}

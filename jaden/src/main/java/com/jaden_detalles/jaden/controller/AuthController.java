package com.jaden_detalles.jaden.controller;

import com.jaden_detalles.jaden.dto.LoginRequest;
import com.jaden_detalles.jaden.dto.LoginResponse;
import com.jaden_detalles.jaden.dto.UserRequest;
import com.jaden_detalles.jaden.model.RoleType;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.security.JwtUtil;
import com.jaden_detalles.jaden.service.AuthService;
import com.jaden_detalles.jaden.service.UserService;
import io.jsonwebtoken.Claims;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            List<String> roles = authService.getRolesFromToken(token);
            LoginResponse response = new LoginResponse(token, roles);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error durante la autenticación");
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody UserRequest userRequest) {
        if (!authService.isCurrentUserAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Solo un administrador puede crear nuevos administradores");
        }

        userRequest.setRoleType(RoleType.ADMIN);
        User newAdmin = userService.createUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
    }


}

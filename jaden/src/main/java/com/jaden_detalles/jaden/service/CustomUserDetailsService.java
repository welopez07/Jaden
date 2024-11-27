package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        System.out.println("Email buscado: " + email);
        System.out.println("Contraseña codificada en BD: " + user.getPassword());

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        if (user.getRole() != null) {
            // Agregar rol principal
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleType().name()));

            // Agregar roles adicionales según sea necesario
            switch (user.getRole().getRoleType()) {
                case ADMIN:
                    authorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
                    authorities.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
                    break;
                case EMPLOYEE:
                    authorities.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
                    break;
                case CLIENT:
                    // Solo rol de cliente
                    break;
            }
        } else {
            // Por defecto, rol de cliente si no tiene rol asignado
            authorities.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
}


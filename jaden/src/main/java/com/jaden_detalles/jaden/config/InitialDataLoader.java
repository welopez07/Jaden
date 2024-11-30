package com.jaden_detalles.jaden.config;

import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.RoleType;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class InitialDataLoader implements CommandLineRunner {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("welopez07@gmail.com").isEmpty()) {

            Role adminRole = roleRepository.findByRoleType(RoleType.ADMIN)
                    .orElseThrow(() -> new RuntimeException("El rol ADMIN no está definido en la base de datos."));

            User admin = new User();
            admin.setEmail("welopez07@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(adminRole);

            admin.setName("Wilson Lopez");
            admin.setAddress("Cr 21 # 3-45 las 60 casas");
            admin.setBirthdayDate(LocalDate.of(1984, 8, 7));

            userRepository.save(admin);
            System.out.println("Administrador inicial creado.");
        } else {
            System.out.println("El administrador inicial ya existe.");
        }
    }




}

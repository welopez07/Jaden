package com.jaden_detalles.jaden.repository;

import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleType(RoleType roleType);


}

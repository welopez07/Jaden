package com.jaden_detalles.jaden.repository;

import com.jaden_detalles.jaden.model.Product;
import com.jaden_detalles.jaden.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
}

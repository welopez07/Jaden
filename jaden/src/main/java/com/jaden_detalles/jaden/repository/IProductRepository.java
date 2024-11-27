package com.jaden_detalles.jaden.repository;

import com.jaden_detalles.jaden.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Long> {
}

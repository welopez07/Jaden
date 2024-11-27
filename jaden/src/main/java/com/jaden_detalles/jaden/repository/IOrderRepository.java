package com.jaden_detalles.jaden.repository;

import com.jaden_detalles.jaden.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order, Integer > {
}

package com.jaden_detalles.jaden.repository;

import com.jaden_detalles.jaden.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}

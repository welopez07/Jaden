package com.jaden_detalles.jaden.dto;

import com.jaden_detalles.jaden.model.OrderStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class OrderDTO {
    @NotNull(message = "La fecha del pedido no puede ser nula")
    private LocalDate orderDate;
    @NotNull(message = "El estado del pedido es obligatorio")
    private OrderStatus status;
    @NotNull(message = "El total no puede ser nulo")
    @PositiveOrZero(message = "El total debe ser un valor positivo o cero")
    private BigDecimal total;
    @NotNull(message = "El ID de usuario es obligatorio")
    private Long userId; // ID del usuario que realiza el pedido
    @NotNull(message = "Los detalles del pedido no pueden estar vacíos")
    @Size(min = 1, message = "Debe haber al menos un detalle de pedido")
    private List<OrderDetailDTO> orderDetails;

    public OrderDTO() {
    }

    public OrderDTO(LocalDate orderDate, OrderStatus status, BigDecimal total, Long userId, List<OrderDetailDTO> orderDetails) {
        this.orderDate = orderDate;
        this.status = status;
        this.total = total;
        this.userId = userId;
        this.orderDetails = orderDetails;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderDetailDTO> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailDTO> orderDetails) {
        this.orderDetails = orderDetails;
    }
}

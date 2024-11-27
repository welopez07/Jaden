package com.jaden_detalles.jaden.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
/**
 * Clase que representa un pedido realizado por un usuario en la plataforma.
 * Un pedido puede contener varios detalles de pedido y un pago asociado.
 */
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate orderDate;
    /**
     * Estado actual del pedido (por ejemplo, 'Pendiente', 'Procesado', 'Enviado').
     */
    private OrderStatus Status;
    private BigDecimal total;
    /**
     * Relación muchos a uno con la entidad User.
     * Un usuario puede realizar múltiples pedidos.
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    /**
     * Relación uno a uno con la entidad Payment.
     * Un pedido puede tener un único pago.
     */
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;
    /**
     * Relación uno a muchos con la entidad OrderDetail.
     * Un pedido puede tener múltiples detalles de pedido.
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatus getStatus() {
        return Status;
    }

    public void setStatus(OrderStatus status) {
        Status = status;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}

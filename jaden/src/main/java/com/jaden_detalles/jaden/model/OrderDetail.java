package com.jaden_detalles.jaden.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Clase que representa un detalle de pedido dentro de la plataforma.
 * Un detalle de pedido contiene información sobre un producto específico dentro de un pedido.
 */
@Entity
@Table(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;

    private BigDecimal totalPrice;
    /**
     * Relación muchos a uno con la entidad Order.
     * Un pedido puede tener múltiples detalles de pedido.
     */
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}

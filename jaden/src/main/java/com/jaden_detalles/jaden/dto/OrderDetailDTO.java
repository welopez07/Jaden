package com.jaden_detalles.jaden.dto;

import java.math.BigDecimal;

public class OrderDetailDTO {
    private Long productId;
    private Integer quantity;
    private BigDecimal totalPrice;

    public OrderDetailDTO() {
    }

    public OrderDetailDTO(Long productId, Integer quantity, BigDecimal totalPrice) {
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
}

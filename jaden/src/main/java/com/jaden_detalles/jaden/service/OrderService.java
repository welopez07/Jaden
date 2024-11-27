package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.dto.OrderDTO;
import com.jaden_detalles.jaden.model.Order;
import com.jaden_detalles.jaden.model.OrderDetail;
import com.jaden_detalles.jaden.model.Product;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IOrderDetailRepository;
import com.jaden_detalles.jaden.repository.IOrderRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Autowired
    private IUserRepository userRepository;

    public Order createOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate());
        order.setStatus(orderDTO.getStatus());
        order.setTotal(orderDTO.getTotal());
        order.setUser(user);

        List<OrderDetail> details = orderDTO.getOrderDetails().stream().map(detailDTO -> {
            OrderDetail detail = new OrderDetail();
            detail.setQuantity(detailDTO.getQuantity());
            detail.setTotalPrice(detailDTO.getTotalPrice());
            detail.setProduct(new Product(detailDTO.getProductId())); // Placeholder
            detail.setOrder(order);
            return detail;
        }).toList();

        order.setOrderDetails(details);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }


}

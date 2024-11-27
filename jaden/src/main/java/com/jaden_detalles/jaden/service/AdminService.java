package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.model.Order;
import com.jaden_detalles.jaden.model.Product;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IOrderRepository;
import com.jaden_detalles.jaden.repository.IProductRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AdminService {

    private final IUserRepository userRepository;
    private final IProductRepository productRepository;
    private final IOrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(IUserRepository userRepository, IProductRepository productRepository, IOrderRepository orderRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Métodos para gestionar usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        existingUser.setEmail(user.getEmail());
        if (user.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        existingUser.setName(user.getName());

        return userRepository.save(existingUser);
    }


    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    // Métodos para gestionar productos
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());


        return productRepository.save(existingProduct);
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    // Métodos para gestionar pedidos
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public Order updateOrder(Integer id, Order order) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));

        existingOrder.setStatus(order.getStatus());

        return orderRepository.save(existingOrder);
    }
    public void deleteOrderById(int id) {
        orderRepository.deleteById(id);
    }

}

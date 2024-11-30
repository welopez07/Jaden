package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.dto.*;
import com.jaden_detalles.jaden.exceptions.ProductAlreadyExistsException;
import com.jaden_detalles.jaden.exceptions.UserAlreadyExistsException;
import com.jaden_detalles.jaden.model.Order;
import com.jaden_detalles.jaden.model.OrderDetail;
import com.jaden_detalles.jaden.model.Product;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.repository.IOrderRepository;
import com.jaden_detalles.jaden.repository.IProductRepository;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final IUserRepository userRepository;
    private final IProductRepository productRepository;
    private final IOrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;
    private final IRoleRepository roleRepository;

    public AdminService(IUserRepository userRepository, IProductRepository productRepository, IOrderRepository orderRepository, PasswordEncoder passwordEncoder, IRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;

    }

    // Métodos para gestionar usuarios
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().
                map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getAddress(),
                        user.getEmail(),
                        user.getRole().toString()
                ))
                .collect(Collectors.toList());
    }
    public UserResponse createUser(UserRequest userRequest) {
        // Validar si el usuario ya existe
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("El email ya está registrado");
        }
        // Buscar el rol correspondiente
        Role role = roleRepository.findByRoleType(userRequest.getRoleType())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado"));

        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setAddress(userRequest.getAddress());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getAddress(),
                savedUser.getEmail(),
                savedUser.getRole().getRoleType().toString()
        );
    }
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        existingUser.setName(userRequest.getName());
        existingUser.setAddress(userRequest.getAddress());

        if (userRequest.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        User updatedUser = userRepository.save(existingUser);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getAddress(),
                updatedUser.getEmail(),
                updatedUser.getRole().toString()
        );
    }
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        userRepository.delete(user);
    }

    // Métodos para gestionar productos
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> new ProductDTO(
                        product.getName(),
                        product.getDescription(),
                        product.getPrice()
                ))
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        // Verificar si el producto ya existe (opcional)
        if (productRepository.findByName(productDTO.getName()).isPresent()) {
            throw new ProductAlreadyExistsException("Ya existe un producto con este nombre");
        }

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());

        Product savedProduct = productRepository.save(product);

        return new ProductDTO(
                savedProduct.getName(),
                savedProduct.getDescription(),
                savedProduct.getPrice()
        );
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        existingProduct.setName(productDTO.getName());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setPrice(productDTO.getPrice());

        Product updatedProduct = productRepository.save(existingProduct);

        return new ProductDTO(
                updatedProduct.getName(),
                updatedProduct.getDescription(),
                updatedProduct.getPrice()
        );
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        productRepository.delete(product);
    }

    // Métodos para gestionar pedidos
    public OrderDTO createOrder(OrderDTO orderDTO) {
        // Verificar si el usuario existe
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate());
        order.setStatus(orderDTO.getStatus());
        order.setTotal(orderDTO.getTotal());
        order.setUser(user);

        // Convertir y guardar OrderDetailDTO a OrderDetail
        List<OrderDetail> orderDetails = orderDTO.getOrderDetails().stream()
                .map(detailDTO -> {
                    OrderDetail detail = new OrderDetail();
                    // Mapear propiedades de detailDTO a detail
                    return detail;
                })
                .collect(Collectors.toList());

        order.setOrderDetails(orderDetails);

        Order savedOrder = orderRepository.save(order);

        return convertToOrderDTO(savedOrder);
    }

    public OrderDTO updateOrder(Integer id, OrderDTO orderDTO) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));

        existingOrder.setStatus(orderDTO.getStatus());
        existingOrder.setTotal(orderDTO.getTotal());

        // Actualizar detalles del pedido si es necesario
        // Esto dependerá de tu lógica de negocio específica

        Order updatedOrder = orderRepository.save(existingOrder);

        return convertToOrderDTO(updatedOrder);
    }

    public void deleteOrder(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));

        orderRepository.delete(order);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }

    // Método de conversión auxiliar
    private OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotal(order.getTotal());
        orderDTO.setUserId(order.getUser().getId());

        // Convertir OrderDetail a OrderDetailDTO
        List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream()
                .map(detail -> {
                    OrderDetailDTO detailDTO = new OrderDetailDTO();
                    // Mapear propiedades de detail a detailDTO
                    return detailDTO;
                })
                .collect(Collectors.toList());

        orderDTO.setOrderDetails(detailDTOs);

        return orderDTO;
    }

}

package com.avyaya.service;

import com.avyaya.dto.OrderResponse;
import com.avyaya.model.*;
import com.avyaya.repository.CartRepository;
import com.avyaya.repository.OrderItemRepository;
import com.avyaya.repository.OrderRepository;
import com.avyaya.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    /**
     * Create order from cart items
     * @param userId the user ID
     * @param razorpayOrderId the Razorpay order ID
     * @return OrderResponse of the created order
     */
    @Transactional
    public OrderResponse createOrderFromCart(Long userId, String razorpayOrderId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<Cart> cartItems = cartRepository.findByUser(user);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Calculate total price
        BigDecimal totalPrice = cartItems.stream()
            .map(cart -> cart.getProduct().getPrice().multiply(new BigDecimal(cart.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);
        order.setRazorpayOrderId(razorpayOrderId);
        
        Order savedOrder = orderRepository.save(order);
        
        // Create order items from cart items
        for (Cart cartItem : cartItems) {
            Product product = cartItem.getProduct();
            
            // Check stock availability
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            
            orderItemRepository.save(orderItem);
            
            // Update product stock
            product.setStock(product.getStock() - cartItem.getQuantity());
        }
        
        // Clear cart after creating order
        cartRepository.deleteByUser(user);
        
        return convertToResponse(savedOrder);
    }
    
    /**
     * Get all orders for a user
     * @param userId the user ID
     * @return List of user's orders
     */
    public List<OrderResponse> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Get order by ID
     * @param orderId the order ID
     * @param userId the user ID (for authorization)
     * @return OrderResponse
     */
    public OrderResponse getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        // Verify the order belongs to the user
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return convertToResponse(order);
    }
    
    /**
     * Update order status (Admin only)
     * @param orderId the order ID
     * @param status the new status
     * @return OrderResponse of the updated order
     */
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        
        return convertToResponse(updatedOrder);
    }
    
    /**
     * Update order with payment details
     * @param razorpayOrderId the Razorpay order ID
     * @param razorpayPaymentId the Razorpay payment ID
     * @return OrderResponse of the updated order
     */
    @Transactional
    public OrderResponse updateOrderPayment(String razorpayOrderId, String razorpayPaymentId) {
        Order order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
            .orElseThrow(() -> new RuntimeException("Order not found with Razorpay ID: " + razorpayOrderId));
        
        order.setRazorpayPaymentId(razorpayPaymentId);
        order.setStatus(OrderStatus.CONFIRMED);
        
        Order updatedOrder = orderRepository.save(order);
        return convertToResponse(updatedOrder);
    }
    
    /**
     * Get all orders (Admin only)
     * @return List of all orders
     */
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Convert Order entity to OrderResponse DTO
     * @param order the Order entity
     * @return OrderResponse DTO
     */
    private OrderResponse convertToResponse(Order order) {
        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
        
        List<OrderResponse.OrderItemResponse> orderItemResponses = orderItems.stream()
            .map(item -> {
                BigDecimal totalPrice = item.getPrice().multiply(new BigDecimal(item.getQuantity()));
                return new OrderResponse.OrderItemResponse(
                    item.getId(),
                    item.getProduct().getName(),
                    item.getPrice(),
                    item.getQuantity(),
                    totalPrice
                );
            })
            .collect(Collectors.toList());
        
        return new OrderResponse(
            order.getId(),
            order.getTotalPrice(),
            order.getStatus(),
            order.getCreatedAt(),
            orderItemResponses
        );
    }
}
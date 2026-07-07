package com.avyaya.dto;

import com.avyaya.model.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    
    private Long id;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> orderItems;
    
    // Default constructor
    public OrderResponse() {}
    
    // Constructor
    public OrderResponse(Long id, BigDecimal totalPrice, OrderStatus status, 
                        LocalDateTime createdAt, List<OrderItemResponse> orderItems) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdAt = createdAt;
        this.orderItems = orderItems;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public OrderStatus getStatus() {
        return status;
    }
    
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public List<OrderItemResponse> getOrderItems() {
        return orderItems;
    }
    
    public void setOrderItems(List<OrderItemResponse> orderItems) {
        this.orderItems = orderItems;
    }
    
    // Nested class for order items
    public static class OrderItemResponse {
        private Long id;
        private String productName;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal totalPrice;
        
        // Default constructor
        public OrderItemResponse() {}
        
        // Constructor
        public OrderItemResponse(Long id, String productName, BigDecimal price, 
                               Integer quantity, BigDecimal totalPrice) {
            this.id = id;
            this.productName = productName;
            this.price = price;
            this.quantity = quantity;
            this.totalPrice = totalPrice;
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getProductName() {
            return productName;
        }
        
        public void setProductName(String productName) {
            this.productName = productName;
        }
        
        public BigDecimal getPrice() {
            return price;
        }
        
        public void setPrice(BigDecimal price) {
            this.price = price;
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
}
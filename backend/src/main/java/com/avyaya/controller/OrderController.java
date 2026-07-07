package com.avyaya.controller;

import com.avyaya.dto.OrderResponse;
import com.avyaya.model.OrderStatus;
import com.avyaya.security.UserPrincipal;
import com.avyaya.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    /**
     * Get all orders for the current user
     * @param userPrincipal the authenticated user
     * @return List of user's orders
     */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<OrderResponse> orders = orderService.getUserOrders(userPrincipal.getId());
        return ResponseEntity.ok(orders);
    }
    
    /**
     * Get order by ID
     * @param orderId the order ID
     * @param userPrincipal the authenticated user
     * @return OrderResponse
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId, 
                                         @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            OrderResponse order = orderService.getOrderById(orderId, userPrincipal.getId());
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Get all orders (Admin only)
     * @return List of all orders
     */
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    /**
     * Update order status (Admin only)
     * @param orderId the order ID
     * @param status the new status
     * @return OrderResponse of the updated order
     */
    @PutMapping("/admin/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, 
                                              @RequestParam OrderStatus status) {
        try {
            OrderResponse order = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    // Response classes
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
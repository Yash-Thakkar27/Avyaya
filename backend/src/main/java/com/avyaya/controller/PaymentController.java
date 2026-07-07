package com.avyaya.controller;

import com.avyaya.dto.OrderResponse;
import com.avyaya.dto.PaymentRequest;
import com.avyaya.dto.PaymentVerificationRequest;
import com.avyaya.security.UserPrincipal;
import com.avyaya.service.CartService;
import com.avyaya.service.OrderService;
import com.avyaya.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CartService cartService;
    
    /**
     * Create Razorpay order for payment
     * @param userPrincipal the authenticated user
     * @return Map containing order details
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            // Get cart total for payment amount
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setAmount(cartService.getCartTotal(userPrincipal.getId()));
            paymentRequest.setCurrency("INR");
            
            if (paymentRequest.getAmount().compareTo(java.math.BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Cart is empty or invalid amount"));
            }
            
            Map<String, String> orderDetails = paymentService.createOrder(paymentRequest);
            return ResponseEntity.ok(orderDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to create order: " + e.getMessage()));
        }
    }
    
    /**
     * Verify Razorpay payment and create order
     * @param userPrincipal the authenticated user
     * @param verificationRequest payment verification details
     * @return OrderResponse of the created order
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @Valid @RequestBody PaymentVerificationRequest verificationRequest) {
        try {
            // Verify payment signature
            boolean isValidSignature = paymentService.verifyPaymentSignature(
                verificationRequest.getOrderId(),
                verificationRequest.getPaymentId(),
                verificationRequest.getSignature()
            );
            
            if (!isValidSignature) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Invalid payment signature"));
            }
            
            // Create order from cart
            OrderResponse order = orderService.createOrderFromCart(
                userPrincipal.getId(), 
                verificationRequest.getOrderId()
            );
            
            // Update order with payment details
            OrderResponse updatedOrder = orderService.updateOrderPayment(
                verificationRequest.getOrderId(),
                verificationRequest.getPaymentId()
            );
            
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Payment verification failed: " + e.getMessage()));
        }
    }
    
    /**
     * Get payment details by payment ID
     * @param paymentId the Razorpay payment ID
     * @return Map containing payment details
     */
    @GetMapping("/details/{paymentId}")
    public ResponseEntity<?> getPaymentDetails(@PathVariable String paymentId) {
        try {
            Map<String, Object> paymentDetails = paymentService.getPaymentDetails(paymentId);
            return ResponseEntity.ok(paymentDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to fetch payment details: " + e.getMessage()));
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
    
    public static class SuccessResponse {
        private String message;
        
        public SuccessResponse(String message) {
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
package com.avyaya.controller;

import com.avyaya.dto.CartRequest;
import com.avyaya.dto.CartResponse;
import com.avyaya.security.UserPrincipal;
import com.avyaya.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    /**
     * Get all cart items for the current user
     * @param userPrincipal the authenticated user
     * @return List of cart items
     */
    @GetMapping
    public ResponseEntity<List<CartResponse>> getCartItems(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<CartResponse> cartItems = cartService.getCartItems(userPrincipal.getId());
        return ResponseEntity.ok(cartItems);
    }
    
    /**
     * Add item to cart
     * @param userPrincipal the authenticated user
     * @param cartRequest the cart item details
     * @return CartResponse of the added/updated item
     */
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserPrincipal userPrincipal, 
                                      @Valid @RequestBody CartRequest cartRequest) {
        try {
            CartResponse cartItem = cartService.addToCart(userPrincipal.getId(), cartRequest);
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Update cart item quantity
     * @param userPrincipal the authenticated user
     * @param cartId the cart item ID
     * @param quantity the new quantity
     * @return CartResponse of the updated item
     */
    @PutMapping("/{cartId}")
    public ResponseEntity<?> updateCartItem(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                           @PathVariable Long cartId, 
                                           @RequestParam Integer quantity) {
        try {
            CartResponse cartItem = cartService.updateCartItem(userPrincipal.getId(), cartId, quantity);
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Remove item from cart
     * @param userPrincipal the authenticated user
     * @param cartId the cart item ID
     * @return Success message
     */
    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> removeFromCart(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @PathVariable Long cartId) {
        try {
            cartService.removeFromCart(userPrincipal.getId(), cartId);
            return ResponseEntity.ok(new SuccessResponse("Item removed from cart successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Clear all items from cart
     * @param userPrincipal the authenticated user
     * @return Success message
     */
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            cartService.clearCart(userPrincipal.getId());
            return ResponseEntity.ok(new SuccessResponse("Cart cleared successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Get total cart value
     * @param userPrincipal the authenticated user
     * @return BigDecimal total value
     */
    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getCartTotal(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        BigDecimal total = cartService.getCartTotal(userPrincipal.getId());
        return ResponseEntity.ok(total);
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
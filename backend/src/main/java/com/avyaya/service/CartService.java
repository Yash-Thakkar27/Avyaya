package com.avyaya.service;

import com.avyaya.dto.CartRequest;
import com.avyaya.dto.CartResponse;
import com.avyaya.model.Cart;
import com.avyaya.model.Product;
import com.avyaya.model.User;
import com.avyaya.repository.CartRepository;
import com.avyaya.repository.ProductRepository;
import com.avyaya.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Get all cart items for a user
     * @param userId the user ID
     * @return List of cart items
     */
    public List<CartResponse> getCartItems(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        return cartRepository.findByUser(user).stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Add item to cart
     * @param userId the user ID
     * @param cartRequest the cart item details
     * @return CartResponse of the added/updated item
     */
    public CartResponse addToCart(Long userId, CartRequest cartRequest) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Product product = productRepository.findById(cartRequest.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + cartRequest.getProductId()));
        
        // Check if product has enough stock
        if (product.getStock() < cartRequest.getQuantity()) {
            throw new RuntimeException("Insufficient stock. Available: " + product.getStock());
        }
        
        // Check if item already exists in cart
        Optional<Cart> existingCartItem = cartRepository.findByUserAndProduct(user, product);
        
        Cart cartItem;
        if (existingCartItem.isPresent()) {
            // Update existing cart item
            cartItem = existingCartItem.get();
            int newQuantity = cartItem.getQuantity() + cartRequest.getQuantity();
            
            if (product.getStock() < newQuantity) {
                throw new RuntimeException("Insufficient stock. Available: " + product.getStock());
            }
            
            cartItem.setQuantity(newQuantity);
        } else {
            // Create new cart item
            cartItem = new Cart(user, product, cartRequest.getQuantity());
        }
        
        Cart savedCartItem = cartRepository.save(cartItem);
        return convertToResponse(savedCartItem);
    }
    
    /**
     * Update cart item quantity
     * @param userId the user ID
     * @param cartId the cart item ID
     * @param quantity the new quantity
     * @return CartResponse of the updated item
     */
    public CartResponse updateCartItem(Long userId, Long cartId, Integer quantity) {
        Cart cartItem = cartRepository.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + cartId));
        
        // Verify the cart item belongs to the user
        if (!cartItem.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to cart item");
        }
        
        // Check if product has enough stock
        if (cartItem.getProduct().getStock() < quantity) {
            throw new RuntimeException("Insufficient stock. Available: " + cartItem.getProduct().getStock());
        }
        
        cartItem.setQuantity(quantity);
        Cart updatedCartItem = cartRepository.save(cartItem);
        return convertToResponse(updatedCartItem);
    }
    
    /**
     * Remove item from cart
     * @param userId the user ID
     * @param cartId the cart item ID
     */
    public void removeFromCart(Long userId, Long cartId) {
        Cart cartItem = cartRepository.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + cartId));
        
        // Verify the cart item belongs to the user
        if (!cartItem.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to cart item");
        }
        
        cartRepository.delete(cartItem);
    }
    
    /**
     * Clear all items from user's cart
     * @param userId the user ID
     */
    public void clearCart(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        cartRepository.deleteByUser(user);
    }
    
    /**
     * Get total cart value for a user
     * @param userId the user ID
     * @return BigDecimal total value
     */
    public BigDecimal getCartTotal(Long userId) {
        List<CartResponse> cartItems = getCartItems(userId);
        return cartItems.stream()
            .map(CartResponse::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    /**
     * Convert Cart entity to CartResponse DTO
     * @param cart the Cart entity
     * @return CartResponse DTO
     */
    private CartResponse convertToResponse(Cart cart) {
        Product product = cart.getProduct();
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(cart.getQuantity()));
        
        return new CartResponse(
            cart.getId(),
            product.getId(),
            product.getName(),
            product.getPrice(),
            product.getImageUrl(),
            cart.getQuantity(),
            totalPrice
        );
    }
}
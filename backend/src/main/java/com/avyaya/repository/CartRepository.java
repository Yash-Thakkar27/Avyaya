package com.avyaya.repository;

import com.avyaya.model.Cart;
import com.avyaya.model.Product;
import com.avyaya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    /**
     * Find cart items by user
     * @param user the user to search cart items for
     * @return List of cart items for the user
     */
    List<Cart> findByUser(User user);
    
    /**
     * Find cart items by user ID
     * @param userId the user ID to search cart items for
     * @return List of cart items for the user
     */
    List<Cart> findByUserId(Long userId);
    
    /**
     * Find cart item by user and product
     * @param user the user
     * @param product the product
     * @return Optional containing the cart item if found
     */
    Optional<Cart> findByUserAndProduct(User user, Product product);
    
    /**
     * Find cart item by user ID and product ID
     * @param userId the user ID
     * @param productId the product ID
     * @return Optional containing the cart item if found
     */
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);
    
    /**
     * Delete all cart items for a user
     * @param user the user to clear cart for
     */
    void deleteByUser(User user);
    
    /**
     * Delete cart item by user and product
     * @param user the user
     * @param product the product
     */
    void deleteByUserAndProduct(User user, Product product);
}
package com.avyaya.repository;

import com.avyaya.model.Order;
import com.avyaya.model.OrderStatus;
import com.avyaya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    /**
     * Find orders by user, ordered by creation date (newest first)
     * @param user the user to search orders for
     * @return List of orders for the user
     */
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    /**
     * Find orders by user ID, ordered by creation date (newest first)
     * @param userId the user ID to search orders for
     * @return List of orders for the user
     */
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    /**
     * Find orders by status
     * @param status the order status to search for
     * @return List of orders with the specified status
     */
    List<Order> findByStatus(OrderStatus status);
    
    /**
     * Find order by Razorpay order ID
     * @param razorpayOrderId the Razorpay order ID
     * @return Optional containing the order if found
     */
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
    
    /**
     * Find orders by user and status
     * @param user the user to search orders for
     * @param status the order status to search for
     * @return List of orders matching user and status
     */
    List<Order> findByUserAndStatus(User user, OrderStatus status);
}
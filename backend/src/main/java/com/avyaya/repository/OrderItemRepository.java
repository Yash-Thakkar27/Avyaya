package com.avyaya.repository;

import com.avyaya.model.Order;
import com.avyaya.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    /**
     * Find order items by order
     * @param order the order to search items for
     * @return List of order items for the order
     */
    List<OrderItem> findByOrder(Order order);
    
    /**
     * Find order items by order ID
     * @param orderId the order ID to search items for
     * @return List of order items for the order
     */
    List<OrderItem> findByOrderId(Long orderId);
}
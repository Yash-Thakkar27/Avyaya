package com.avyaya.repository;

import com.avyaya.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    /**
     * Find products by category
     * @param category the category to search for
     * @return List of products in the category
     */
    List<Product> findByCategory(String category);
    
    /**
     * Find products by category, ordered by creation date (newest first)
     * @param category the category to search for
     * @return List of products in the category ordered by newest first
     */
    List<Product> findByCategoryOrderByCreatedAtDesc(String category);
    
    /**
     * Find all products ordered by creation date (newest first)
     * @return List of all products ordered by newest first
     */
    List<Product> findAllByOrderByCreatedAtDesc();
    
    /**
     * Find products by name containing the search term (case-insensitive)
     * @param name the search term
     * @return List of products matching the search term
     */
    List<Product> findByNameContainingIgnoreCase(String name);
    
    /**
     * Find products with stock greater than 0
     * @return List of products in stock
     */
    List<Product> findByStockGreaterThan(Integer stock);
    
    /**
     * Get all distinct categories
     * @return List of unique category names
     */
    @Query("SELECT DISTINCT p.category FROM Product p ORDER BY p.category")
    List<String> findDistinctCategories();
}
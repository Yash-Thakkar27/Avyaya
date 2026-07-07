package com.avyaya.service;

import com.avyaya.dto.ProductRequest;
import com.avyaya.dto.ProductResponse;
import com.avyaya.model.Product;
import com.avyaya.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Get all products
     * @return List of all products
     */
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Get product by ID
     * @param id the product ID
     * @return ProductResponse
     * @throws RuntimeException if product not found
     */
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToResponse(product);
    }
    
    /**
     * Get products by category
     * @param category the category name
     * @return List of products in the category
     */
    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategoryOrderByCreatedAtDesc(category).stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Search products by name
     * @param name the search term
     * @return List of products matching the search term
     */
    public List<ProductResponse> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Get all available categories
     * @return List of category names
     */
    public List<String> getAllCategories() {
        return productRepository.findDistinctCategories();
    }
    
    /**
     * Create a new product (Admin only)
     * @param productRequest the product details
     * @return ProductResponse of the created product
     */
    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setMaterial(productRequest.getMaterial());
        product.setStone(productRequest.getStone());
        product.setImageUrl(productRequest.getImageUrl());
        product.setStock(productRequest.getStock());
        
        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }
    
    /**
     * Update an existing product (Admin only)
     * @param id the product ID
     * @param productRequest the updated product details
     * @return ProductResponse of the updated product
     * @throws RuntimeException if product not found
     */
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setMaterial(productRequest.getMaterial());
        product.setStone(productRequest.getStone());
        product.setImageUrl(productRequest.getImageUrl());
        product.setStock(productRequest.getStock());
        
        Product updatedProduct = productRepository.save(product);
        return convertToResponse(updatedProduct);
    }
    
    /**
     * Delete a product (Admin only)
     * @param id the product ID
     * @throws RuntimeException if product not found
     */
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.delete(product);
    }
    
    /**
     * Convert Product entity to ProductResponse DTO
     * @param product the Product entity
     * @return ProductResponse DTO
     */
    private ProductResponse convertToResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getCategory(),
            product.getMaterial(),
            product.getStone(),
            product.getImageUrl(),
            product.getStock(),
            product.getCreatedAt()
        );
    }
}
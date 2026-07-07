package com.avyaya.controller;

import com.avyaya.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CategoryController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * Get all available categories
     * @return List of category names
     */
    @GetMapping
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = productService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
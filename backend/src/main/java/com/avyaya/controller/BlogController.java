package com.avyaya.controller;

import com.avyaya.dto.BlogRequest;
import com.avyaya.dto.BlogResponse;
import com.avyaya.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Value("${avyaya.upload.dir:uploads}")
    private String uploadDir;

    @Value("${avyaya.base-url:http://localhost:8080}")
    private String baseUrl;

    // ── Public endpoints ──────────────────────────────────────────────────────

    /**
     * Get all published blog posts (public)
     */
    @GetMapping
    public ResponseEntity<List<BlogResponse>> getPublishedBlogs() {
        return ResponseEntity.ok(blogService.getPublishedBlogs());
    }

    /**
     * Get a single published blog post by slug (public)
     */
    @GetMapping("/{slug}")
    public ResponseEntity<?> getBlogBySlug(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(blogService.getPublishedBlogBySlug(slug));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ── Admin endpoints ───────────────────────────────────────────────────────

    /**
     * Get all blog posts including drafts (Admin only)
     */
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BlogResponse>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    /**
     * Create a new blog post (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBlog(@Valid @RequestBody BlogRequest blogRequest) {
        try {
            BlogResponse blog = blogService.createBlog(blogRequest);
            return ResponseEntity.ok(blog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Update an existing blog post (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBlog(@PathVariable Long id,
                                        @Valid @RequestBody BlogRequest blogRequest) {
        try {
            BlogResponse blog = blogService.updateBlog(id, blogRequest);
            return ResponseEntity.ok(blog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Toggle published/draft status (Admin only)
     */
    @PatchMapping("/{id}/toggle-publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> togglePublish(@PathVariable Long id) {
        try {
            BlogResponse blog = blogService.togglePublished(id);
            return ResponseEntity.ok(blog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Delete a blog post (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok(new SuccessResponse("Blog post deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Upload a blog cover image (Admin only).
     * Saves file to the uploads directory and returns the accessible URL.
     */
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Please select a file to upload"));
        }

        // Validate content type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Only image files are allowed"));
        }

        try {
            // Ensure upload directory exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = (originalFilename != null && originalFilename.contains("."))
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".jpg";
            String filename = UUID.randomUUID() + extension;

            // Save the file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the URL
            String fileUrl = baseUrl + "/uploads/" + filename;
            return ResponseEntity.ok(new UploadResponse(fileUrl));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(new ErrorResponse("Failed to upload image: " + e.getMessage()));
        }
    }

    // ── Response classes ──────────────────────────────────────────────────────

    public static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    public static class SuccessResponse {
        private String message;
        public SuccessResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    public static class UploadResponse {
        private String url;
        public UploadResponse(String url) { this.url = url; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }
}

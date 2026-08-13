package com.avyaya.service;

import com.avyaya.dto.BlogRequest;
import com.avyaya.dto.BlogResponse;
import com.avyaya.model.Blog;
import com.avyaya.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // ── Public: list published posts ──────────────────────────────────────────

    /**
     * Returns all published blog posts, newest first.
     */
    public List<BlogResponse> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Returns a single published post by slug.
     */
    public BlogResponse getPublishedBlogBySlug(String slug) {
        Blog blog = blogRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new RuntimeException("Blog post not found: " + slug));
        return toResponse(blog);
    }

    // ── Admin: CRUD ───────────────────────────────────────────────────────────

    /**
     * Returns all posts (including drafts), newest first — admin view.
     */
    public List<BlogResponse> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Creates a new blog post.
     */
    public BlogResponse createBlog(BlogRequest request) {
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setSlug(generateUniqueSlug(request.getTitle()));
        blog.setExcerpt(request.getExcerpt());
        blog.setContent(request.getContent());
        blog.setCoverImageUrl(request.getCoverImageUrl());
        blog.setAuthor(request.getAuthor());
        blog.setPublished(request.getPublished() != null ? request.getPublished() : false);
        return toResponse(blogRepository.save(blog));
    }

    /**
     * Updates an existing blog post by ID.
     */
    public BlogResponse updateBlog(Long id, BlogRequest request) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));

        // Re-generate slug only if title has changed
        if (!blog.getTitle().equals(request.getTitle())) {
            blog.setSlug(generateUniqueSlug(request.getTitle()));
        }

        blog.setTitle(request.getTitle());
        blog.setExcerpt(request.getExcerpt());
        blog.setContent(request.getContent());
        blog.setCoverImageUrl(request.getCoverImageUrl());
        blog.setAuthor(request.getAuthor());
        blog.setPublished(request.getPublished() != null ? request.getPublished() : blog.getPublished());

        return toResponse(blogRepository.save(blog));
    }

    /**
     * Deletes a blog post by ID.
     */
    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog post not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }

    /**
     * Toggles the published flag of a blog post.
     */
    public BlogResponse togglePublished(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        blog.setPublished(!blog.getPublished());
        return toResponse(blogRepository.save(blog));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Converts a Blog entity to a BlogResponse DTO.
     */
    private BlogResponse toResponse(Blog blog) {
        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getSlug(),
                blog.getExcerpt(),
                blog.getContent(),
                blog.getCoverImageUrl(),
                blog.getAuthor(),
                blog.getPublished(),
                blog.getCreatedAt(),
                blog.getUpdatedAt()
        );
    }

    /**
     * Generates a URL-safe slug from a title, appending a counter if the slug already exists.
     */
    private String generateUniqueSlug(String title) {
        String base = slugify(title);
        String candidate = base;
        int counter = 1;
        while (blogRepository.existsBySlug(candidate)) {
            candidate = base + "-" + counter++;
        }
        return candidate;
    }

    private static final Pattern NON_LATIN   = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE  = Pattern.compile("\\s+");
    private static final Pattern MULTI_DASH  = Pattern.compile("-{2,}");

    /**
     * Converts a title string into a lowercase, hyphen-separated slug.
     */
    private String slugify(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String withHyphens = WHITESPACE.matcher(normalized.trim()).replaceAll("-");
        String cleaned     = NON_LATIN.matcher(withHyphens).replaceAll("");
        String deduplicated = MULTI_DASH.matcher(cleaned).replaceAll("-");
        return deduplicated.toLowerCase(Locale.ENGLISH);
    }
}

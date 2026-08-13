package com.avyaya.repository;

import com.avyaya.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    /**
     * Find all published blog posts, newest first
     */
    List<Blog> findByPublishedTrueOrderByCreatedAtDesc();

    /**
     * Find all blog posts (admin use), newest first
     */
    List<Blog> findAllByOrderByCreatedAtDesc();

    /**
     * Find a published post by slug (public)
     */
    Optional<Blog> findBySlugAndPublishedTrue(String slug);

    /**
     * Find any post by slug (admin, includes drafts)
     */
    Optional<Blog> findBySlug(String slug);

    /**
     * Check if a slug already exists
     */
    boolean existsBySlug(String slug);
}

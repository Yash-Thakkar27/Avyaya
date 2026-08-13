package com.avyaya.dto;

import jakarta.validation.constraints.NotBlank;

public class BlogRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String excerpt;

    private String content;

    private String coverImageUrl;

    private String author;

    private Boolean published = false;

    // Default constructor
    public BlogRequest() {}

    // Constructor
    public BlogRequest(String title, String excerpt, String content,
                       String coverImageUrl, String author, Boolean published) {
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.author = author;
        this.published = published;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Boolean getPublished() { return published; }
    public void setPublished(Boolean published) { this.published = published; }
}

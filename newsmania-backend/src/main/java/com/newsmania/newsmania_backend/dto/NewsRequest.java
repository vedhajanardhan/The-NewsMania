package com.newsmania.newsmania_backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
@Data
public class NewsRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "Category is required")
    private String category;

    private String imageUrl;
}
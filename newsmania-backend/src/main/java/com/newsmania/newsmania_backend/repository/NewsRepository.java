package com.newsmania.newsmania_backend.repository;

import com.newsmania.newsmania_backend.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {

    Page<News> findByCategory(String category, Pageable pageable);

    Page<News> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
}

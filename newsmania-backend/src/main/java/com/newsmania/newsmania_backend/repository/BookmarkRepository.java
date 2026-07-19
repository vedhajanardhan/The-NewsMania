package com.newsmania.newsmania_backend.repository;

import com.newsmania.newsmania_backend.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    List<Bookmark> findByUserId(Long userId);

    boolean existsByUserIdAndNewsId(Long userId, Long newsId);

    void deleteByUserIdAndNewsId(Long userId, Long newsId);
}

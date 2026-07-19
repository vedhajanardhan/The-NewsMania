package com.newsmania.newsmania_backend.repository;

import com.newsmania.newsmania_backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    boolean existsByUserIdAndNewsId(Long userId, Long newsId);

    long countByNewsId(Long newsId);

    void deleteByUserIdAndNewsId(Long userId, Long newsId);
}

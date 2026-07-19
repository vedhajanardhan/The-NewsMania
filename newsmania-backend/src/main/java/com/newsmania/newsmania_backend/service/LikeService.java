package com.newsmania.newsmania_backend.service;

import com.newsmania.newsmania_backend.entity.Like;
import com.newsmania.newsmania_backend.repository.LikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    // Like News
    public Like likeNews(Long userId, Long newsId) {

        if (likeRepository.existsByUserIdAndNewsId(userId, newsId)) {
            throw new RuntimeException("News already liked");
        }

        Like like = Like.builder()
                .userId(userId)
                .newsId(newsId)
                .build();

        return likeRepository.save(like);
    }

    // Get Total Likes
    public long getLikes(Long newsId) {
        return likeRepository.countByNewsId(newsId);
    }

    // Unlike News
    @Transactional
    public String unlikeNews(Long userId, Long newsId) {

        likeRepository.deleteByUserIdAndNewsId(userId, newsId);

        return "Like removed successfully";
    }
}
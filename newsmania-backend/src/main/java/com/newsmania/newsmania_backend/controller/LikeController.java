package com.newsmania.newsmania_backend.controller;

import com.newsmania.newsmania_backend.entity.Like;
import com.newsmania.newsmania_backend.service.LikeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    // Like News
    @PostMapping("/{userId}/{newsId}")
    public Like likeNews(@PathVariable Long userId,
                         @PathVariable Long newsId) {

        return likeService.likeNews(userId, newsId);
    }

    // Get Total Likes
    @GetMapping("/{newsId}")
    public long getLikes(@PathVariable Long newsId) {

        return likeService.getLikes(newsId);
    }

    // Unlike News
    @DeleteMapping("/{userId}/{newsId}")
    public String unlikeNews(@PathVariable Long userId,
                             @PathVariable Long newsId) {

        return likeService.unlikeNews(userId, newsId);
    }
}

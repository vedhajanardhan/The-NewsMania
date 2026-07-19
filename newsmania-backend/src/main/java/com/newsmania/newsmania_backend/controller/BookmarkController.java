package com.newsmania.newsmania_backend.controller;

import com.newsmania.newsmania_backend.entity.Bookmark;
import com.newsmania.newsmania_backend.service.BookmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/{userId}/{newsId}")
    public Bookmark addBookmark(@PathVariable Long userId,
                                @PathVariable Long newsId) {

        return bookmarkService.addBookmark(userId, newsId);
    }

    @GetMapping("/{userId}")
    public List<Bookmark> getBookmarks(@PathVariable Long userId) {

        return bookmarkService.getBookmarks(userId);
    }

    @DeleteMapping("/{userId}/{newsId}")
    public String removeBookmark(@PathVariable Long userId,
                                 @PathVariable Long newsId) {

        return bookmarkService.removeBookmark(userId, newsId);
    }
}

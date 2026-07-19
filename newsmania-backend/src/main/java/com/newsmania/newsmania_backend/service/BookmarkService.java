package com.newsmania.newsmania_backend.service;
import org.springframework.transaction.annotation.Transactional;
import com.newsmania.newsmania_backend.entity.Bookmark;
import com.newsmania.newsmania_backend.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    // Add Bookmark
    public Bookmark addBookmark(Long userId, Long newsId) {

        if (bookmarkRepository.existsByUserIdAndNewsId(userId, newsId)) {
            throw new RuntimeException("News already bookmarked");
        }

        Bookmark bookmark = Bookmark.builder()
                .userId(userId)
                .newsId(newsId)
                .build();

        return bookmarkRepository.save(bookmark);
    }

    // Get All Bookmarks of a User
    public List<Bookmark> getBookmarks(Long userId) {
        return bookmarkRepository.findByUserId(userId);
    }

    // Remove Bookmark
    @Transactional
    public String removeBookmark(Long userId, Long newsId) {

        bookmarkRepository.deleteByUserIdAndNewsId(userId, newsId);

        return "Bookmark removed successfully";
    }
}
package com.newsmania.newsmania_backend.service;
import org.springframework.data.domain.Sort;
import com.newsmania.newsmania_backend.dto.NewsRequest;
import com.newsmania.newsmania_backend.entity.News;
import com.newsmania.newsmania_backend.repository.NewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    // Create News
    public News createNews(NewsRequest request) {

        News news = new News();

        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setAuthor(request.getAuthor());
        news.setCategory(request.getCategory());
        news.setImageUrl(request.getImageUrl());

        return newsRepository.save(news);
    }

    // Get All News with Pagination
    public Page<News> getAllNews(int page, int size) {

        return newsRepository.findAll(
                PageRequest.of(
                        page,
                        size,
                        Sort.by("publishedAt").descending()
                )
        );
    }

    // Get News By Id
    public News getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    // Update News
    public News updateNews(Long id, NewsRequest request) {

        News news = getNewsById(id);

        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setAuthor(request.getAuthor());
        news.setCategory(request.getCategory());
        news.setImageUrl(request.getImageUrl());

        return newsRepository.save(news);
    }

    // Delete News
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }

    // Category Filter with Pagination
    public Page<News> getByCategory(String category, int page, int size) {
        return newsRepository.findByCategory(category, PageRequest.of(page, size));
    }

    // Search News with Pagination
    public Page<News> searchNews(String keyword, int page, int size) {
        return newsRepository.findByTitleContainingIgnoreCase(keyword, PageRequest.of(page, size));
    }
}
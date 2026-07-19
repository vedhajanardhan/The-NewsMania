package com.newsmania.newsmania_backend.controller;
import jakarta.validation.Valid;
import com.newsmania.newsmania_backend.dto.NewsRequest;
import com.newsmania.newsmania_backend.entity.News;
import com.newsmania.newsmania_backend.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping
    public News createNews(@Valid @RequestBody NewsRequest request) {
        return newsService.createNews(request);
    }

    // Get All News with Pagination
    @GetMapping
    public Page<News> getAllNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return newsService.getAllNews(page, size);
    }

    @GetMapping("/{id}")
    public News getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id);
    }

    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id,
                           @Valid @RequestBody NewsRequest request){
        return newsService.updateNews(id,request);
    }


    @DeleteMapping("/{id}")
    public String deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return "News deleted successfully";
    }

    // Category Filter with Pagination
    @GetMapping("/category/{category}")
    public Page<News> getByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return newsService.getByCategory(category, page, size);
    }

    // Search with Pagination
    @GetMapping("/search")
    public Page<News> searchNews(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return newsService.searchNews(keyword, page, size);
    }
}

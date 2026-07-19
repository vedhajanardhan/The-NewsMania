package com.newsmania.newsmania_backend.controller;

import com.newsmania.newsmania_backend.entity.Comment;
import com.newsmania.newsmania_backend.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Add Comment
    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    // Get Comments by News ID
    @GetMapping("/{newsId}")
    public List<Comment> getComments(@PathVariable Long newsId) {
        return commentService.getComments(newsId);
    }

    // Update Comment
    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id,
                                 @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    // Delete Comment
    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }
}

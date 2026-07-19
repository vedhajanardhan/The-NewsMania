package com.newsmania.newsmania_backend.service;

import com.newsmania.newsmania_backend.entity.Comment;
import com.newsmania.newsmania_backend.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Add Comment
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Get Comments by News ID
    public List<Comment> getComments(Long newsId) {
        return commentRepository.findByNewsId(newsId);
    }

    // Update Comment
    public Comment updateComment(Long id, Comment updatedComment) {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setComment(updatedComment.getComment());

        return commentRepository.save(comment);
    }

    // Delete Comment
    public String deleteComment(Long id) {

        commentRepository.deleteById(id);

        return "Comment deleted successfully";
    }
}

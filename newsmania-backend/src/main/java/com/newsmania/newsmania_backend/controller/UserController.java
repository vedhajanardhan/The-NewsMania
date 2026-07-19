package com.newsmania.newsmania_backend.controller;

import com.newsmania.newsmania_backend.dto.UserProfileRequest;
import com.newsmania.newsmania_backend.entity.User;
import com.newsmania.newsmania_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get User Profile
    @GetMapping("/{id}")
    public User getProfile(@PathVariable Long id) {
        return userService.getProfile(id);
    }

    // Update User Profile
    @PutMapping("/{id}")
    public User updateProfile(@PathVariable Long id,
                              @RequestBody UserProfileRequest request) {
        return userService.updateProfile(id, request);
    }
}

package com.newsmania.newsmania_backend.service;

import com.newsmania.newsmania_backend.dto.UserProfileRequest;
import com.newsmania.newsmania_backend.entity.User;
import com.newsmania.newsmania_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get User Profile
    public User getProfile(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update User Profile
    public User updateProfile(Long id, UserProfileRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        return userRepository.save(user);
    }
}

package com.newsmania.newsmania_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileRequest {

    private String fullName;

    private String email;
}

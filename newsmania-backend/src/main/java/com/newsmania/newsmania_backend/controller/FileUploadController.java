package com.newsmania.newsmania_backend.controller;

import com.newsmania.newsmania_backend.service.FileUploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {

        try {

            String fileName = fileUploadService.uploadFile(file);

            return ResponseEntity.ok(fileName);

        } catch (Exception e) {

            return ResponseEntity.badRequest().body("Upload Failed");
        }
    }
}
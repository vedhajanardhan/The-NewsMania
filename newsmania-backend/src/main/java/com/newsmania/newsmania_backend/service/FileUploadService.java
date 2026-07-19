package com.newsmania.newsmania_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    public String uploadFile(MultipartFile file) throws IOException {

        File folder = new File(UPLOAD_DIR);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        File destination = new File(UPLOAD_DIR + fileName);

        file.transferTo(destination);

        return fileName;
    }
}

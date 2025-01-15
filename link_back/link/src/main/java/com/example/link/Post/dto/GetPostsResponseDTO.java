package com.example.link.Post.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Data
@Getter @Setter @Builder
public class GetPostsResponseDTO {
    private int postId;
    private int projectId;
    private int authorId;
    private String authorName;
    private String title;
    private String content;
    private LocalDateTime createdDate;
}

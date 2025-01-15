package com.example.link.Post.dto;

import com.example.link.Post.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@Builder
@Schema(description = "게시물 DTO")
public class PostDto {
    private int postId;
    private int projectId;
    private int authorId;
    private String title;
    private String content;
    private LocalDateTime createdDate;

    public Post toEntity() {
        return Post.builder()
                .postId(this.postId)
                .projectId(this.projectId)
                .authorId(this.authorId)
                .title(this.title)
                .content(this.content)
                .createdDate(this.createdDate)
                .build();
    }
}

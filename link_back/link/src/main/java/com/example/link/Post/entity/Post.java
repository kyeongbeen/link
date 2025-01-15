package com.example.link.Post.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;
    private int projectId;
    private int authorId;
    @Column(length = 256, nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Builder
    public Post(int postId, int projectId, int authorId, String title, String content, LocalDateTime createdDate) {
        this.postId = postId;
        this.projectId = projectId;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
    }
}

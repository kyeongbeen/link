package com.example.link.Reply.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyId;
    private int postId;
    private int projectId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @Column(nullable = false)
    private String authorName;
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Builder
    public Reply (int replyId, int postId, int projectId, String content, String authorName, LocalDateTime createdDate) {
        this.replyId=replyId;
        this.postId = postId;
        this.projectId = projectId;
        this.content = content;
        this.authorName = authorName;
        this.createdDate = createdDate;
    }

}

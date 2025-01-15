package com.example.link.Reply.dto;

import com.example.link.Reply.entity.Reply;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@Builder
@Schema(description = "댓글 DTO")
public class ReplyDto {
        private int replyId;
        private int postId;
        private int projectId;

        private String content;
        private String authorName;
        private LocalDateTime createdDate;

        public Reply toEntity() {
            return Reply.builder()
                    .replyId(this.replyId)
                    .postId(this.postId)
                    .projectId(this.projectId)
                    .content(this.content)
                    .authorName(this.authorName)
                    .createdDate(this.createdDate)
                    .build();
        }
}

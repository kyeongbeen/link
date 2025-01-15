package com.example.link.Project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter @Builder
@Schema(description = "인원추가 요청 DTO")
public class InviteParticipantsDTO {
    @Schema(description = "추가할 인원의 이메일")
    private String email;
    @Schema(description = "추가하고 싶은 프로젝트의 아이디")
    private int projectId;
}

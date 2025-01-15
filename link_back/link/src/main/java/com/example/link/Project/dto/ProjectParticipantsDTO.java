package com.example.link.Project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter @Builder
@Schema(description = "프로젝트 참가자 DTO")
public class ProjectParticipantsDTO {
    private int projectParticipantsId;
    private int userId;
    private int projectId;
    private String enterDate;

}

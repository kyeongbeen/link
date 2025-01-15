package com.example.link.Project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter @Builder
@Schema(description = "프로젝트 생성 DTO")
public class ProjectCreateDTO {
    @Schema(description = "프로젝트 생성자의 아이디")
    private int projectLeaderId;
    @Schema(description = "프로젝트 이름")
    private String projectName;
}

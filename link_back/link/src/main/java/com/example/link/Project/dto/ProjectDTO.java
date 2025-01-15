package com.example.link.Project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter @Builder
@Schema(description = "프로젝트 DTO")
public class ProjectDTO {
    private int projectId;
    private String projectName;
    private int projectLeaderId;
    private String createDate;
}

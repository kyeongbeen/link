package com.example.link.Task.dto;

import com.example.link.Project.entity.Project;
import com.example.link.Task.TaskPriority;
import com.example.link.Task.TaskStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Schema(description = "작업 DTO")
public class TaskDTO {
    @Schema(description = "PK, 자동생성되는 고유값 ")
    private int taskId;

    @Schema(description = "담당자의 userId")
    private int assignedUser;

    @Schema(description = "담당자 이름")
    private String assignedUserName;

    @Schema(description = "작업 이름")
    private String title;

    @Schema(description = "작업 내용")
    private String content;

    @Schema(description = "작업 시작일")
    private String startDate;

    @Schema(description = "작업 마감일")
    private String deadline;

    @Schema(description = "작업 우선순위")
    private TaskPriority taskPriority;

    @Schema(description = "작업 상태")
    private TaskStatus status;

    @Schema(description = "연관된 프로젝트")
    private int projectId;
}

package com.example.link.Task.controller;

import com.example.link.Project.dto.ProjectParticipantsDTO;
import com.example.link.Project.dto.UserIdMapping;
import com.example.link.Project.entity.ProjectParticipants;
import com.example.link.Project.repository.ProjectParticipantsRepository;
import com.example.link.Project.service.ProjectParticipantsService;
import com.example.link.Task.dto.TaskFromPriorityDTO;
import com.example.link.Task.dto.TaskFromRepresentativeDTO;
import com.example.link.Task.dto.TaskFromStatusDTO;
import com.example.link.Task.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "대시보드 API")
public class DashboardController {

    private final DashboardService dashboardService;
    private final ProjectParticipantsRepository projectParticipantsRepository;
    private final ProjectParticipantsService projectParticipantsService;

    @GetMapping("/status")
    @Operation(summary = "프로젝트에 있는 작업들의 상태별 현황을 조회")
    public ResponseEntity<TaskFromStatusDTO> getTasksFromStatus(@RequestParam int projectId) {
        return new ResponseEntity<>(dashboardService.getTasksFromStatus(projectId),HttpStatus.OK);
    }

    @GetMapping("/priority")
    @Operation(summary = "우선순위별 현황을 조회")
    public ResponseEntity<TaskFromPriorityDTO> getTasksFromPriority(@RequestParam int projectId) {
        return new ResponseEntity<>(dashboardService.getTasksFromPriority(projectId), HttpStatus.OK);
    }

    @GetMapping("/representative")
    @Operation(summary = "담당자별 현황을 조회")
    public ResponseEntity<List<TaskFromRepresentativeDTO>> getTasksFromRepresentative(@RequestParam int projectId) throws Exception {
        List<Integer> participants = projectParticipantsService.getParticipants(projectId);
        return new ResponseEntity<>(dashboardService.getTasksFromRepresentative(participants), HttpStatus.OK);
    }

}

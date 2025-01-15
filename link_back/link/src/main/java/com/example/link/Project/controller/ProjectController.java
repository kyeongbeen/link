package com.example.link.Project.controller;

import com.example.link.Project.dto.InviteParticipantsDTO;
import com.example.link.Project.dto.ProjectCreateDTO;
import com.example.link.Project.dto.ProjectDTO;
import com.example.link.Project.dto.ProjectParticipantsDTO;
import com.example.link.Project.entity.ProjectParticipants;
import com.example.link.Project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
@RequestMapping("/project")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "프로젝트 API")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/lists")
    @Operation(summary = "전체 프로젝트를 조회")
    public ResponseEntity<List<ProjectDTO>> getLists(@RequestParam Integer userId) {
        return new ResponseEntity<>(projectService.getLists(userId), HttpStatus.OK);
    }

    @PostMapping("/new")
    @Operation(summary = "프로젝트 생성")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectCreateDTO projectCreateDTO) {
        return new ResponseEntity<>(projectService.createProject(projectCreateDTO), HttpStatus.OK);
    }

    @PatchMapping("/lists")
    @Operation(summary = "프로젝트 이름 수정")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        return new ResponseEntity<>(projectService.updateProject(projectDTO), HttpStatus.OK);
    }

    @DeleteMapping("/lists/{projectId}")
    @Operation(summary = "프로젝트 삭제")
    public ResponseEntity<String> deleteProject(@PathVariable int projectId) {
        return new ResponseEntity<>(projectService.deleteProject(projectId), HttpStatus.OK);
    }

    @PostMapping("/participants/new")
    @Operation(summary = "프로젝트에 인원 초대")
    public ResponseEntity<ProjectParticipantsDTO> inviteParticipants(@RequestBody InviteParticipantsDTO inviteParticipantsDTO) {
        return new ResponseEntity<>(projectService.inviteParticipants(inviteParticipantsDTO), HttpStatus.OK);
    }
}

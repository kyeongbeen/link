package com.example.link.Task.controller;

import com.example.link.Task.dto.TaskDTO;
import com.example.link.Task.service.TaskService;
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
@RequestMapping("/task")
@Tag(name = "Tasks", description = "작업 API")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/lists")
    @Operation(summary = "프로젝트에 속하는 모든 작업을 조회")
    public ResponseEntity<List<TaskDTO>> getLists(@RequestParam int projectId) {
        return new ResponseEntity<>(taskService.getLists(projectId),HttpStatus.OK);
    }

    @PostMapping("/new")
    @Operation(summary = "작업 생성")
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        return new ResponseEntity<>(taskService.createTask(taskDTO), HttpStatus.OK);
    }

    @PatchMapping("/lists")
    @Operation(summary = "작업 수정")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO taskDTO) {
        return new ResponseEntity<>(taskService.updateTask(taskDTO), HttpStatus.OK);
    }

    @DeleteMapping("/lists/{taskId}")
    @Operation(summary = "작업 삭제")
    public ResponseEntity<String> deleteTask(@PathVariable int taskId) {
        return new ResponseEntity<>(taskService.deleteTask(taskId), HttpStatus.OK);
    }

}

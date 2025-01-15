package com.example.link.Task.service;

import com.example.link.Project.repository.ProjectRepository;
import com.example.link.Task.dto.TaskDTO;
import com.example.link.Task.entity.Task;
import com.example.link.Task.repository.TaskRepository;
import com.example.link.User.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    /** project_id 에 해당하는 모든 작업을 조회 */
    public List<TaskDTO> getLists(int projectId) {
        List<Task> taskLists = taskRepository.getTasksByProject_ProjectId(projectId);
        List<TaskDTO> taskDTOList = new ArrayList<>();
        for (Task task : taskLists) {
            String userName;
            if (task.getAssignedUser() == 0) userName = "없음";
            else userName = userRepository.findById(task.getAssignedUser()).get().getUserName();
            taskDTOList.add(
                    TaskDTO.builder()
                            .taskId(task.getTaskId())
                            .projectId(projectId)
                            .assignedUser(task.getAssignedUser())
                            .assignedUserName(userName)
                            .title(task.getTitle())
                            .content(task.getContent())
                            .taskPriority(task.getTaskPriority())
                            .startDate(task.getStartDate())
                            .deadline(task.getDeadline())
                            .status(task.getStatus())
                            .build()
            );
        }
        return taskDTOList;
    }

    /** 새로운 작업을 생성 */
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = new Task().builder()
                .assignedUser(taskDTO.getAssignedUser())
                .title(taskDTO.getTitle())
                .content(taskDTO.getContent())
                .taskPriority(taskDTO.getTaskPriority())
                .startDate(taskDTO.getStartDate())
                .deadline(taskDTO.getDeadline())
                .status(taskDTO.getStatus())
                .project(projectRepository.findById(taskDTO.getProjectId()).get())
                .build();
        taskRepository.save(task);
        taskDTO.setTaskId(task.getTaskId());
        return taskDTO;
    }

    /** 들어온 데이터 전체를 dirty checking 으로 update */
    @Transactional
    public TaskDTO updateTask(TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskDTO.getTaskId()).get();
        task.setAssignedUser(taskDTO.getAssignedUser());
        task.setTitle(taskDTO.getTitle());
        task.setContent(taskDTO.getContent());
        task.setStartDate(taskDTO.getStartDate());
        task.setDeadline(taskDTO.getDeadline());
        task.setStatus(taskDTO.getStatus());
        task.setTaskPriority(taskDTO.getTaskPriority());
        log.info(task.getContent().toString());
        return taskDTO;
    }

    public String deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
        return taskRepository.findById(taskId).isEmpty() ? "작업이 정상적으로 삭제되었습니다." : "작업이 삭제되지 않았습니다." ;
    }
}

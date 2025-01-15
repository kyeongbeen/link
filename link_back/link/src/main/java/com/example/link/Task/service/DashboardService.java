package com.example.link.Task.service;

import com.example.link.Task.dto.TaskFromPriorityDTO;
import com.example.link.Task.dto.TaskFromRepresentativeDTO;
import com.example.link.Task.dto.TaskFromStatusDTO;
import com.example.link.Task.entity.Task;
import com.example.link.Task.repository.TaskRepository;
import com.example.link.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskFromStatusDTO getTasksFromStatus(int projectId) {
        List<Task> taskList = taskRepository.getTasksByProject_ProjectId(projectId);
        TaskFromStatusDTO dashboardDTO = TaskFromStatusDTO.builder()
                .delayedTasks(0)
                .finishedTasks(0)
                .incompleteTasks(0)
                .ongoingTasks(0)
                .totalTasks(taskList.size())
                .build();

        for (Task task : taskList) {
            switch (task.getStatus()) {
                case DELAY:
                    dashboardDTO.setDelayedTasks(dashboardDTO.getDelayedTasks() + 1);
                    break;
                case ONGOING:
                    dashboardDTO.setOngoingTasks(dashboardDTO.getOngoingTasks() + 1);
                    break;
                case FINISH:
                    dashboardDTO.setFinishedTasks(dashboardDTO.getFinishedTasks() + 1);
                    break;
            }
        }
        dashboardDTO.setIncompleteTasks(dashboardDTO.getTotalTasks() - dashboardDTO.getFinishedTasks());
        return dashboardDTO;
    }


    public TaskFromPriorityDTO getTasksFromPriority(int projectId) {
        List<Task> taskList = taskRepository.getTasksByProject_ProjectId(projectId);
        TaskFromPriorityDTO taskFromPriorityDTO = TaskFromPriorityDTO.builder()
                .high(0)
                .medium(0)
                .low(0)
                .none(0)
                .build();

        for (Task task : taskList) {
            switch (task.getTaskPriority()) {
                case HIGH:
                    taskFromPriorityDTO.setHigh(taskFromPriorityDTO.getHigh() + 1);
                    break;
                case MEDIUM:
                    taskFromPriorityDTO.setMedium(taskFromPriorityDTO.getMedium() + 1);
                    break;
                case LOW:
                    taskFromPriorityDTO.setLow(taskFromPriorityDTO.getLow() + 1);
                    break;
                case NONE:
                    taskFromPriorityDTO.setNone(taskFromPriorityDTO.getNone() + 1);
                    break;
            }
        }
        return taskFromPriorityDTO;
    }

    public List<TaskFromRepresentativeDTO> getTasksFromRepresentative(List<Integer> participants) throws Exception {
        List<TaskFromRepresentativeDTO> taskFromRepresentativeDTOList = new ArrayList<>();
        for (Integer participant : participants) {
            taskFromRepresentativeDTOList.add(TaskFromRepresentativeDTO.builder()
                            .userId(participant)
                            .userName(userRepository.findById(participant).get().getUserName())
                            .taskNumber(taskRepository.countTaskByAssignedUser(participant))
                    .build());
        }
        return taskFromRepresentativeDTOList;
    }
}
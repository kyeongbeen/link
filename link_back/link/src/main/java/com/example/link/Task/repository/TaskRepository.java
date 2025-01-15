package com.example.link.Task.repository;


import com.example.link.Task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> getTasksByProject_ProjectId(int projectProjectId);

    int countTaskByAssignedUser(int assignedUser);
}

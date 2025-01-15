package com.example.link.Project.repository;


import com.example.link.Project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findAllByUser_UserId(int userId);

    List<Project> findAllByProjectId(int projectId);

    Project findByProjectId(int projectId);
}


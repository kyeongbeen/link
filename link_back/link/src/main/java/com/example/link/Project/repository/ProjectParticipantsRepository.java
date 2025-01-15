package com.example.link.Project.repository;

import com.example.link.Project.dto.UserIdMapping;
import com.example.link.Project.entity.Project;
import com.example.link.Project.entity.ProjectParticipants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProjectParticipantsRepository extends JpaRepository<ProjectParticipants, Integer> {
    List<Integer> getAllByUser_UserId(int userUserId);

    List<ProjectParticipants> findAllByProject_ProjectId(int projectProjectId);

    List<ProjectParticipants> findAllByUser_UserId(int userUserId);
}

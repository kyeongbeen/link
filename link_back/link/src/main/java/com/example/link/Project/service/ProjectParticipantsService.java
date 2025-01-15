package com.example.link.Project.service;

import com.example.link.Project.entity.ProjectParticipants;
import com.example.link.Project.repository.ProjectParticipantsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectParticipantsService {

    private final ProjectParticipantsRepository projectParticipantsRepository;

    public List<Integer> getParticipants(int projectId) {
        List<ProjectParticipants> participantsList = projectParticipantsRepository.findAllByProject_ProjectId(projectId);
        List<Integer> participantsIdList = new ArrayList<>();
        for (ProjectParticipants p : participantsList) {
            log.info("{}\n", p.toString());

            participantsIdList.add(p.getUser().getUserId());
        }
        return participantsIdList;
    }
}

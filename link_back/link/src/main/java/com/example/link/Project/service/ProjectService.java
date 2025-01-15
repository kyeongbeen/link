package com.example.link.Project.service;

import com.example.link.Project.dto.InviteParticipantsDTO;
import com.example.link.Project.dto.ProjectCreateDTO;
import com.example.link.Project.dto.ProjectDTO;
import com.example.link.Project.dto.ProjectParticipantsDTO;
import com.example.link.Project.entity.Project;
import com.example.link.Project.entity.ProjectParticipants;
import com.example.link.Project.repository.ProjectParticipantsRepository;
import com.example.link.Project.repository.ProjectRepository;
import com.example.link.User.entity.User;
import com.example.link.User.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectParticipantsRepository projectParticipantsRepository;


    /** 새로운 프로젝트 생성, 생성과 동시에 참가자로 등록 */
    public ProjectDTO createProject(ProjectCreateDTO projectCreateDTO) {
        Project project = new Project().builder()
                .projectName(projectCreateDTO.getProjectName())
                .user(userRepository.findById(projectCreateDTO.getProjectLeaderId()).get())
                .createDate(LocalDateTime.now().toString())
                .build();
        ProjectParticipants projectParticipants = new ProjectParticipants().builder()
                .enterDate(project.getCreateDate())
                .user(project.getUser())
                .project(project)
                .build();
        projectRepository.save(project);
        projectParticipantsRepository.save(projectParticipants);
        return ProjectDTO.builder()
                .projectId(project.getProjectId())
                .projectName(project.getProjectName())
                .projectLeaderId(project.getUser().getUserId())
                .createDate(project.getCreateDate())
                .build();
    }

    /** 전체 프로젝트 리스트 조회
     *  list 로 return
     */
    public List<ProjectDTO> getLists(Integer userId) {
//        List<Project> projectEntityList = projectRepository.findAllByUser_UserId(userId);
//        List<Project> projectEntityList = projectRepository.findAllByUser_UserId(userId);
//        List<ProjectParticipants> projectParticipantsEntityList = projectParticipantsRepository.findAllByUser_UserId(userId);
        List<ProjectParticipants> list = projectParticipantsRepository.findAllByUser_UserId(userId);
        List<Project> projectEntityList = new ArrayList<>();
        for (ProjectParticipants projectParticipants : list) {
            projectEntityList.add(projectRepository.findByProjectId(projectParticipants.getProject().getProjectId()));
        }
        log.info(projectEntityList.toString());

        List<ProjectDTO> projectDTOList = new ArrayList<>();
        log.info(projectEntityList.toString());
        for (Project project : projectEntityList) {
            projectDTOList.add(ProjectDTO.builder()
                    .projectId(project.getProjectId())
                    .projectName(project.getProjectName())
                    .projectLeaderId(project.getUser().getUserId())
                    .createDate(project.getCreateDate())
                    .build());
        }
        return projectDTOList;
    }

    /** 프로젝트의 이름을 변경
     *  따로 save 메소드 호출하지 않고 Dirty Checking 으로 update 완료
     */
    @Transactional
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        Project project = projectRepository.findById(projectDTO.getProjectId()).get();
        project.setProjectName(projectDTO.getProjectName());
        return ProjectDTO.builder().projectId(project.getProjectId()).projectName(project.getProjectName()).build();
    }

    /** 프로젝트 삭제되고 확인 한 결과를 반환 */
    public String deleteProject(int projectId) {
        projectRepository.deleteById(projectId);
        return projectRepository.findById(projectId).isEmpty() ? "프로젝트가 삭제되었습니다." : "프로젝트가 삭제되지 않았습니다.";
    }

    /** 프로젝트에 팀원추가 */
    public ProjectParticipantsDTO inviteParticipants(InviteParticipantsDTO inviteParticipantsDTO) {
        User User = userRepository.findByEmail(inviteParticipantsDTO.getEmail());
        Project project = projectRepository.findById(inviteParticipantsDTO.getProjectId()).get();
        ProjectParticipants projectParticipants = projectParticipantsRepository.save(new ProjectParticipants().builder()
                        .user(User)
                        .project(project)
                        .enterDate(LocalDateTime.now().toString())
                .build());

        return ProjectParticipantsDTO.builder()
                .projectParticipantsId(projectParticipants.getProjectParticipantsId())
                .userId(User.getUserId())
                .projectId(project.getProjectId())
                .enterDate(projectParticipants.getEnterDate())
                .build();
    }
}

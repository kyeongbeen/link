import React, { useState, useEffect } from "react";
import PaginationComponent from "./Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DialogContent } from "@mui/material";
import dayjs from "dayjs";
import AuthAPI from "../Auth/AuthAPI";
import { useProjectId } from "../Auth/ProjectIdContext";

const Project = () => {
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: "",
  });
  const [inviteDialog, setInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [participantsDialog, setParticipantsDialog] = useState(false);
  const [projectParticipants, setProjectParticipants] = useState([]);
  const { updateProjectId } = useProjectId(); // 선택한 프로젝트 아이디 추출을 위한 커스텀 훅

  // 날짜 형식 변환
  const formatDateToKrTime = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  // 프로젝트 선택
  const handleProjectSelect = (id) => {
    updateProjectId(id); // 프로젝트 ID 업데이트
    console.log('선택된 프로젝트 ID:', id);
    alert(`프로젝트${id}이 선택되었습니다.`);
  };

  // 페이지네이션
  const totalPage = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 프로젝트 추가하기
  const handleCreateProject = async () => {
    const newProjectData = {
      projectLeaderId: 1, // 임의로 값을 줘야 함, userId를 못 받아 옴
      projectName: newProject.projectName,
    };
    try {
      const response = await AuthAPI.post("/project/new", newProjectData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.data.createDate = formatDateToKrTime(response.data.createDate);
      alert("프로젝트가 생성되었습니다.");
      setOpenDialog(false);
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error("프로젝트 생성 실패:", error.response || error.message);
      alert("프로젝트 생성에 실패했습니다.");
    }
  };

  // userId 받아오기 (실패)
  // useEffect(() => {
  //   if (projectId) {
  //     const participant = getProjectParticipants(projectId);
  //     setUser(participant);
  //     console.log("생성한 유저ID:", participant?.userId); // 테스트용
  //   }
  // }, [projectId]);

  // 프로젝트 삭제하기 (프로젝트 ID가 외래키로 잡혀 있어서 삭제가 안됨)
  const handleDelete = async (project) => {
    const URL = `/project/lists/${project.projectId}`;
    try {
      await AuthAPI.delete(URL);
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.projectId !== project.projectId)
      );
      alert("프로젝트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("프로젝트 삭제에 실패했습니다.");
      console.error("프로젝트 삭제 중 오류 발생:", error);
    }
  };

  // 프로젝트 수정하기 (아무 에러도 안 뜨고 수정이 안 됨)
  const handleEdit = (project) => {
    setEditedProject(project);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      await AuthAPI.patch("/project/lists", editedProject, {
        headers: { 
          "Content-Type": "application/json" 
        },
      });
      editedProject.createDate = formatDateToKrTime(editedProject.createDate);

      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          (p.projectId === editedProject.projectId ? editedProject : p)
        )
      );
      console.log(editedProject); // 확인용
      alert("프로젝트가 수정되었습니다.");
      setIsEditing(false);
      setOpenDialog(false);
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
    }
  };

  // 초대 다이얼로그 열기
  const handleInvite = (projectId) => {
    setSelectedProjectId(projectId);
    setInviteDialog(true);
  };

  // 초대 전송
  const handleSendInvite = async () => {
    const inviteData = {
      email: inviteEmail,
      projectId: selectedProjectId,
    };
    console.log(inviteData); // 테스트용
    try {
      await AuthAPI.post("project/participants/new", inviteData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰
        },
      });
      alert("초대가 성공적으로 전송되었습니다.");
      setInviteDialog(false);
      setInviteEmail("");
    } catch (error) {
      console.error("초대 전송 실패:", error);
      alert("연결고리에 가입된 사용자가 아닙니다.");
    }
  };

  // 프로젝트 추가 다이얼로그 닫기
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  // 초대 다이얼로그 닫기
  const handleCloseInviteDialog = () => {
    setInviteDialog(false);
    setInviteEmail("");
  };

  // 프로젝트 목록 가져오기
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await AuthAPI.get(`/project/lists?userId=${1}`);
        setProjects(response.data);
      } catch (error) {
        console.error("프로젝트 목록을 가져오는 중 오류 발생:", error);
      }
    };
    getProjects();
  }, []);

  // 프로젝트에 소속된 유저 리스트 가져오기
  const getProjectParticipants = async (projectId) => {
    try {
      const response = await AuthAPI.get(`/user/lists?projectId=${projectId}`);
      // console.log(response.data);  // 테스트용
      return response.data;
    } catch (error) {
      console.error("프로젝트 참여자 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 참여자 목록 열기
  const handleOpenParticipantsDialog = async (projectId) => {
    try {
      const participants = await getProjectParticipants(projectId);
      setProjectParticipants(participants);
      setParticipantsDialog(true);
    } catch (error) {
      console.error("참여자 목록 열기 실패:", error);
    }
  };

  // 참여자 목록 닫기
  const handleCloseParticipantsDialog = () => {
    setParticipantsDialog(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{ marginBottom: "20px" }}
      >
        추가하기
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">프로젝트</TableCell>
              <TableCell align="center">생성일</TableCell>
              <TableCell align="center">작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.map((project) => (
              <TableRow key={project.projectId}>
                <TableCell
                  align="center"
                  onClick={() =>
                    handleOpenParticipantsDialog(project.projectId)
                  }
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {project.projectName}
                </TableCell>
                <TableCell align="center">
                  {formatDateToKrTime(project.createDate)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(project)}
                    style={{ marginRight: "10px" }}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(project)}
                    style={{ marginRight: "10px" }}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleInvite(project.projectId)}
                    style={{ marginRight: "10px" }}
                  >
                    팀원 추가
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleProjectSelect(project.projectId)}
                  >
                    이용하기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationComponent
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditing ? "프로젝트 수정" : "프로젝트 추가"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="프로젝트 이름"
            fullWidth
            value={
              isEditing ? editedProject?.projectName : newProject.projectName
            }
            onChange={(e) =>
              isEditing
                ? setEditedProject({
                    ...editedProject,
                    projectName: e.target.value,
                  })
                : setNewProject({
                    ...newProject,
                    projectName: e.target.value,
                  })
            }
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            닫기
          </Button>
          <Button
            onClick={isEditing ? handleSaveEdit : handleCreateProject}
            color="primary"
          >
            {isEditing ? "저장" : "등록하기"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={inviteDialog}
        onClose={handleCloseInviteDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>팀원 추가</DialogTitle>
        <DialogContent>
          <TextField
            label="팀원 이메일"
            fullWidth
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInviteDialog} color="secondary">
            닫기
          </Button>
          <Button onClick={handleSendInvite} color="primary">
            초대하기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={participantsDialog}
        onClose={handleCloseParticipantsDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>프로젝트 참여자</DialogTitle>
        <DialogContent>
          {Array.isArray(projectParticipants) &&
          projectParticipants.length > 0 ? (
            <ol>
              {projectParticipants.map((participant) => (
                <li key={participant.id}>
                  {participant.name} ({participant.email})
                </li>
              ))}
            </ol>
          ) : (
            <p>참여자가 없습니다.</p>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseParticipantsDialog} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Project;

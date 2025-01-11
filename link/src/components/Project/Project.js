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

  const formatDateToKrTime = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const totalPage = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateProject = async () => {
    const newProjectData = {
      projectLeaderId: 28,
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
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error("프로젝트 생성 실패:", error.response || error.message);
    }
  };

  const handleDelete = async (project) => {
    const URL = `/project/lists/${project.projectId}`;
    try {
      await AuthAPI.delete(URL);
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.projectId !== project.projectId)
      );
      alert("프로젝트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("프로젝트 삭제 실패했습니다.");
      console.error("프로젝트 삭제 중 오류 발생:", error);
    }
  };

  const handleEdit = (project) => {
    setEditedProject(project);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      await AuthAPI.patch(`/project/lists`, editedProject, {
        headers: { "Content-Type": "application/json" },
      });
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.projectId === editedProject.projectId ? editedProject : p
        )
      );
      alert("프로젝트가 수정되었습니다.");
      setIsEditing(false);
      setOpenDialog(false);
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
    }
  };

  const handleInvite = (projectId) => {
    setSelectedProjectId(projectId);
    setInviteDialog(true);
  };

  const handleSendInvite = async () => {
    const inviteData = {
      email: inviteEmail,
      projectId: selectedProjectId,
    };
    console.log(inviteData);  // 테스트용
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
      alert("초대 전송 실패했습니다.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  const handleCloseInviteDialog = () => {
    setInviteDialog(false);
    setInviteEmail("");
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await AuthAPI.get(`/project/lists?userId=${28}`);
        setProjects(response.data);
      } catch (error) {
        console.error("작업 목록을 가져오는 중 오류 발생:", error);
      }
    };
    getProjects();
  }, []);

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
              <TableCell align="center">리더</TableCell>
              <TableCell align="center">생성일</TableCell>
              <TableCell align="center">작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.map((project) => (
              <TableRow key={project.projectId}>
                <TableCell align="center">{project.projectName}</TableCell>
                <TableCell align="center">{project.projectLeaderId}</TableCell>
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
                  >
                    팀원 추가
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
        <DialogTitle>{isEditing ? "프로젝트 수정" : "프로젝트 추가"}</DialogTitle>
        <DialogContent>
          <TextField
            label="프로젝트 이름"
            fullWidth
            value={isEditing ? editedProject?.projectName : newProject.projectName}
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
    </div>
  );
};

export default Project;

import React, { useState, useEffect } from "react";
import TaskDetail from "./TaskDetail";
import PaginationComponent from "./TaskPagenation";
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
import { DialogContent, DialogContentText, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";

const TaskBoard = () => {
  const tasksPerPage = 5; // 작업 페이지당 작업 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 작업 페이지
  const [selectedTask, setSelectedTask] = useState(null); // 선택된 작업
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부
  const [editedTask, setEditedTask] = useState(); // 수정 중인 작업
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // 글 작성 다이얼로그 열림 여부
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState({
    assignedUser: 0,
    title: "",
    content: "",
    taskPriority: "HIGH",
    status: "FINISH",
    startDate: null, 
    deadline: null, 
    date: null, 
  }); // 새 작업 데이터, Default 값 설정


  // 날짜 변환 함수
  const formatDateToKrTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const dayjsDate = dayjs(date); // dayjs로 변환
    return dayjsDate.format("YYYY-MM-DD"); // 원하는 형식으로 변환
  };

  // 우선순위 한글로 변경
  const getPriority = (taskPriority) => {
    switch (taskPriority) {
      case "HIGH":
        return "상";

      case "MEDIUM":
        return "중";

      case "LOW":
        return "하";

      default:
        return "없음";
    }
  };

  // 상태 한글로 변경
  const getStatus = (status) => {
    switch (status) {
      case "FINISH":
        return "완료";

      case "ONGOING":
        return "진행중";

      case "INCOMPLETE":
        return "미완료";

      case "DELAY":
        return "지연";

      default:
        return "없음";
    }
  };

  // 작업 목록 불러오기
  useEffect(() => {
    const getTasks = async () => {
      try {
        // 작업 목록 API 호출
        const response = await axios.get(
          `http://localhost:8080/task/lists?projectId=${1}`
        ); // 테스트를 위해 1로 설정
        setTasks(response.data); // API 데이터로 상태 업데이트

        // 가져 온 데이터 상태, 우선순위, 마감일 형식 변경
        setTasks((prevTasks) =>
          prevTasks.map((task) => ({
            ...task,
            status: getStatus(task.status),
            taskPriority: getPriority(task.taskPriority),
            startDate: formatDateToKrTime(task.startDate),
            deadline: formatDateToKrTime(task.deadline),
          }))
        );
      } catch (error) {
        console.error("작업 목록을 가져오는 중 오류 발생:", error);
      }
    };

    getTasks(); // 작업 목록 데이터 불러오기
  }, []);

  // 전체 페이지 수 계산
  const totalPage = Math.ceil(tasks.length / tasksPerPage);
  const currentTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 작업 클릭 시 다이얼로그 열기
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditedTask(task);
    setOpenDialog(true);
  };

  // 다이얼로그 닫기
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  // 수정 시작
  const handleEdit = () => {
    setIsEditing(true); // 수정 모드로 변경

  };

  // 수정 저장
  const handleSaveEdit = async() => {
    try {
      // 수정 API 호출
      await axios.patch('http://localhost:8080/task/lists', editedTask, {
       headers: {  
        'Content-Type': 'application/json' 
      }
      });

      // 수정된 데이터 형식 변경
      editedTask.status = getStatus(editedTask.status);
      editedTask.taskPriority = getPriority(editedTask.taskPriority);
      editedTask.startDate = formatDateToKrTime(editedTask.startDate);
      editedTask.deadline = formatDateToKrTime(editedTask.deadline);
      
      // UI에 수정된 데이터 반영
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.taskId === editedTask.taskId ? editedTask : t))
      );

      setIsEditing(false); // 수정 모드 해제
      alert('작업이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('오류: ', error);
      console.log("API 응답 데이터:", editedTask);
      alert('작업이 수행되지 못했습니다.');
    }
  };

  // 작업 삭제
  const handleDelete = async (task) => {
    setSelectedTask(task);
    // 삭제할 작업의 URL
    const URL = `http://localhost:8080/task/lists/${task.taskId}`;

    try {
      // 삭제 API 호출
      const response = await axios.delete(URL);
      const tasks = response.data;

      // 삭제된 작업을 바로 tasks 목록에서 제거
      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.taskId !== task.taskId)
      );

      setOpenDialog(false);
      alert("작업이 성공적으로 삭제되었습니다.");

      return tasks;
    } catch (error) {
      alert("작업 삭제 실패했습니다.");
      console.error("작업 삭제 중 오류 발생:", error);
      return null; // 실패 시 null 반환
    }
  };

  // 새 작업 생성
  const handleCreateTask = async () => {
    const newTaskData = {
      assignedUser: newTask.assignedUser || 1,
      title: newTask.title,
      content: newTask.content,
      startDate: newTask.startDate,
      deadline: newTask.deadline,
      taskPriority: newTask.taskPriority,
      status: newTask.status,
      projectId: 1, // 실제 프로젝트 ID로 변경 (추후 수정, 지금은 테스트)
    };
    console.log("보내질 데이터: ", newTaskData);
    try {
      // 새 작업 생성 API 호출
      const response = await axios.post(
        "http://localhost:8080/task/new",
        newTaskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 가져 온 데이터 우선순위, 상태, 마감일 형식 변경
      response.data.status = getStatus(response.data.status);
      response.data.taskPriority = getPriority(response.data.taskPriority);
      response.data.startDate = formatDateToKrTime(response.data.startDate);
      response.data.deadline = formatDateToKrTime(response.data.deadline);

      // 새로 생성된 작업을 기존 작업 목록에 추가
      setTasks((prevTasks) => [response.data, ...prevTasks]);

      setOpenCreateDialog(false);

      alert("새 작업이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.error("오류 :", error);

      // 실패 시 서버 오류 메시지 표시
      if (error.response) {
        alert(`서버 오류: ${error.response.data.message || "알 수 없는 오류"}`);
      } else {
        alert("작업 생성 실패했습니다.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)} // 작업 작성 다이얼로그 열기
        style={{ marginBottom: "20px" }}
      >
        추가하기
      </Button>
      {/* 작업 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">작업명</TableCell>
              <TableCell align="center">담당자</TableCell>
              <TableCell align="center">우선순위</TableCell>
              <TableCell align="center" colSpan={3}>
                기간
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTasks.map((task) => (
              <TableRow
                key={task.taskId}
                onClick={() => handleTaskClick(task)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center">{task.status}</TableCell>
                <TableCell align="center">{task.title}</TableCell>
                <TableCell align="center">{task.assignedUser}</TableCell>
                <TableCell align="center">{task.taskPriority}</TableCell>
                <TableCell align="right">{task.startDate}</TableCell>
                <TableCell align="center">~</TableCell>
                <TableCell align="left">{task.deadline}</TableCell>
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

      {/* 작업 상세 다이얼로그 */}
      {/* 수정 모드 off일 때는 null 반영 */}
      {/* 수정 모드 on일 때는 수정할 수 있는 TextField로 변경 */}
      {/* Task 상세 레이아웃은 TaskDetail에서 작업*/}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent style={{ overflow: "auto", maxHeight: "100vh" }}>
          <DialogTitle>
            {isEditing ? (
              <TextField
                label="제목"
                fullWidth
                value={editedTask?.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            ) : null}
          </DialogTitle>
          <DialogTitle>
            {isEditing ? (
              <FormControl fullWidth>
                <InputLabel>우선순위</InputLabel>
                <Select
                  value={editedTask?.taskPriority}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      taskPriority: e.target.value,
                    })
                  }
                >
                  <MenuItem value="HIGH">상</MenuItem>
                  <MenuItem value="MEDIUM">중</MenuItem>
                  <MenuItem value="LOW">하</MenuItem>
                </Select>
              </FormControl>
            ) : null}
          </DialogTitle>
          <DialogTitle>
            {isEditing ? (
              <FormControl fullWidth>
                <InputLabel>상태</InputLabel>
                <Select
                  value={editedTask?.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
                >
                  <MenuItem value="INCOMPLETE">미진행</MenuItem>
                  <MenuItem value="ONGOING">진행중</MenuItem>
                  <MenuItem value="FINISH">완료</MenuItem>
                </Select>
              </FormControl>
            ) : null}
          </DialogTitle>
          {isEditing ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="작업 시작 일"
                // value={editedTask.startDate}
                onChange={(date) => setEditedTask({...editedTask, startDate: formatDateToKrTime(date),})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="작업 마감 일"
                // value={editedTask.deadline}
                onChange={(date) => setEditedTask({...editedTask, deadline: formatDateToKrTime(date),})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          ) : null}

          {isEditing ? (
            <TextField
              label="내용"
              fullWidth
              multiline
              rows={10}
              value={editedTask?.content}
              onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
              style={{ marginBottom: "20px", marginTop: "20px" }}
            />
          ) : (
            <TaskDetail task={selectedTask} />
          )}
          <DialogActions>
            {isEditing ? (
              <Button onClick={handleSaveEdit}>저장</Button>
            ) : (
              <>
                <Button onClick={handleEdit}>수정</Button>
                <Button
                  onClick={() => handleDelete(selectedTask)}
                  color="error"
                >
                  삭제
                </Button>
              </>
            )}
            <Button onClick={handleCloseDialog}>닫기</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* 작업 작성 다이얼로그 */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>작업 내용 작성</DialogTitle>
        <DialogContentText>
          <TextField
            label="제목"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel>우선순위</InputLabel>
            <Select
              value={newTask.taskPriority}
              onChange={(e) =>
                setNewTask({ ...newTask, taskPriority: e.target.value })
              }
            >
              <MenuItem value="HIGH">상</MenuItem>
              <MenuItem value="MEDIUM">중</MenuItem>
              <MenuItem value="LOW">하</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel>상태</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="INCOMPLETE">미진행</MenuItem>
              <MenuItem value="ONGOING">진행중</MenuItem>
              <MenuItem value="FINISH">완료</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="작업 시작 일"
              value={newTask.startDate}
              onChange={(date) => setNewTask({ ...newTask, startDate: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
              label="작업 마감 일"
              value={newTask.deadline}
              onChange={(date) => setNewTask({ ...newTask, deadline: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={10}
            value={newTask.content}
            onChange={(e) =>
              setNewTask({ ...newTask, content: e.target.value })
            }
            style={{ marginTop: "20px" }}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary">
            닫기
          </Button>
          <Button onClick={handleCreateTask} color="primary">
            등록하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskBoard;

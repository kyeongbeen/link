import React, { useState } from "react";
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
import { DialogContent, DialogContentText } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form } from "react-router-dom";

/**
 * 추후 API 연동을 할 때 useState의 author 추가
 */

const TaskBoard = () => {
  const tasksPerPage = 5; // 작업 페이지당 작업 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 작업 페이지
  const [selectedTask, setSelectedTask] = useState(null); // 선택된 작업
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부
  const [editedTask, setEditedTask] = useState(null); // 수정 중인 작업
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // 글 작성 다이얼로그 열림 여부
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    priority: "하",
    status: "미진행",
    startDate: null, // 작업 시작 일
    endDate: null, // 작업 마감 일
    date: null, // 작성 일
  });

  // 날짜 형식 변환 함수
  const formatDateToKrTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleString("ko-KR", options).replace(",", "");
  };

  // 작업 목록 데이터 (더미 데이터)
  const [tasks, setTasks] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      title: `작업명 ${index + 1}`,
      author: `담당자 ${index + 1}`,
      priority: index % 3 === 0 ? "상" : index % 3 === 1 ? "중" : "하",
      status: index % 3 === 0 ? "진행중" : index % 3 === 1 ? "미진행" : "완료",
      content: `작업 ${index + 1}의 내용입니다.`,
      startDate: formatDateToKrTime(new Date()),
      endDate: formatDateToKrTime(new Date()),
      date: formatDateToKrTime(new Date()),
    }))
  );

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

  // 작업 수정
  const handleEdit = () => {
    setIsEditing(true); // 수정 모드로 변경
  };

  const handleSaveEdit = () => {
    // 날짜 포맷팅 
    const updatedTask = {
      ...editedTask,
      startDate: formatDateToKrTime(editedTask.startDate),
      endDate: formatDateToKrTime(editedTask.endDate),
    };

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setIsEditing(false); // 수정 모드 해제
    setSelectedTask(updatedTask); // 수정된 게시글로 선택된 게시글 변경
  };

  // 작업 삭제
  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== selectedTask.id)
    );
    handleCloseDialog();
  };

  // 새로운 작업 추가
  const handleCreateTask = () => {
    if (
      newTask.title.trim() &&
      newTask.content.trim() &&
      newTask.startDate &&
      newTask.endDate
    ) {
      const newTaskData = {
        id: tasks.length + 1,
        ...newTask,
        author: `작업자 ${tasks.length + 1}`, // 작성자는 임시로 게시글 id로 설정
        startDate: formatDateToKrTime(newTask.startDate),
        endDate: formatDateToKrTime(newTask.endDate),
        date: formatDateToKrTime(new Date()),
      };
      setTasks((prevTasks) => [newTaskData, ...prevTasks]);
      setNewTask({
        title: "",
        content: "",
        priority: "하",
        status: "미진행",
        startDate: null,
        endDate: null,
      });
      setOpenCreateDialog(false);
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
        <Table sx={{ minWidth: 850 }} aria-label="게시글 목록">
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
                key={task.id}
                onClick={() => handleTaskClick(task)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center">{task.status}</TableCell>
                <TableCell align="center">{task.title}</TableCell>
                <TableCell align="center">{task.author}</TableCell>
                <TableCell align="center">{task.priority}</TableCell>
                <TableCell align="right">{task.startDate}</TableCell>
                <TableCell align="center">~</TableCell>
                <TableCell align="left">{task.endDate}</TableCell>
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent style={{ overflow: "auto", maxHeight: "80vh" }}>
          <DialogTitle>
            {isEditing ? (
              <TextField
                fullWidth
                value={editedTask?.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            ) : (
              selectedTask?.title
            )}
          </DialogTitle>
          <DialogTitle>
            {isEditing ? (
              <FormControl fullWidth>
                <InputLabel id="priority-label">우선순위</InputLabel>
                <Select
                  labelId="priority-label"
                  value={editedTask?.priority}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, priority: e.target.value })
                  }
                >
                  <MenuItem value="상">상</MenuItem>
                  <MenuItem value="중">중</MenuItem>
                  <MenuItem value="하">하</MenuItem>
                </Select>
              </FormControl>
            ) : (
              selectedTask?.priority
            )}
          </DialogTitle>
          <DialogTitle>
            {isEditing ? (
              <FormControl fullWidth>
                <InputLabel id="status-label">상태</InputLabel>
                <Select
                  labelId="status-label"
                  value={editedTask?.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
                >
                  <MenuItem value="미진행">미진행</MenuItem>
                  <MenuItem value="진행중">진행중</MenuItem>
                  <MenuItem value="완료">완료</MenuItem>
                </Select>
              </FormControl>
            ) : (
              selectedTask?.status
            )}
          </DialogTitle>
          
          {isEditing ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="작업 시작 일"
                // value={editedTask?.startDate}
                onChange={(date) =>
                  setEditedTask({ ...editedTask, startDate: date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="작업 마감 일"
                // value={editedTask?.endDate}
                onChange={(date) =>
                  setEditedTask({ ...editedTask, endDate: date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          ) : (
            <DialogTitle>
              {selectedTask?.startDate} ~ {selectedTask?.endDate}
            </DialogTitle>
          )}
          {isEditing ? (
            <TextField
              style={{marginBottom: "20px"}} 
              fullWidth
              multiline
              rows={10}
              value={editedTask?.content}
              onChange={(e) =>
                setEditedTask({ ...editedTask, content: e.target.value })
              }
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
                <Button onClick={handleDelete} color="error">
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
            <InputLabel id="priority-label">우선순위</InputLabel>
            <Select
              labelId="priority-label"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <MenuItem value="상">상</MenuItem>
              <MenuItem value="중">중</MenuItem>
              <MenuItem value="하">하</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="status-label">상태</InputLabel>
            <Select
              labelId="status-label"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="미진행">미진행</MenuItem>
              <MenuItem value="진행중">진행중</MenuItem>
              <MenuItem value="완료">완료</MenuItem>
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
              value={newTask.endDate}
              onChange={(date) => setNewTask({ ...newTask, endDate: date })}
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
            style={{ marginBottom: "20px", marginTop: "20px" }}
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

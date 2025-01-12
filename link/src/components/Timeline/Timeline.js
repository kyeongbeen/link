import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Dialog, DialogActions, Button} from "@mui/material";
import TimelineTaskDetail from "./TimelineTaskDetail";
import { useProjectId } from "../Auth/ProjectIdContext";
import { useUser } from "../Auth/UserContext"
import axios from 'axios';

const Timeline = () => {
    const calendarRef = useRef(null);
    const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
    const [selectedTask, setSelectedTask] = useState(null); // 선택된 작업
    const [isEditing, setIsEditing] = useState(false); // 수정중인지?
    const [taskList, setTaskList] = useState([]);
    const { projectId } = useProjectId();
    const { user } = useUser();

    // APi 호출
    const getTaskList = ( projectId ) => {
      const URL = "/task/lists?projectId=" + projectId;
      const response = fetch(URL);
      let tasks = response.json();
      return tasks;
    }

    // 우선순위 한글로 변경
    const getPriority = (priority) => {
      switch(priority) {
        case 'HIGH':
          return '상';
          
        case 'MEDIUM':
          return '중';

        case 'LOW':
          return '하';

        default:
          return '없음';
      }
    }

    // 상태 한글로 변경
    const getStatus = (status) => {
      switch(status) {
        case 'FINISH':
          return '완료';

        case 'ONGOING':
          return '진행중';

        case 'INCOMPLETE':
          return '미완료';

        case 'DELAY':
          return '지연';
      
        default:
          return '없음'
      }
    }
    
    // 기간 설정
    const getPeriod = (startDate, endDate) => {
      if (startDate == null) {
        return endDate;
      } else if (endDate == null) {
        return startDate;
      } else {
        return startDate + " ~ " + endDate;
      }
    }

    // 다이얼로그 닫을때 state 변수 세팅
    const closeDialog = () => {
      setOpenDialog(false);
      setIsEditing(false);
    }

    const setTask = (task) => {
      setSelectedTask(task);
      setOpenDialog(true);
    }

    const handleTaskUpdate = (updatedTask) => {
      setSelectedTask(updatedTask);
      setIsEditing(false);
    }

const getTasks = async (projectId) => {
  console.log(projectId);
  try {
    const response = await axios.get(
      `http://localhost:8080/task/lists?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


// form-data를 사용하기 위해서 fetch 를 사용해서 API 호출
const postLogin = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  const URL = "http://localhost:8080/login";
  fetch(URL, {
    method: 'POST',
    cache: 'no-cache',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return data;
  });
}

// 데이터 요청 및 이벤트 추가 함수
const fetchAndSetTasks = async (calendar, projectId) => {
  const loginInfo = await postLogin('1@link.com', '1');
  const tasks = await getTasks(projectId);
  if (!Array.isArray(tasks)) {
    console.error("Fetched tasks are not an array:", tasks);
    return;
  }
  setTaskList(tasks); // taskList 업데이트

  tasks.forEach((task) => {
    const event = {
      id: task.taskId,
      title: task.title,
      start: task.startDate || task.deadline,
      end: task.deadline,
    };
    calendar.addEvent(event);
  });

  console.log(loginInfo);
};

useEffect(() => {
  const calendar = new Calendar(calendarRef.current, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    height: "auto",
    locale: "ko",
    eventClick: function (info) {
      const taskId = info.event.id;
      const taskIndex = taskList.findIndex((task) => { return task.taskId == taskId })
      console.log(taskId);
      console.log(taskIndex);
      


      if (taskIndex === -1) {console.error(`Task not found for event ID: ${taskId}`); return;}
        const task = taskList[taskIndex];
          setTask({
            id: task.taskId,
            assignedUser: task.assignedUser,
            assignedUserName: task.assignedUserName,
            title: task.title,
            startDate: task.startDate,
            endDate: task.deadline,
            startDateToEndDate: getPeriod(task.startDate, task.deadline),
            content: task.content,
            taskPriority: getPriority(task.taskPriority),
            taskStatus: getStatus(task.status),
          });
          setOpenDialog(true);
    },
  });

  fetchAndSetTasks(calendar, projectId); // 데이터 요청 및 이벤트 추가
  calendar.render();
}, []);


  return (
    <div>
        <div ref={calendarRef} ></div>
          <Dialog open={openDialog} onClose={() => closeDialog()} maxWidth="sm" fullWidth>
                  <>
                    <TimelineTaskDetail selectedTask = {selectedTask} />
                    <DialogActions>
                      <Button onClick={() => closeDialog()} color="primary">닫기</Button>
                    </DialogActions>
                  </> 
          </Dialog>
    </div>      
  );
}

export default Timeline;
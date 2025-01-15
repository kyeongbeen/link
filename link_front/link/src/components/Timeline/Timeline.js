import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Dialog, DialogActions, Button} from "@mui/material";
import TimelineTaskDetail from "./TimelineTaskDetail";
import { useProjectId } from "../Auth/ProjectIdContext";
import { useUser } from "../Auth/UserContext"
import axios from "axios";
import dayjs from "dayjs";

const Timeline = () => {
    const calendarRef = useRef(null);
    const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
    const [selectedTask, setSelectedTask] = useState(null); // 선택된 작업
    const [isEditing, setIsEditing] = useState(false); // 수정중인지?
    const [taskList, setTaskList] = useState([]);
    const { projectId } = useProjectId();
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    
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
      const startedDate = startDate.substring(0, 10);
      const endedDate = endDate.substring(0, 10);
      
      if (startDate == null) {
        return endedDate;
      } else if (endedDate == null) {
        return startedDate;
      } else {
        return startedDate + " ~ " + endedDate;
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

    const getNextDay = (date) => {
      const temp = new Date(date);
      temp.setDate(temp.getDate());
      const year = temp.getFullYear();
      const month = (temp.getMonth() + 1).toString().padStart(2, '0');
      const getDate = temp.getDate().toString().padStart(2, '0');
      console.log(`${year}-${month}-${getDate}`)
      return `${year}-${month}-${getDate}`;
    }

    useEffect(() => {
      const getTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/task/lists?projectId=${projectId}`, {
              headers: { Authorization: `Bearer ${user.token}` },
          });
          const taskEvents = response.data.map(task => ({
            id: task.taskId,
            title: task.title,
            start: task.startDate.substring(0, 10),
            end: getNextDay(task.deadline),
          }));
          setEvents(taskEvents);
          setTaskList(response.data);
          return response.data; // 데이터
        } catch (error) {
          console.error("Error fetching tasks:", error);
          return [];
        }
      };
      getTasks();
    },[]);

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
        events,
        eventClick: function (info) {
          const taskId = info.event.id;
          const taskIndex = taskList.findIndex((task) => task.taskId == taskId )
          
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
      calendar.render();
    }, [taskList]);



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
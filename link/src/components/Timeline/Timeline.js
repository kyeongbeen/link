import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider} from "@mui/material";


const Timeline = () => {
    const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
    const [selectedEvent, setSelectedEvent] = useState(null);
    let taskList;

    // APi 호출
    const getTaskList = async ( projectId ) => {
      const URL = "http://localhost:8080/task/lists?projectId=" + projectId;
      const response = await fetch(URL);
      let tasks = await response.json();
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

    // 받아온 데이터를 event에 등록
    const addEventToCalendar = async ( calendar, projectId ) => {
      taskList = await getTaskList(projectId);
      taskList.forEach(task => {
        if (task.startDate == null) { 
          calendar.addEvent({
            id: task.taskId,
            title: task.title,
            start: task.deadline
          });
        } else if(task.deadline == null) {
          calendar.addEvent({
            id: task.taskId,
            title: task.title,
            start: task.startDate
          });
        }
        else {
          calendar.addEvent({
            id: task.taskId,
            title: task.title,
            start: task.startDate,
            end: task.deadline
          });
        }
      });
    };

    // 달력 기본 세팅
    let calendarRef = useRef(null);
    useEffect(() => {
            // 
            let calendar = new Calendar(calendarRef.current, {
              plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
              initialView: "dayGridMonth",
              headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next'
              },
              height: "auto",
              locale: "ko",
              eventClick: function(info) {
                const taskId = info.event.id;
                const task = taskList[taskList.findIndex((task)=> task.taskId = taskId)]
                
                setSelectedEvent({
                  id: task.taskId,
                  assignedUser: task.assignedUser,
                  title: task.title,
                  startDateToEndDate : getPeriod(task.startDate, task.deadline),
                  content: task.content,
                  taskPriority: getPriority(task.taskPriority),
                  taskStatus: getStatus(task.status),
                });
                setOpenDialog(true);
              }
            });

////////////////////                                프로젝트 Id를 파싱받을 수 있게 해야함                             ///////////////////////

            addEventToCalendar(calendar, 1);
            calendar.render();
    }, []);

  return (
    <div>
        <div ref={calendarRef} ></div>
        {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>이벤트 정보</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <Grid container spacing={0}>

                <Grid item xs={12}>
                  <Typography variant="h6" color="black" sx={{wordWrap: "break-word"}}>{selectedEvent.title}</Typography>
                </Grid>

                <Divider sx={{ my:2, width:"100%" }} />

                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">우선순위</Typography>
                  <Typography variant="body1">{selectedEvent.taskPriority}</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">상태</Typography>
                    <Typography variant="body1">{selectedEvent.taskStatus}</Typography>
                  </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">기간</Typography>
                      <Typography variant="body1">{selectedEvent.startDateToEndDate}</Typography>
                    </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">내용</Typography>
                      <Typography variant="body1" sx={{wordWrap: "break-word"}}>{selectedEvent.content}</Typography>
                    </Grid>
                
              </Grid>
            </Box>
            
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
    </div>      
  );
}

export default Timeline;
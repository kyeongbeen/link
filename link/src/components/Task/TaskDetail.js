import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { Typography, Box, Grid, Divider } from "@mui/material";

const TaskDetail = ({ task }) => {
  // task가 null인 경우 렌더링하지 않음
  if (!task) {
    return null;
  }

  return (
    <DialogContent>
      <Box>
        <Grid container spacing={2}>
          {/* 작업 제목 */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              작업 제목
            </Typography>
            <Typography variant="body1">{task.title}</Typography>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 우선순위 */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              우선순위
            </Typography>
            <Typography variant="body1">{task.taskPriority}</Typography>
          </Grid>

          {/* 상태 */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              상태
            </Typography>
            <Typography variant="body1">{task.status}</Typography>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 진행기간 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              진행기간
            </Typography>
            <Typography variant="body1">
              {task.startDate} ~ {task.deadline}
            </Typography>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 담당자 */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              담당자
            </Typography>
            <Typography variant="body1">{task.assignedUserName}</Typography>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 내용 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              내용
            </Typography>
            <Typography variant="body1">{task.content}</Typography>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  );
};

export default TaskDetail;

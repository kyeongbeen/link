import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { Typography, Box, Grid2, Divider } from "@mui/material";

const TaskDetail = ({ task }) => {
  // task가 null인 경우 렌더링하지 않음
  if (!task) {
    return null;
  }

  return (
    <DialogContent>
      <Box>
        <Grid2 container spacing={2}>
          {/* 작업 제목 */}
          <Grid2 item xs={12}>
            <Typography variant="h6" color="primary">
              작업 제목
            </Typography>
            <Typography variant="body1">{task.title}</Typography>
          </Grid2>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 우선순위 */}
          <Grid2 item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              우선순위
            </Typography>
            <Typography variant="body1">{task.priority}</Typography>
          </Grid2>

          {/* 상태 */}
          <Grid2 item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              상태
            </Typography>
            <Typography variant="body1">{task.status}</Typography>
          </Grid2>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 진행기간 */}
          <Grid2 item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              진행기간
            </Typography>
            <Typography variant="body1">
              {task.startDate} ~ {task.endDate}
            </Typography>
          </Grid2>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 담당자 */}
          <Grid2 item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              담당자
            </Typography>
            <Typography variant="body1">{task.author}</Typography>
          </Grid2>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* 내용 */}
          <Grid2 item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              내용
            </Typography>
            <Typography variant="body1">{task.content}</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </DialogContent>
  );
};

export default TaskDetail;

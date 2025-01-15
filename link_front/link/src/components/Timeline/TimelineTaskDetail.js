import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider} from "@mui/material";

const TimelineTaskDetail = ( {selectedTask} ) => {
    if(!selectedTask) return null;
    return (
        <DialogContent>
            {selectedTask && (
              <Box>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="black" sx={{wordWrap: "break-word"}}>{selectedTask.title}</Typography>
                  </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">우선순위</Typography>
                    <Typography variant="body1">{selectedTask.taskPriority}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">상태</Typography>
                    <Typography variant="body1">{selectedTask.taskStatus}</Typography>
                  </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">진행기간</Typography>
                    <Typography variant="body1">{selectedTask.startDateToEndDate}</Typography>
                  </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">담당자</Typography>
                    <Typography variant="body1">{selectedTask.assignedUserName}</Typography>
                  </Grid>

                  <Divider sx={{ my:2, width:"100%" }} />

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">내용</Typography>
                    <Typography variant="body1" sx={{wordWrap: "break-word"}}>{selectedTask.content}</Typography>
                  </Grid>
                  
                </Grid>
              </Box>  
            )}
        </DialogContent>
    );
}

export default TimelineTaskDetail;
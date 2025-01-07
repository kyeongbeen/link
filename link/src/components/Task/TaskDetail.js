import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const TaskDetail = ({ task, onClose }) => {
  // task가 null인 경우 렌더링하지 않도록 처리
  // 처리해 주지 않으면 닫기 버튼을 눌렀을 때 오류 발생
  if (!task) {
    return null;
  }
  return (
    <DialogContent>
      <DialogContentText>
        <p>
          <strong>작성자:</strong> {task.author}
        </p>
        <p>{task.content}</p>
      </DialogContentText>
    </DialogContent>
  );
};

export default TaskDetail;

import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// 페이지 콘텐츠 컴포넌트 (컨텐츠 내용물)
function Dashboard() {
  const taskData = {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    notStartedTasks: 0,
  };
  return (
    <Box
      sx={{
        width: "100%", // 부모 Box의 너비를 100%로 설정
        px: 3, // 좌우 여백 추가
        pt: 3, // 위쪽 여백 추가 (좌우 여백과 동일하게 설정)
      }}
    >
      <Grid2
        container
        spacing={2} // 카드 간 간격
        sx={{
          width: "100%", // Grid 컨테이너가 부모 요소를 채움
          justifyContent: "space-between", // 카드 간 간격을 균등하게
        }}
      >
        {[
          { title: "총 작업", count: taskData.totalTasks, color: "primary" },
          { title: "완료된 작업", count: taskData.completedTasks, color: "success.main" },
          { title: "진행중인 작업", count: taskData.inProgressTasks, color: "warning.main" },
          { title: "미완료 작업", count: taskData.notStartedTasks, color: "error.main" },
        ].map((task, index) => (
          <Grid2 
            item
            xs={12} // 모바일: 한 줄에 1개
            sm={6}  // 태블릿: 한 줄에 2개
            md={3}  // 데스크탑: 한 줄에 4개
            sx={{
              flex: "1 1 0", // 아이템이 동일한 비율로 공간을 차지하도록 설정
              maxWidth: "calc(25% - 16px)", // 각 카드가 한 행의 최대 25%를 차지 (간격 포함)
            }}
            key={index}
          >
            <Card
              sx={{
                width: "100%", // 카드가 그리드 셀의 너비를 채움
                height: "100%", // 카드가 그리드 셀의 높이를 채움
                borderRadius: 2, // 약간의 곡선 처리
              }}
            >
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="h4" color={task.color}>
                  {task.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Dashboard;
import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import DashboardBarChart from './DashboardBarChart';
import AuthAPI from '../Auth/AuthAPI';
import { useProjectId } from '../Auth/ProjectIdContext';

const Dashboard = () => {
  // 상태 정의
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useProjectId();

  // 페이지 콘텐츠 컴포넌트 (컨텐츠 내용물)
  const [taskData, setTaskData] = useState ({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    inCompletedTasks: 0,
  });

 

  // API 호출
  useEffect(() => {
    const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IjFAbGluay5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzM2NjczMjgzLCJleHAiOjE3MzY3NTk2ODN9.TSeemNbA8yYU5CNRYVojBAg1giMA88BZuipvlcwtJdE";
    const getDashboard = async () => {
      try {
        console.log(projectId);
        // API로부터 데이터 가져오기
        const response = await axios.get(`http://localhost:8080/dashboard/status?projectId=${1}`,
          {
            headers:{Authorization: token}
          }
        );
        
        
        // 작업 상태별 개수 계산
        const finishedTasks = response.data.finishedTasks;
        const delayedTasks = response.data.delayedTasks;
        const ongoingTasks = response.data.ongoingTasks;
        const inCompletedTasks = response.data.incompleteTasks;

        // 상태 업데이트
        setTaskData({
          totalTasks: response.data.totalTasks,
          finishedTasks,
          delayedTasks,
          ongoingTasks,
          inCompletedTasks,
        });
      } catch (error) {
        console.error("Error fetching task data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

   // 로딩 상태 표시
   if (loading) return <div>Loading...</div>;
   if (error) return <div>진행하실 프로젝트를 먼저 선택하여 주세요.</div>;

  
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
          { title: "TOTAL", count: taskData.totalTasks, color: "primary" },
          { title: "FINISH", count: taskData.finishedTasks, color: "success.main" },
          { title: "ONGOING", count: taskData.ongoingTasks, color: "warning.main" },
          { title: "INCOMPLETE", count: taskData.inCompletedTasks, color: "error.main" },
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

      {/* 막대 차트 섹션 */}
      <Box
        sx={{
          mt: 4, // 상단과 차트 섹션 간 간격
          p: 2,
          backgroundColor: "#fff", // 차트 배경색
          borderRadius: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          height: 400, // 차트 높이
        }}
      >
        <DashboardBarChart data={taskData} />
      </Box>
    </Box>
  );


}

export default Dashboard;
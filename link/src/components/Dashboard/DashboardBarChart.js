import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';

// Chart.js 필수 설정 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardBarChart = ({ data }) => {
  // 차트 데이터 정의
  const chartData = {
    labels: ["총작업", "완료", "진행중", "미완료"],
    datasets: [
      {
        // label: "총작업",
        data: [
          data.totalTasks,
          data.finishedTasks,
          data.ongoingTasks,
          data.inCompletedTasks,
        ],
        backgroundColor: [
          "#1976D2", // Primary
          "#388E3C", // Success
          "#FBC02D", // Warning
          "#D32F2F", // Error
        ],
      },
    ],
  };

  // 차트 옵션 정의
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 차트의 비율을 부모 요소에 맞춤
    plugins: {
      legend: {
        display: false, // 범례 표시 여부
        position: "top", // 범례 위치
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y축이 0에서 시작
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default DashboardBarChart;
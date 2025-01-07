import * as React from 'react';
import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from "@toolpad/core/Account";
import { useNavigate } from "react-router-dom";
// 컴포넌트 가져오기
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Board from "../Board/Board";
import TaskBoard from "../Task/TaskBoard";

// 내비게이션 메뉴 설정
const NAVIGATION = [
  { kind: "header", title: "프로젝트" },
  { segment: "link", title: "Link", icon: <LinkIcon /> },
  { segment: "project", title: "Project", icon: <ImportContactsIcon /> },
];

// 테마 생성
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

// 페이지 콘텐츠 컴포넌트 (컨텐츠 내용물)
function DemoPageContent({ pathname }) {
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
        px: 2, // 좌우 여백 추가
        pt: 2, // 위쪽 여백 추가 (좌우 여백과 동일하게 설정)
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

DemoPageContent.propTypes = { pathname: PropTypes.string.isRequired };

// 계정 사이드바 미리보기 컴포넌트
function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

// 계정 목록 데이터
const accounts = [
  {
    id: 1,
    name: "연결고리",
    email: "link@gmail.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
    projects: [{ id: 3, title: "Project X" }],
  },
  {
    id: 2,
    name: "Bharat MUI",
    email: "bharat@mui.com",
    color: "#8B4513",
    projects: [{ id: 4, title: "Project A" }],
  },
];

// 사이드바 계정 팝오버 내용
function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{ justifyContent: "flex-start", width: "100%", columnGap: 2 }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.95rem",
                  bgcolor: account.color,
                }}
                src={account.image ?? ""}
                alt={account.name ?? ""}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

// 미리보기 컴포넌트 생성 함수
const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

// 사이드바 계정 컴포넌트
function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini]
  );
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = { mini: PropTypes.bool.isRequired };

// 세션 데이터 설정 (임시)
const demoSession = {
  user: {
    name: "연결고리",
    email: "link@gmail.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

// 탭 스타일링 및 컴포넌트
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
    },
  })
);

// 탭 UI 컴포넌트
function CustomizedTabs({ setPathname, pathname }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue); // 탭 변경 시 상태 업데이트

    // 각 탭에 맞는 경로 설정
    switch (newValue) {
      case 0:
        setPathname("/dashboard");
        break;
      case 1:
        setPathname("/taskboard");
        break;
      case 2:
        setPathname("/timeline");
        break;
      case 3:
        setPathname("/board");
        break;
      default:
        setPathname("/dashboard");
    }
  };

  // segment가 "project"일 때 탭 UI 숨기기
  if (pathname.includes("project")) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <AntTabs value={value} onChange={handleChange} aria-label="custom tabs">
        <AntTab label="대시보드" />
        <AntTab label="작업" />
        <AntTab label="타임라인" />
        <AntTab label="게시판" />
      </AntTabs>
    </Box>
  );
}

// 대시보드 레이아웃 컴포넌트 (전체 레이아웃)
function DashboardLayoutAccountSidebar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [pathname, setPathname] = React.useState("/dashboard"); // 초기 경로 설정

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => ({
    signIn: () => { setSession(demoSession); },
    signOut: () => { navigate('/'); }, // 로그아웃 시 홈으로 이동
  }), []);

  
  // const Dashboard = () => {
  //   const [dashboardTask, setDashboardTask] = useState ({
  //     totalTasks: 0,
  //     completedTasks: 0,
  //     inProgressTasks: 0,
  //     incompletedTasks: 0,
  //   });

  //   React.useEffect(() => {

  //   })

  

  // }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <Box sx>
          {/* 네비게이션 segment가 Link일 때만 탭 UI 표시 */}
          {<CustomizedTabs setPathname={setPathname} pathname={pathname} />}
        </Box>
        {/* 페이지 콘텐츠 컴포넌트에 pathname 전달 */}
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import LinkIcon from "@mui/icons-material/Link";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from "@toolpad/core/Account";
import { useNavigate } from "react-router-dom";
import { useUser } from './Auth/UserContext';

// 컴포넌트 가져오기
import Board from "./Board/Board";
import TaskBoard from "./Task/TaskBoard";
import Dashboard from "./Dashboard/Dashboard";
import Timeline from "./Timeline/Timeline";
import Project from "./Project/Project";
import { logout } from "./Auth/AuthAPI";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 추가

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
}
);

// 페이지 콘텐츠 컴포넌트 (컨텐츠 내용물)
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <Typography>현재 페이지 주소 {pathname}</Typography>{" "} */}
      {/* 현재 페이지 주소 출력(임시)*/}
      {/* 페이지 주소에 따라 컴포넌트 렌더링 */}
      {/* pathname만 넣어주면 컨텐츠에 반영 되는 코드 */}
      {pathname === "/link" && <Dashboard />}
      {pathname === "/board" && <Board />}
      {pathname === "/taskboard" && <TaskBoard />}
      {pathname === "/timeline" && <Timeline />}
      {pathname === "/project" && <Project />}
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
    name: "",
    image: "https://avatars.githubusercontent.com/u/187992632?v=4",
    projects: [{ id: 3, title: "Project X" }],
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
                {useUser}
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
        {/* 로그아웃 버튼 */}
        <SignOutButton onClick={logout} />
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
/** 
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

SidebarFooterAccount.propTypes = { mini: PropTypes.bool.isRequired };*/

// 세션 데이터 설정 (임시)
const demoSession = {
  user: {
    name: useUser,
    image: "https://avatars.githubusercontent.com/u/187992632?v=4",
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
        setPathname("/link");
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
        setPathname("/link");
    }
  };

  // segment가 project일 때 탭 UI 숨기기
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
  const [pathname, setPathname] = React.useState("/link"); // link로 초기 경로 설정 (대쉬보드 보이는 화면)

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        logout();
      },
    }),
    []
  );

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

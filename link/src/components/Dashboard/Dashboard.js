import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LinkIcon from '@mui/icons-material/Link';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Account, AccountPreview, AccountPopoverFooter, SignOutButton } from '@toolpad/core/Account';
import Login from '../Auth/Login'; 
import Register from '../Auth/Register'; 
import { useNavigate } from 'react-router-dom';


// 내비게이션 메뉴 설정
const NAVIGATION = [
  { kind: 'header', title: '프로젝트' },
  { segment: 'link', title: 'Link', icon: <LinkIcon /> },
  { segment: 'project', title: 'Project', icon: <ImportContactsIcon /> },
];

// 테마 생성
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

// 페이지 콘텐츠 컴포넌트
function DemoPageContent({ pathname }) {
  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography>현재 페이지 주소 {pathname}</Typography>
      { pathname === '/board' && <Login /> }
      { pathname === '/calculator' && <Register /> }
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
      <AccountPreview variant={mini ? 'condensed' : 'expanded'} handleClick={handleClick} open={open} />
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
  { id: 1, name: 'Bharat Kashyap', email: 'bharatkashyap@outlook.com', image: 'https://avatars.githubusercontent.com/u/19550456', projects: [{ id: 3, title: 'Project X' }] },
  { id: 2, name: 'Bharat MUI', email: 'bharat@mui.com', color: '#8B4513', projects: [{ id: 4, title: 'Project A' }] },
];

// 사이드바 계정 팝오버 내용
function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>Accounts</Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem key={account.id} component="button" sx={{ justifyContent: 'flex-start', width: '100%', columnGap: 2 }}>
            <ListItemIcon>
              <Avatar sx={{ width: 32, height: 32, fontSize: '0.95rem', bgcolor: account.color }} src={account.image ?? ''} alt={account.name ?? ''}>
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }} primary={account.name} secondary={account.email} primaryTypographyProps={{ variant: 'body2' }} secondaryTypographyProps={{ variant: 'caption' }} />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter><SignOutButton /></AccountPopoverFooter>
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
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{ preview: PreviewComponent, popoverContent: SidebarFooterAccountPopover }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: { paper: { elevation: 0, sx: { overflow: 'visible', filter: (theme) => `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`, mt: 1, '&::before': { content: '""', display: 'block', position: 'absolute', bottom: 10, left: 0, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translate(-50%, -50%) rotate(45deg)', zIndex: 0 } } } }
        }
      }}
    />
  );
}

SidebarFooterAccount.propTypes = { mini: PropTypes.bool.isRequired };

// 세션 데이터 설정 (예시)
const demoSession = { user: { name: 'Bharat Kashyap', email: 'bharatkashyap@outlook.com', image: 'https://avatars.githubusercontent.com/u/19550456' } };

// 대시보드 레이아웃 컴포넌트
function DashboardLayoutAccountSidebar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [pathname, setPathname] = React.useState('/Dashboard');
  const router = React.useMemo(() => {
    return { pathname, searchParams: new URLSearchParams(), navigate: (path) => setPathname(String(path)) };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => ({
    signIn: () => { setSession(demoSession); },
    signOut: () => { navigate('/'); },
  }), []);

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
        slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;

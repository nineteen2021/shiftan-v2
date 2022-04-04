import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import LogoImg from "../titleNavbar.svg";
import "../../App.css"
import NotificationListItem from '../NotificationListItem';

const drawerWidth = 240;

//　連想配列を採用
const notification = [
  ["店舗登録がまだ終わっていません", "2022/03/03"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: "#4DC0B2",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navbar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  
  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <a href='localhost:3000' className='App-logo'><img src={LogoImg} alt="logo" className='App-logo'></img></a>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleOpenNotificationMenu}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNotification}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotification)}
              onClose={handleCloseNotificationMenu}
            >
              {/* このメニュータグの中が通知ボタンを押したときに出てくるところ */}
              <List>
                {notification.map((text) => (
                  <>
                    <NotificationListItem primaryText={text[0]} secondaryText={text[1]}/>
                    <Divider />
                  </>
                ))}
              </List>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
      PaperProps={{
        sx: {
        backgroundColor: "#586365",
        color: "white",
        }
      }}>

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#ffffff" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlinedIcon fontSize='large' sx={{ color : "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary='ホーム' />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DriveFileRenameOutlineOutlinedIcon fontSize='large' sx={{ color : "#ffffff" }}/>
            </ListItemIcon>
            <ListItemText primary='シフト作成' />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteOutlinedIcon fontSize='large' sx={{ color : "#ffffff" }}/>
            </ListItemIcon>
            <ListItemText primary='シフト一覧' />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon fontSize='large' sx={{ color : "#ffffff" }}/>
            </ListItemIcon>
            <ListItemText primary='スタッフ管理' />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize='large' sx={{ color : "#ffffff" }}/>
            </ListItemIcon>
            <ListItemText primary='設定'/>
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.contents}
      </Box>
    </Box>
  );
}

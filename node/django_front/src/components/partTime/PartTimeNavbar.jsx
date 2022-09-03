import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import LogoImg from "../titleNavbar.svg";
import "../../App.css"
import NotificationListItem from '../NotificationListItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as routerLink } from 'react-router-dom'

const drawerWidth = 240;

//　連想配列を採用
// const notification = [
//   ["店舗登録がまだ終わっていません", "2022/03/03"],
//   ["シフト提出の締め切りが迫っています。", "2022/03/21"],
//   ["シフト提出の締め切りが迫っています。", "2022/03/21"],
//   ["シフト提出の締め切りが迫っています。", "2022/03/21"],
//   ["シフト提出の締め切りが迫っています。", "2022/03/21"],
//   ["シフト提出の締め切りが迫っています。", "2022/03/21"],
// ];

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

export default function PartTimeNavbar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  // const handleOpenNotificationMenu = (event) => {
  //   setAnchorElNotification(event.currentTarget);
  // };

  // const handleCloseNotificationMenu = () => {
  //   setAnchorElNotification(null);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
            <Button 
              disableFocusRipple
              disableRipple
              component={routerLink}
              to="/partTimeHome"
            >
              <img src={LogoImg} alt="logo" className='App-logo'></img>
            </Button>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box>
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
            > */}
              {/* このメニュータグの中が通知ボタンを押したときに出てくるところ */}
              {/* <List>
                {notification.map((text) => (
                  <>
                    <NotificationListItem primaryText={text[0]} secondaryText={text[1]} />
                    <Divider />
                  </>
                ))}
              </List>
            </Menu>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mb:'60px' }}>
        <DrawerHeader />
        {props.contents}
      </Box>
    </Box>
  );
}

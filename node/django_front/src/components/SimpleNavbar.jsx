import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LogoImg from "./title.svg";
import "../App.css"
import NotificationListItem from './NotificationListItem';

const notification = [
  ["店舗登録がまだ終わっていません", "2022/03/03"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
  ["シフト提出の締め切りが迫っています。", "2022/03/21"],
];
export default function SimpleNavbar() {
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  
  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
          background: "#4DC0B2"
      }}>
        <Toolbar>
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
    </Box>
  );
}

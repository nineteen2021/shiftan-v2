import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountSettings from './AccountSettings';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleClickOpen}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="会員情報変更" secondary="メールアドレス、パスワードなどの会員情報を変更します" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <QuestionMarkIcon />
                                </ListItemIcon>
                                <ListItemText primary="よくある質問" secondary="よくある質問を表示します" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContactMailIcon />
                                </ListItemIcon>
                                <ListItemText primary="お問い合わせ" secondary="外部ページに移動します" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <GavelIcon />
                                </ListItemIcon>
                                <ListItemText primary="利用規約" secondary="利用規約を確認することができます" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                会員情報編集
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                保存
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <AccountSettings />
                    </Box>
                </Dialog>
            </>
        </>
    );
}
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
import LogoutIcon from '@mui/icons-material/Logout';
import PartTimeAccountSettings from './PartTimeAccountSettings';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Terms from '../function/Terms';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CheckStore from './CheckStore';
import BottomNavbar from './BottomNavbar';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PartTimeSettings() {

    const [selectedItem, setSelectedItem] = React.useState('')

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("PartTimeAccountSettings")}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="??????????????????" secondary="??????????????????????????????????????????????????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("CheckStore")}>
                                <ListItemIcon>
                                    <StorefrontIcon />
                                </ListItemIcon>
                                <ListItemText primary="??????????????????" secondary="?????????????????????????????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon>
                                    <QuestionMarkIcon />
                                </ListItemIcon>
                                <ListItemText primary="??????????????????" secondary="????????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContactMailIcon />
                                </ListItemIcon>
                                <ListItemText primary="??????????????????" secondary="?????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("term")}>
                                <ListItemIcon>
                                    <GavelIcon />
                                </ListItemIcon>
                                <ListItemText primary="????????????" secondary="????????????????????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("deleteAccount")}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="??????" secondary="???????????????????????????????????????????????????" />
                            </ListItemButton>
                        </ListItem>
                    </List>
            </Box>
            <>
                <Dialog
                    fullScreen
                    open={"PartTimeAccountSettings" === selectedItem}
                    onClose={onCloseDialog}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'sticky' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={onCloseDialog}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                ??????????????????
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <PartTimeAccountSettings />
                    </Box>
                </Dialog>

                <Dialog
                    fullScreen
                    open={"CheckStore" === selectedItem}
                    onClose={onCloseDialog}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'sticky' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={onCloseDialog}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                ??????????????????
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <CheckStore />
                    </Box>
                </Dialog>

                <Dialog open={selectedItem === "term"}
                        onClose={onCloseDialog}
                        scroll="paper"
                        fullWidth="true"
                        maxWidth="md"
                        sx={{mb:'60px'}}
                    >
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                    </DialogContentText>
                        <Terms/>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "deleteAccount"} onClose={onCloseDialog}>
                <DialogTitle>??????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ??????????????????????????????????????????????????????????????????
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>???????????????</Button>
                    <Button onClick={onCloseDialog}>??????</Button>
                </DialogActions>
            </Dialog>
            </>
        </>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

const testUser = {
    firstName: "太郎",
    lastName: "山田",
    mail: "hogehoge@gmail.com",
    userID: "taro0000",
    storeName: "若狭屋渋谷店",
    phoneNumber: "07044039803",
    postalCode: "1500043",
    address: "東京都渋谷区道玄坂1丁目1",
    storeID: "1234567890"
}

export default function AccountSettings() {

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
                            <ListItemButton onClick={() => onOpenDialog("name")}>
                                <ListItemIcon>
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary="氏名" secondary={testUser.lastName + " " + testUser.firstName} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("email")}>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="メールアドレス" secondary={testUser.mail} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("userID")}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="ユーザーID" secondary={testUser.userID} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("password")}>
                                <ListItemIcon>
                                    <KeyIcon />
                                </ListItemIcon>
                                <ListItemText primary="パスワード" secondary="パスワード再設定画面に移動します" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("storeName")}>
                                <ListItemIcon>
                                    <StorefrontIcon />
                                </ListItemIcon>
                                <ListItemText primary="店舗名" secondary={testUser.storeName} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("phoneNumber")}>
                                <ListItemIcon>
                                    <LocalPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="電話番号" secondary={testUser.phoneNumber} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("address")}>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary="店舗住所" secondary={"〒" + testUser.postalCode + " " + testUser.address} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onOpenDialog("storeID")}>
                                <ListItemIcon>
                                    <Grid3x3Icon />
                                </ListItemIcon>
                                <ListItemText primary="店舗ID" secondary={testUser.storeID} />
                            </ListItemButton>
                        </ListItem>
                    </List>
            </Box>

            <Dialog open={selectedItem === "name"} onClose={onCloseDialog}>
                <DialogTitle>氏名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する氏名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="姓"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="名"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "email"} onClose={onCloseDialog}>
                <DialogTitle>メールアドレス</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定するメールアドレスを入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "userID"} onClose={onCloseDialog}>
                <DialogTitle>ユーザーID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定するユーザーIDを入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="userID"
                        label="ユーザーID"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storeName"} onClose={onCloseDialog}>
                <DialogTitle>店舗名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeName"
                        label="店舗名"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "phoneNumber"} onClose={onCloseDialog}>
                <DialogTitle>電話番号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する電話番号を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="電話番号"
                        type="tel"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>
            

            <Dialog open={selectedItem === "address"} onClose={onCloseDialog}>
                <DialogTitle>店舗住所</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗住所を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="postalCode"
                        label="郵便番号"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="住所"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storeID"} onClose={onCloseDialog}>
                <DialogTitle>店舗ID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗IDを入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeID"
                        label="店舗ID"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function NotificationListItem(props) {
    return(
        <ListItem>
            <ListItemText primary={props.primaryText} secondary={props.secondaryText}></ListItemText>
        </ListItem>
    )
}


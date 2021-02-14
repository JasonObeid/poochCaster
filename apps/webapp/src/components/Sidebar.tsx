import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/Inbox";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import React from "react";

import { useAppStyles } from "../app/app.styles";

export default function Sidebar(props) {
    const classes = useAppStyles();

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        props.setSelectedIndex(index);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Button color="primary">
                <Typography variant="h6">poochCaster</Typography>
                <img src="../assets/cat.svg" height="25px" width="auto" alt="cat"></img>
            </Button>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button selected={props.selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <SearchIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                </ListItem>
                <ListItem button selected={props.selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <InboxIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Feed" />
                </ListItem>
                <ListItem button selected={props.selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <SubscriptionsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Subscriptions" />
                </ListItem>
                <ListItem button selected={props.selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <SettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
}

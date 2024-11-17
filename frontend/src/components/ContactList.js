import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    searchField: {
        margin: theme.spacing(2),
        width: '100%',
    },
    iconButton: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    button: {
        margin: theme.spacing(2),
    },
    listItemTextPrimary: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
    },
    listItemTextSecondary: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
    },
}));

const ContactList = ({ contacts, onEdit, onDelete, onView, onCreate, onSearch }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                className={classes.searchField}
                onChange={(e) => onSearch(e.target.value)}
            />
            <List className={classes.list}>
                {contacts.map(contact => (
                    <ListItem key={contact._id} button onClick={() => onView(contact)}>
                        <ListItemText
                            primary={
                                <span className={classes.listItemTextPrimary}>
                                    {contact.firstName} {contact.lastName}
                                </span>
                            }
                            secondary={
                                isSmallScreen
                                    ? (
                                        <span className={classes.listItemTextSecondary}>
                                            {contact.phones ? contact.phones[0] : ''}
                                            <br />
                                            {contact.email}
                                        </span>
                                    )
                                    : (
                                        <span className={classes.listItemTextSecondary}>
                                            {contact.email} | {contact.phones ? contact.phones[0] : ''}
                                        </span>
                                    )
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" className={classes.iconButton} onClick={() => onEdit(contact)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" className={classes.iconButton} onClick={() => onDelete(contact._id)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" className={classes.iconButton} onClick={() => onView(contact)}>
                                <VisibilityIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" className={classes.button} onClick={onCreate}>
                Create Contact
            </Button>
        </div>
    );
};

export default ContactList;
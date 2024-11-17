import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    iconButton: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

const ContactDetails = ({ contact, onEdit, onDelete }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {contact.firstName} {contact.lastName}
                </Typography>
                <Typography color="textSecondary">
                    {contact.email}
                </Typography>
                <Typography variant="body2" component="p">
                    Phones: {contact.phones.join(', ')}
                </Typography>
                <Typography variant="body2" component="p">
                    Company: {contact.company}
                </Typography>
                <Typography variant="body2" component="p">
                    Job Title: {contact.jobTitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Edit">
                    <IconButton className={classes.iconButton} onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton className={classes.iconButton} onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default ContactDetails;
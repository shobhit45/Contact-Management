import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import ConfirmDialog from './components/ConfirmationDialog';
import { fetchContacts as getContacts, deleteContact } from './api';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        paddingTop: theme.spacing(10), // Adjust padding to prevent overlap
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    appBar: {
        top: 0,
        bottom: 'auto',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

const App = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [viewingContact, setViewingContact] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDelete, setConfirmDelete] = useState({ open: false, contactId: null });

    useEffect(() => {
        refreshContacts();
    }, []);

    const refreshContacts = async () => {
        try {
            const { data } = await getContacts();
            setContacts(Array.isArray(data) ? data : []);
            setFilteredContacts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleCreate = () => {
        setEditingContact(null);
        setOpen(true);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setViewingContact(null); // Close the details view
        setOpen(true);
    };

    const handleView = (contact) => {
        setViewingContact(contact);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            refreshContacts();
            setSnackbar({ open: true, message: 'Contact deleted', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error deleting contact', severity: 'error' });
        }
        setConfirmDelete({ open: false, contactId: null });
    };

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = contacts.filter(contact =>
            (contact.firstName && contact.firstName.toLowerCase().includes(lowerCaseQuery)) ||
            (contact.lastName && contact.lastName.toLowerCase().includes(lowerCaseQuery)) ||
            (contact.email && contact.email.toLowerCase().includes(lowerCaseQuery)) ||
            (contact.phones && contact.phones.some(phone => phone.toLowerCase().includes(lowerCaseQuery)))
        );
        setFilteredContacts(filtered);
    };

    const handleClose = () => {
        setOpen(false);
        setViewingContact(null);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container className={classes.root}>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">Contacts</Typography>
                    <IconButton color="inherit" onClick={handleCreate}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ContactList
                contacts={filteredContacts}
                onEdit={handleEdit}
                onDelete={(id) => setConfirmDelete({ open: true, contactId: id })}
                onView={handleView}
                onCreate={handleCreate}
                onSearch={handleSearch}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingContact ? 'Edit Contact' : viewingContact ? 'View Contact' : 'Create Contact'}</DialogTitle>
                <DialogContent>
                    {viewingContact ? (
                        <ContactDetails
                            contact={viewingContact}
                            onEdit={() => handleEdit(viewingContact)}
                            onDelete={() => setConfirmDelete({ open: true, contactId: viewingContact._id })}
                        />
                    ) : (
                        <ContactForm
                            contact={editingContact}
                            refreshContacts={refreshContacts}
                            onClose={handleClose}
                            setSnackbar={setSnackbar}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <ConfirmDialog
                open={confirmDelete.open}
                onClose={() => setConfirmDelete({ open: false, contactId: null })}
                onConfirm={() => handleDelete(confirmDelete.contactId)}
                title="Are you sure you want to delete this contact?"
            />
        </Container>
    );
};

export default App;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { createContact, updateContact } from '../api';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    textField: {
        margin: theme.spacing(1),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    phoneContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    deleteButton: {
        marginLeft: theme.spacing(1),
    },
}));

const ContactForm = ({ contact, refreshContacts, onClose, setSnackbar }) => {
    const classes = useStyles();
    const [form, setForm] = useState({
        firstName: contact?.firstName || '',
        lastName: contact?.lastName || '',
        email: contact?.email || '',
        phones: contact?.phones || [''],
        company: contact?.company || '',
        jobTitle: contact?.jobTitle || '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('phone')) {
            const index = parseInt(name.split('-')[1], 10);
            const newPhones = [...form.phones];
            newPhones[index] = value;
            setForm({ ...form, phones: newPhones });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAddPhone = () => {
        setForm({ ...form, phones: [...form.phones, ''] });
    };

    const handleDeletePhone = (index) => {
        const newPhones = form.phones.filter((_, i) => i !== index);
        setForm({ ...form, phones: newPhones });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.phones.length === 0) {
                setError('At least one phone number is required');
                return;
            }
            if (contact && JSON.stringify(contact) === JSON.stringify(form)) {
                setError('Nothing to update');
                return;
            }
            console.log('Submitting form:', form); // Debugging line
            if (contact) {
                await updateContact(contact._id, form);
                setSnackbar({ open: true, message: 'Contact updated successfully', severity: 'success' });
            } else {
                await createContact(form);
                setSnackbar({ open: true, message: 'Contact created successfully', severity: 'success' });
            }
            refreshContacts();
            onClose();
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting form');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            {error && <Alert severity="error">{error}</Alert>}
            {['firstName', 'lastName', 'email', 'company', 'jobTitle'].map(field => (
                <TextField
                    key={field}
                    label={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                />
            ))}
            {form.phones.map((phone, index) => (
                <div key={`phone-${index}`} className={classes.phoneContainer}>
                    <TextField
                        label={`Phone ${index + 1}`}
                        name={`phone-${index}`}
                        value={phone}
                        onChange={handleChange}
                        className={classes.textField}
                        variant="outlined"
                    />
                    <IconButton
                        className={classes.deleteButton}
                        onClick={() => handleDeletePhone(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
            <Button onClick={handleAddPhone} variant="contained" color="secondary" className={classes.button}>
                Add Phone
            </Button>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                {contact ? 'Update Contact' : 'Add Contact'}
            </Button>
        </form>
    );
};

export default ContactForm;
# Contact Management System

A simple contact management system built with React, Node.js, Express, and MongoDB. This application allows users to create, view, update, and delete contacts. Each contact includes a first name, last name, email, phone numbers, company, and job title.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Technical Decisions](#technical-decisions)
- [How It Works](#how-it-works)

## Features

- Create a new contact
- View contact details
- Update contact information
- Delete a contact
- Search contacts by name, email, or phone number
- Responsive design for mobile and desktop views

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.comshobhit45/Contact-Management.git
    cd Contact-Management
    ```

2. Install dependencies for both the frontend and backend:

    ```sh
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and server port:

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact-management?retryWrites=true&w=majority
    ```

4. Start the backend server:

    ```sh
    cd backend
    npm start
    ```

5. Start the frontend development server:

    ```sh
    cd ../frontend
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Database Schema

The MongoDB schema for the `Contact` model is defined as follows:

```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phones: [{ type: String, required: true }],
    company: String,
    jobTitle: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

```
## Technical Decisions

- **Frontend Framework**: React was chosen for its component-based architecture and ease of state management using hooks.
- **Backend Framework**: Express was chosen for its simplicity and flexibility in building RESTful APIs.
- **Database**: MongoDB was chosen for its schema-less nature and ease of integration with Node.js using Mongoose.
- **Styling**: Material-UI was chosen for its comprehensive set of components and responsive design capabilities.
- **Email Validation**: A regular expression is used to validate email formats on both the frontend and backend.

## How It Works

### Frontend

- **App Component**: The main component that manages the state of contacts, handles CRUD operations, and renders other components.
- **ContactList Component**: Displays a list of contacts with options to view, edit, or delete each contact. It uses Material-UI's `List` and `ListItem` components for styling.
- **ContactForm Component**: A form for creating or updating a contact. It includes fields for first name, last name, email, phone numbers, company, and job title.
- **ContactDetails Component**: Displays detailed information about a contact with options to edit or delete the contact.
- **ConfirmDialog Component**: A reusable confirmation dialog for confirming actions like deleting a contact.

### Backend

- **contactController.js**: Contains the logic for handling CRUD operations on contacts, including email validation and phone number uniqueness checks.
- **contactRoutes.js**: Defines the API endpoints for creating, reading, updating, and deleting contacts.
- **server.js**: Sets up the Express server, connects to MongoDB, and starts the server.

### API Endpoints

- `POST /api/contacts`: Create a new contact
- `GET /api/contacts`: Get all contacts
- `PUT /api/contacts/:id`: Update a contact
- `DELETE /api/contacts/:id`: Delete a contact


# Library Management System

A web-based Library Management System built with Node.js and Express to handle user registration, login, and book management. The project allows users to browse the catalog, view borrowed books, and track overdue book items.

## Features

- **User Registration and Login**: Secure user registration and login system.
- **Book Borrowing and Overdue Tracking**: Displays a list of borrowed books and overdue notifications.
- **Admin Access**: Admin page to manage the book catalog.
- **Session Management**: Makes sure that only certain pages accessible when the user is logged in.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/CodeCultureRepo/LibraryManagementSystem
    cd library-management-system
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Database Setup**:
   - Connect to MySQL db:
    run the following commands:
    mysql -u root -p
    Password: G0ldenSpringEngineering!
   - Update the database connection details in `db/connection.js`.
   - db name: USE library_management

4. **Run the server**:

    ```bash
    node public/server.js
    ```

5. **Access the application**:

   Open http://localhost:3000 in your browser.

## Usage

- **Home Page** (`index.html`): Browse the library catalog and access login/register options.
- **My Account Page** (`account.html`): View borrowed books, check for overdue books, and log out.
- **Admin Page** (`admin.html`): Restricted to admin use for managing the library catalog.

## Project Structure

```plaintext
library-management-system/
├── db/
│   └── connection.js    # Database connection setup
├── public/
│   ├── images/          # Image assets
│   ├── styles.css       # CSS styling for the application
│   └── LMS_image.jpg    # Logo image
│   ├── index.html       # Home page
│   ├── account.html     # User account page
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   └── admin.html       # Admin dashboard
├── server.js            # Main server file
└── README.md            # Project documentation
```

## Routes

- **POST /login**: Authenticates a user and starts a session.
- **POST /register**: Registers a new user.
- **GET /login-status**: Checks if a user is logged in, returns login status.
- **POST /logout**: Logs the user out by ending the session.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL (or any SQL database supported by Node.js)

## License

This project is licensed under the MIT License. See `LICENSE` for more information.

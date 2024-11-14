<?php
// Database connection settings
$host = "localhost";
$dbUser = "abigails";
$dbPassword = "G0ldenSpringEngineering!";
$dbName = "library_management";

// Connect to MySQL database
$conn = new mysqli($host, $dbUser, $dbPassword, $dbName);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve login form data
$username = $_POST['admin_username'];
$password = $_POST['admin_password'];

// Prepare and bind SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT password FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);

// Execute the statement
$stmt->execute();
$stmt->store_result();

// Check if the username exists in the database
if ($stmt->num_rows > 0) {
    // Bind the password hash to a variable and fetch
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();
    
    // Verify the submitted password against the hashed password
    if (password_verify($password, $hashedPassword)) {
        // Start a session and store login status
        session_start();
        $_SESSION['admin_logged_in'] = true;
        
        // Redirect to the admin dashboard
        header("Location: admin_dashboard.html");
        exit();
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "Username not found.";
}

// Close connections
$stmt->close();
$conn->close();
?>

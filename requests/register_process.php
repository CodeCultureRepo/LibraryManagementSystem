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

// Retrieve form data
$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

// Prepare and bind SQL statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, username, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstName, $lastName, $username, $password);

// Execute the statement and check for success
if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>

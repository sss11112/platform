<?php
$servername = "localhost";
$username = "username"; 
$email = "email";
$password = "password";
$dbname = "user_management";

$conn = new mysqli('localhost', 'root','','user_management');
if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]));
}
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into user_management(username, email, password)
        values(?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);
    $stmt->execute();
    echo "registration successfully";
    $stmt->close();
    $conn->close();
}
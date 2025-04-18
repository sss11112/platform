<?php
include 'connect.php'; // ใช้ __DIR__ เพื่อระบุ path ของไฟล์ connect.php

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]));
}

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // ตรวจสอบว่ามี action หรือไม่
    $action = $_POST['action'] ?? null;

    if (!$action) {
        echo json_encode(["status" => "error", "message" => "No action provided"]);
        exit;
    }

    // Debug: แสดงข้อมูลที่ได้รับจาก POST
    error_log("Action: " . $action);
    error_log("POST Data: " . print_r($_POST, true));

    if ($action === "register") {
        $username = $_POST['username'] ?? null;
        $email = $_POST['email'] ?? null;
        $password = $_POST['password'] ?? null;

        // Debug: แสดงข้อมูลที่ได้รับจาก POST
        error_log("Username: " . $username);
        error_log("Email: " . $email);
        error_log("Password: " . $password);

        // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
        if (!$username || !$email || !$password) {
            echo json_encode(["status" => "error", "message" => "Missing required fields"]);
            exit;
        }

        // เข้ารหัสรหัสผ่าน
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // บันทึกข้อมูลลงในฐานข้อมูล
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Registration successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    } elseif ($action === "login") {
        $username = $_POST['username'] ?? null;
        $password = $_POST['password'] ?? null;

        // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
        if (!$username || !$password) {
            echo json_encode(["status" => "error", "message" => "Missing required fields"]);
            exit;
        }

        // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
        $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashed_password);
            $stmt->fetch();

            if (password_verify($password, $hashed_password)) {
                echo json_encode(["status" => "success", "message" => "Login successful"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid password"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Username not found"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
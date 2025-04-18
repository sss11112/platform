<?php 
session_start();
include 'connect.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Startup Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="sidebar">
        <h2>THE SUN SNACK</h2>
        <ul>
            <li><a href="accounting.html">Accounting</a></li>
            <li><a href="stock.html">Stock</a></li>
            <li><a href="task.html">Task Management</a></li>
            <li><a href="time_log.html">Time Log</a></li>
            <li><a href="directory.html">Directory</a></li>
            <li><a href="absence.html">Absence</a></li>
            <li><a href="reports.html">Reports</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    </div>
    <div class="main-content">
        <header>
            <h1>Dashboard</h1>
            <div class="user-settings">
                <span id="welcome-text">Welcome</span>
                <img src="default-user.png" alt="User Avatar" id="user-avatar">
                <?php if (isset($_SESSION['email'])): ?>
                    <!-- แสดงปุ่ม Logout เมื่อเข้าสู่ระบบ -->
                    <a href="logout.php" class="logout-button">Logout</a>
                <?php else: ?>
                    <!-- แสดงปุ่ม Sign In เมื่อยังไม่ได้เข้าสู่ระบบ -->
                    <a href="register.php" class="login-button">Sign In</a>
                <?php endif; ?>
            </div>
        </header>
        
        <section class="popup-container">
            <div class="popup total-income">
                <h3>Total Income</h3>
                <p id="total-income">$0</p>
                <span class="popup-date" id="income-date"></span>
            </div>
            <div class="popup total-expenses">
                <h3>Total Expenses</h3>
                <p id="total-expenses">$0</p>
                <span class="popup-date" id="expenses-date"></span>
            </div>
            <div class="popup net-profit">
                <h3>Net Profit</h3>
                <p id="net-profit">$0</p>
            </div>
            <div class="popup employee-checkin">
                <h3>Checked-In Employees</h3>
                <p id="employee-checkin">0</p>
                <span class="popup-date" id="checkin-date"></span>
            </div>
            <div class="popup stock-status">
                <h3>Stock Remaining</h3>
                <p id="stock-count">0</p>
                <span class="popup-date" id="stock-date"></span>
            </div>
            <div class="popup temperature">
                <h3>Temperature</h3>
                <p id="temperature">Loading...</p>
                <span id="temperature-city"></span>
            </div>
        </section>
    </div>

</body>
</html>
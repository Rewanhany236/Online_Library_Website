<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Profile</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<h1 class="profile-title">My Profile</h1>

<div class="profile-container">
    <div class="profile-card">

        <h2 id="welcome"></h2>

       
        <p><strong>Username:</strong> <span id="username"></span></p>
        <p><strong>Email:</strong> <span id="email"></span></p>
        <p><strong>Role:</strong> <span id="role"></span></p>

        
        <label>New Password</label>
        <input type="password" id="newPassword" placeholder="Enter new password">

        <button class="btn" onclick="changePassword()">Change Password</button>

        <button class="btn" onclick="logout()">Logout</button>

    </div>
</div>

<script src="profile.js"></script>

</body>
</html>

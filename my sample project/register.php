<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars(trim($_POST['name']));
  $email = htmlspecialchars(trim($_POST['email']));
  $password = htmlspecialchars(trim($_POST['password']));
  $confirmPassword = htmlspecialchars(trim($_POST['confirmPassword']));

  if ($password !== $confirmPassword) {
    echo "Passwords do not match!";
    exit; 
  }

  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  $conn = new mysqli("localhost", "root", "", "farmsmart");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $name, $email, $hashedPassword);

  if ($stmt->execute()) {
    echo "✅ Registration successful!";
  } else {
    echo "❌ Error: " . $stmt->error;
  }

  $stmt->close();
  $conn->close();
}
?>

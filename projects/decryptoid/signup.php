<?php
  require_once 'login.php';
  require_once 'sanitizefunctions.php';
  require_once 'checkfunctions.php';

  $conn = new mysqli($hn,$un,$pw,$db);
  if ($conn->connect_error)die($conn->connect_error);

  if (!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['email'])) {
    $username = sanitizeMySQL($conn, $_POST['username']);
    $email = sanitizeMySQL($conn, $_POST['email']);
    $password = sanitizeMySQL($conn, $_POST['password']);
    $check = validate_username($username).validate_email($email).validate_password($password);
    if ($check == "") {
      $salt1 = "qm&h*";
      $salt2 = "pg!@";
      $token = hash("ripemd128", "$salt1$password$salt2");

      $query = "SELECT * FROM users WHERE username='$username' OR email='$email'";
      $result = $conn->query($query);
      if (!$result) die($connection->error);
      if ($result->num_rows == 0) {
        add_user($conn, $username, $email, $token);
        header("Location: loginpage.php");
      }
      else echo "User already Exists<br>";
    }
    else echo $check;
  }

  echo <<<_END
  <html>
    <head>
      <title>Signup Page</title>
      <script src="validate.js"></script>
    </head>
    <body>
      <form method="post" action="signup.php" enctype="multipart/form-data" onsubmit="return validate(this)">
      Enter Email:
      <input type="text" name="email"><br><br>
      Usernames can contain English letters, digits, '-', and '_'.<br>
      Create Username:
      <input type="text" name="username"><br><br>
      Passwords must be at least 8 characters, contain an upper and lowercase letter, and a number.<br>
      Create Password:
      <input type="password" name="password">
      <br><br>
      <input type="submit" name="signup" value="Sign Up"><br>
      </form>
    </body>
  </html>
_END;

  function add_user($connection, $un, $email, $pw) {
    $query = "INSERT INTO users VALUES('$un', '$email', '$pw')";
    $result = $connection->query($query);
    if (!$result) die($connection‐>error);
  }
 ?>

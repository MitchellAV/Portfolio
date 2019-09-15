<?php
  require_once 'login.php';
  require_once 'sanitizefunctions.php';
// Create connection with MySQL database
  $conn = new mysqli($hn, $un, $pw, $db);
  if ($conn->connect_error)die($conn->connect_error);
  session_start();
  if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $un_temp = sanitizeMySQL($conn, $_POST['username']);
    $pw_temp = sanitizeMySQL($conn, $_POST['password']);
    $salt1 = "qm&h*";
    $salt2 = "pg!@";
    $token = hash("ripemd128", "$salt1$pw_temp$salt2");
    $query = "SELECT * FROM users WHERE username = '$un_temp'";
    $result = $conn->query($query);
    $row = $result->fetch_array(MYSQLI_NUM);
    if (!$result) die($conn->error);
    elseif ($token == $row[2]) {
      $result->close();
      $_SESSION['check'] = hash('ripemd128', $_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']);
      $_SESSION['id'] = session_id();
      $_SESSION['auth'] = true;
      $_SESSION['user'] = $un_temp;
      header("Location: index.php");
    }
    else echo "Incorrect Username / Password<br>Please try again.";
  }
  echo <<<_END
  <html>
    <head>
      <title>Login Page</title>
    </head>
    <body>
      <form method="post" action="loginpage.php" enctype="multipart/form-data">
      Username:
      <input type="text" name="username"><br>
      Password:
      <input type="password" name="password">
      <br>
      <input type="submit" name="login" value="Log in">
      </form>
      Click <a href="signup.php">here</a> to signup
    </body>
  </html>
_END;
 ?>

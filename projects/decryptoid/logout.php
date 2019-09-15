<?php
  require_once 'sanitizefunctions.php';
  session_start();
  destroy_session_and_data();
  echo "You have been logged out.<br>Click <a href='loginpage.php'>here</a> to return to login.<br>";
 ?>

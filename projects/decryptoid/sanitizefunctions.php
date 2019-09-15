<?php
// Sanitizing functions
  function sanitizeString($var) {
    if(get_magic_quotes_gpc()) $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
  }
  function sanitizeMySQL($connection, $var) {
    $var = $connection->real_escape_string($var);
    $var = sanitizeString($var);
    return $var;
  }
  function fixFileName($name){
    return strtolower(preg_replace("[^A‐Za‐z0‐9.]", "", $name));
  }
  function destroy_session_and_data() {
    $_SESSION = array();
    setcookie(session_name(), '', time() - 2592000, '/');
    session_destroy();
  }
 ?>

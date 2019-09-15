<?php
  function validate_username($field){
    if ($field == "") return "No Username was entered<br>";
    elseif (preg_match("/[^a-zA-Z0-9_-]/", $field)) {
      return "Only letters, numbers, - and _ in usernames<br>";
    }
    return "";
  }

  function validate_password($field){
    $limit = 8;
    if ($field == "") return "No Password was entered<br>";
    elseif (strlen($field) < $limit) {
      return "Passwords must be at least $limit characters<br>";
    }
    elseif (!preg_match("/[a-z]/", $field) ||
            !preg_match("/[A-Z]/", $field) ||
            !preg_match("/[0-9]/", $field)) {
      return "Passwords require 1 each of a-z, A-Z, and 0-9<br>";
    }
    return "";
  }

  function validate_email($field){
    if ($field == "") return "No Email was entered<br>";
    elseif (!((strpos($field, ".") > 0) && (strpos($field, "@") > 0)) ||
            !preg_match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $field)) {
      return "The Email address is invalid<br>";
    }
    return "";
  }
 ?>

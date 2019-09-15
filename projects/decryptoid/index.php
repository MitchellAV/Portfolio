<?php
  require_once 'login.php';
  require_once 'sanitizefunctions.php';
  require_once 'project_functions.php';

// Create connection with MySQL database
  $conn = new mysqli($hn, $un, $pw, $db);
  if ($conn->connect_error)die($conn->connect_error);

  session_start();
  date_default_timezone_set("America/Los_Angeles");
// Prevent Session Fixation
  if (!isset($_SESSION['initiated'])) {
    session_regenerate_id();
    $_SESSION['id'] = session_id();
    $_SESSION['initiated'] = 1;
  }
  if (!isset($_SESSION['count'])) $_SESSION['count'] = 0;
  else ++$_SESSION['count'];

// Check if the user is logged in
  if (isset($_SESSION['user']) && $_SESSION['auth'] == true) {
    $session_user = $_SESSION['user'];
// Prevent Session Hijacking
    if ($_SESSION['check'] != hash('ripemd128', $_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT'])) header("Location: logout.php");


    $cipherResult = array('','','','','','','');
// Use Cipher for Input String
    if (!empty($_POST['input_content'])) {
      $entry = sanitizeMySQL($conn,$_POST['input_content']);
      $cipherResult = useCipher($conn, $entry);
// Post results to inputcontents table
      $query = "INSERT INTO inputcontent (username, created_at, cipher, method, message, translated, key1, key2) VALUES ('$session_user',date('Y-m-d H:i:s'),'$cipherResult[0]','$cipherResult[1]','$cipherResult[2]','$cipherResult[3]','$cipherResult[4]','$cipherResult[5]')";
      $result = $conn->query($query);
      if (!$result)die("Database access failed 1: ".$conn->error);
    }
// Update database with text file submission
    if (isset($_POST['upload'])) {
      $filename = fixFileName($_FILES['filename']['name']);
      switch($_FILES['filename']['type']) {
        case 'text/plain' : $ext = 'txt'; break;
        default : $ext = ''; break;
      }
// Check file type of Uploaded file and only allow for .txt extensions
      if ($ext) {
        move_uploaded_file($_FILES['filename']['tmp_name'], $filename);
        $file = fopen($filename,"r");
        $time = date('Y-m-d H:i:s');
// Read and use Cipher on each line of file and upload to database
        while(!feof($file)) {
          $line = sanitizeMySQL($conn,fgets($file));
          $cipherResult = useCipher($conn, $line);
          $query = "INSERT INTO filecontent (username, created_at, cipher, method, message, translated, key1, key2) VALUES ('$session_user','$time','$cipherResult[0]','$cipherResult[1]','$cipherResult[2]','$cipherResult[3]','$cipherResult[4]','$cipherResult[5]')";
          $result = $conn->query($query);
          if (!$result)die("Database access failed 1: ".$conn->error);
        }
        fclose($file);
      }
      else echo "Uploaded file is not a text file.<br><br>";
    }

// HTML Page
    echo <<<_END
    <html>
      <head>
        <title>Final Project: Decryptoid</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="script.js"></script>
      </head>
      <body>
        You are now logged in as $session_user<br>
        Click <a href="logout.php">here</a> to logout<br><br>

        <form method="post" action="index.php" enctype="multipart/form-data" onsubmit="return keycheck(this)">
        <b>Cipher Options:</b><br>
        Cipher:
        <select id="ciphers" name="ciphers">
        <option>Select a Cipher</option>
        <option id="simplesub" value="simplesub">Simple Substitution</option>
        <option id="double" value="double">Double Transposition</option>
        <option id="rc4" value="rc4">RC4</option>
        </select><br>
        Encryption/Decryption:
        <select id="method" name="method">
        <option id="encrypt" value="encrypt">Encryption</option>
        <option id="decrypt" value="decrypt">Decryption</option>
        </select><br><br>
        Message:
        <input type="text" name="input_content"><br>
        <div class="key1">
        Key #1:
          <input type="text" name="key1"><br>
        </div>
        <div class="key2">
        Key #2:
          <input type="text" name="key2"><br>
        </div><br>
        <input type="submit" value="Use Cipher"><br><br>
        Translation: $cipherResult[3]
        <output name="result"></output><br>
        Key: $cipherResult[4]<br>$cipherResult[5]
        <output name="result"></output><br><br>
        Upload a text file:<br>
        <input type="file" name="filename"><br>
        <input type="submit" name="upload" value="Upload and use Cipher"><br><br>

        </form>
      </body>
    </html>
_END;

// Print Users' Cipher history from database
// Input History
    $query = "SELECT * FROM inputcontent WHERE username = '$session_user'";
    $result = $conn->query($query);
    if (!$result)die("Database access faild 3: ".$conn->error);

    $rows = $result->num_rows;
    echo "<b>$session_user's Input History</b><br>";
    echo "<table><tr><th>Time</th><th>Cipher</th><th>Method</th><th>Message</th><th>Cipher Text</th><th>Key 1</th><th>Key2</th></tr>";
    for ($j = 0 ; $j < $rows ; ++$j)
    {
      $result->data_seek($j);
      $row = $result->fetch_array(MYSQLI_NUM);
      echo "<tr>";
      for ($k = 1 ; $k < 8; ++$k) echo "<td>$row[$k]</td>";
      echo "</tr>";
    }
    echo "</table><br>";

// File Upload History
    $query = "SELECT * FROM filecontent WHERE username = '$session_user'";
    $result = $conn->query($query);
    if (!$result)die("Database access faild 3: ".$conn->error);

    $rows = $result->num_rows;
    echo "<b>$session_user's File History</b><br>";
    echo "<table><tr><th>Time</th><th>Cipher</th><th>Method</th><th>Message</th><th>Cipher Text</th><th>Key 1</th><th>Key2</th></tr>";
    for ($j = 0 ; $j < $rows ; ++$j)
    {
      $result->data_seek($j);
      $row = $result->fetch_array(MYSQLI_NUM);
      echo "<tr>";
      for ($k = 1 ; $k < 8; ++$k) echo "<td>$row[$k]</td>";
      echo "</tr>";
    }
    echo "</table><br>";
  }
  else {
    header("Location: logout.php");
  }

// Close connections to database
  if (isset($result)) {
    $result->close();
  }
  $conn->close();


// Functions
function useCipher($conn, $entry){
  $translated = "";
  $cipher = sanitizeMySQL($conn,$_POST['ciphers']);
  $method = sanitizeMySQL($conn,$_POST['method']);
  $key1 = sanitizeMySQL($conn,$_POST['key1']);
  $key2 = sanitizeMySQL($conn,$_POST['key2']);

  if ($cipher == "simplesub") {
    if ($method == "encrypt") {
      $tempArr = simple_sub($entry);
      $translated = $tempArr[0];
      $key1 = $tempArr[1];
    }
    else if ($method == "decrypt") {
      if (isset($_POST['key1'])) {
        $translated = simple_sub($entry,$key1);
      }
    }
  }
  elseif ($cipher == "double") {
    if (isset($_POST['key1']) && isset($_POST['key2'])) {
      if ($method == "encrypt") {
        $translated = double_transposition($entry, $key1, $key2);
      }
      else if ($method == "decrypt") {
        $translated = double_detransposition($entry, $key1, $key2);
      }
    }
    else {
      echo "<br>Please enter two keys for Double Transposition.<br>";
    }
  }
  elseif ($cipher == "rc4") {
    if (isset($_POST['key1'])) {
      if ($method == "encrypt" || $method == "decrypt") {
        $translated = RC4($entry, $key1);
      }
    }
    else {
      echo "<br>Please enter a key for RC4.<br>";
    }
  }
  return array($cipher,$method,$entry,$translated,$key1,$key2);
}

// SQL Tables
  $query = "CREATE TABLE inputcontent (
    username VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    cipher VARCHAR(32) NOT NULL,
    method VARCHAR(16) NOT NULL,
    message VARCHAR(255) NOT NULL,
    translated VARCHAR(255) NOT NULL,
    key1 VARCHAR(64),
    key2 VARCHAR(64))
    ENGINE MyISAM";
  $query = "CREATE TABLE filecontent (
    username VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    cipher VARCHAR(32) NOT NULL,
    method VARCHAR(16) NOT NULL,
    message VARCHAR(255) NOT NULL,
    translated VARCHAR(255) NOT NULL,
    key1 VARCHAR(64),
    key2 VARCHAR(64))
    ENGINE MyISAM";
  $query = "CREATE TABLE users (
    username VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password CHAR(32) NOT NULL)
    ENGINE MyISAM";
 ?>

<?php
require_once 'login.php';

echo file_get_contents("page.html");

// echo <<<_END
// <!DOCTYPE html>
// <html lang="en">
//
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>Biomass WebApp</title>
//   <link rel="stylesheet" href="style.css">
//   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js" charset="utf-8"></script>
//   <script src="script.js" charset="utf-8"></script>
//   </script>
// </head>
//
// <body id="content">
//
//   <div id="title">
//     <h1>Biomass Systhesizer Project</h1>
//     <img src="/imgs/sjsu logo.png" alt="" width="400px" height="75px">
//   </div>
//
//   <div id="toggles">
//     <div class="summary button0">View all sensors</div>
//     <div class="flowrate button1">Mass flow rate</div>
//     <div class="temp button2 ">Temperatures</div>
//     <div class="pressure button3">Pressures</div>
//     <div class="irradiance button4">Irradiance</div>
//     <div class="mixer button5">Mixer Speed</div>
//   </div>
//
//   <div id="visual">
//     <div class="data">Current Value
//       <div class="flowrate 1">Mass flow rate: 10 g/s</div>
//       <div class="temp hidden 2">Temperatures: 32 C</div>
//       <div class="pressure hidden 3">Pressures: 5 psi</div>
//       <div class="irradiance hidden 4">Irradiance: 200 W/m2</div>
//       <div class="mixer hidden 5">Mixer Speed: 200 RPM</div>
//     </div>
//     <div id="charts">
//       <div class="flowrate hidden 0">
//         <div class="flowrate hidden 1">Mass flow rate: 10 g/s</div>
//         <div class="temp hidden 2">Temperatures: 32 C</div>
//         <div class="pressure hidden 3">Pressures: 5 psi</div>
//         <div class="irradiance hidden 4">Irradiance: 200 W/m2</div>
//         <div class="mixer hidden 5">Mixer Speed: 200 RPM</div>
//       </div>
//       <div class="flowrate 1">
//         <img src="/imgs/massflowrate.png" alt="" width="600px" height="420px">
//       </div>
//       <div class="tempChart hidden 2">
//         <img src="/imgs/temps.png" alt="" width="600px" height="420px">
//       </div>
//       <div class="pressureChart hidden 3">
//         <img src="/imgs/pressure.png" alt="" width="600px" height="420px">
//       </div>
//       <div class="irradianceChart hidden 4">
//         <img src="/imgs/irradiance.png" alt="" width="600px" height="420px">
//       </div>
//       <div class="mixerChart hidden 5">
//         <img src="/imgs/angularvelocity.png" alt="" width="600px" height="420px">
//       </div>
//     </div>
//   </div>
// </body>
//
// </html>
// _END;




// Create connection with MySQL database
$conn = new mysqli($hn,$un,$pw,$db);
if ($conn->connect_error)die("Connection failed: ".$conn->connect_error);
echo "Connected successfully<br>";

// $query = "CREATE TABLE test (
//   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   data INT UNSIGNED)
//   ENGINE MyISAM";
//
// //$query = "DROP TABLE test";
// $result = $conn->query($query);
// if (!$result)die("Database access faild: ".$conn->error);



// Display table of Logged in Users uploaded Content
  $query = "SELECT * FROM test";
  $result = $conn->query($query);
  if (!$result)die("Database access faild: ".$conn->error);

  $rows = $result->num_rows;
  echo "<table><tr><th>ID</th><th>Data</th></tr>";
  for ($j = 0 ; $j < $rows ; ++$j)
  {
    $result->data_seek($j);
    $row = $result->fetch_array(MYSQLI_NUM);
    echo "<tr>";
    for ($k = 0 ; $k < 2; ++$k) echo "<td>$row[$k]</td>";
    echo "</tr>";
  }
  echo "</table><br>";

// Close connections to database
$conn->close();
//   session_start();
// // Prevent Session Fixation
//   if (!isset($_SESSION['initiated']))
//   {
//     session_regenerate_id();
//     $_SESSION['id'] = session_id();
//     $_SESSION['initiated'] = 1;
//   }
//   if (!isset($_SESSION['count'])) $_SESSION['count'] = 0;
//   else ++$_SESSION['count'];
//
// // Check if the user is logged in
//   if (isset($_SESSION['user']) && $_SESSION['auth'] == true) {
//     $session_user = $_SESSION['user'];
// // Prevent Session Hijacking
//     if ($_SESSION['check'] != hash('ripemd128', $_SERVER['REMOTE_ADDR'] .
//     $_SERVER['HTTP_USER_AGENT'])) header("Location: logout.php");
//
//     echo "You are now logged in as $session_user<br><br>";


// Display table of Logged in Users uploaded Content
    // $query = "SELECT input_content, file_content FROM content WHERE username = '$session_user'";
    // $result = $conn->query($query);
    // if (!$result)die("Database access faild 3: ".$conn->error);
    //
  //   $rows = $result->num_rows;
  //   echo "$session_user's Content<br>";
  //   echo "<table><tr><th>Input Content</th><th>File Content</th></tr>";
  //   for ($j = 0 ; $j < $rows ; ++$j)
  //   {
  //     $result->data_seek($j);
  //     $row = $result->fetch_array(MYSQLI_NUM);
  //     echo "<tr>";
  //     for ($k = 0 ; $k < 2; ++$k) echo "<td>$row[$k]</td>";
  //     echo "</tr>";
  //   }
  //   echo "</table><br>";
  // }
  // else {
  //   if (!empty($_POST['username']) && !empty($_POST['password'])) {
  //     $un_temp = sanitizeMySQL($conn, $_POST['username']);
  //     $pw_temp = sanitizeMySQL($conn, $_POST['password']);
  //     $salt1 = "qm&h*";
  //     $salt2 = "pg!@";
  //     $token = hash("ripemd128", "$salt1$pw_temp$salt2");
  //     $query = "SELECT * FROM users WHERE username = '$un_temp'";
  //     $result = $conn->query($query);
  //     $row = $result->fetch_array(MYSQLI_NUM);
  //     if (!$result) die($conn->error);
  //     elseif ($token == $row[2]) {
  //       $result->close();
  //       $_SESSION['check'] = hash('ripemd128', $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
  //       $_SESSION['id'] = session_id();
  //       $_SESSION['auth'] = true;
  //       $_SESSION['user'] = $un_temp;
  //       header("Location: hw5authentication.php");
  //     }
  //     else echo "Incorrect Username / Password<br>Please try again.";
  //   }
  // }


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

// SQL Tables
  $query = "CREATE TABLE content (
    username VARCHAR(64) NOT NULL,
    input_content VARCHAR(255),
    file_content TEXT)
    ENGINE MyISAM";
  $query = "CREATE TABLE users (
    username VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password CHAR(32) NOT NULL)
    ENGINE MyISAM";
 ?>

<?php
require_once '/BiomassProject/login.php';
// Create connection with MySQL database
$conn = new mysqli($hn,$un,$pw,$db);
if ($conn->connect_error)die("Connection failed: ".$conn->connect_error);

$limitNum = "60";

$query = "( SELECT * FROM test ORDER BY id DESC LIMIT $limitNum ) ORDER BY id ASC";

$result = $conn->query($query);
if (!$result)die("Database access faild: ".$conn->error);

$dbdata = array();

while($row = $result->fetch_array(MYSQLI_ASSOC)){
  $dbdata[] = $row;
}
 echo json_encode($dbdata);
// Close connections to database
$conn->close();
 ?>

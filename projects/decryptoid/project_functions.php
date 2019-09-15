<?php
function RC4($msg, $key){
  $msg = preg_replace('/ /', '', $msg);
  $s = array();
  $l = strlen($key);
  for ($i=0; $i < 256; $i++) {
    $s[$i] = $i;
  }
  $j = 0;
  for ($i=0; $i < 256; $i++) {
    $j = ($j + $s[$i] + ord($key[$i % $l])) % 256; 
    $s = swap($s, $i, $j);
  }
  $i = 0;
  $j = 0;
  $output = "";
  for ($k=0; $k < strlen($msg); $k++) {
    $i = ($i + 1) % 256;
    $j = ($j + $s[$j]) % 256;
    $s = swap($s, $i, $j);
    $keystream = $s[($s[$i] + $s[$j]) % 256];
    $output .= chr(ord($msg[$k]) ^ $keystream);
  }
  return $output;
}

function swap($s, $i, $j){
  $temp = $s[$i];
  $s[$i] = $s[$j];
  $s[$j] = $temp;
  return $s;
}

function double_transposition($input, $key1, $key2){
  $first = transposition($input, $key1);
  $second = transposition($first,$key2);
  return $second;
}

function double_detransposition($input, $key1, $key2){
  $first = decrypt_transpose($input, $key2);
  $a = strlen($key1);
  $b = strlen($first);
  $offset = $b % $a;
  if ($offset > 0) {
    $first = substr($first,0,-$offset);
  }
  $second = decrypt_transpose($first, $key1);
  return $second;
}

function decrypt_transpose($input, $key){
  $input = preg_replace('/[^A-Za-z0-9]/','',$input);
  $input = strtoupper($input);
  $arr = array(array());
  $order = preg_replace('/ /','',getOrder($key));
  $output = "";
  $pointer = 0;
  $match = 0;
  $index = "";
  $depth = floor(strlen($input)/strlen($key));
  for ($k=0; $k < strlen($order); $k++) {
    if ($order[$k] == $match) {
      $match++;
      $index .= $k;
      $k = -1;
    }
  }
  for ($j=0; $j < strlen($key); $j++) {
    for ($i=0; $i < $depth; $i++) {
      if ($pointer < strlen($input)) {
        $arr[$i][$index[$j]] = $input[$pointer];
        $pointer++;
      }
    }
  }
  for ($i=0; $i < $depth; $i++) {
    for ($j=0; $j < strlen($key); $j++) {
      $output .= $arr[$i][$j];
    }
  }
  return $output;
}

function transposition($input, $key){
  $input = preg_replace('/[^A-Za-z0-9]/','',$input);
  $input = strtoupper($input);
  $arr = array(array());
  $order = preg_replace('/ /','',getOrder($key));
  $output = "";
  $pointer = 0;
  $depth = ceil(strlen($input)/strlen($key));
  for ($i=0; $i < $depth; $i++) {
    for ($j=0; $j < strlen($key); $j++) {
      if ($pointer < strlen($input)) {
        $arr[$i][$j] = $input[$pointer];
      }else{
        $arr[$i][$j] = "X";
      }
      $pointer++;
    }
  }
  $check = 0;
  for ($i=0; $i < strlen($key); $i++) {
    $index = currentIndex($order,$check);
    $check++;
    $j=0;
    while($j < $depth) {
      $output .= $arr[$j][$index];
      $j++;
    }
  }
  return $output;
}

function currentIndex ($string, $check){
  $index = INF;
  for ($i=0; $i < strlen($string); $i++) {
    if ((int)$string[$i] == $check) {
      $index = $i;
    }
  }
  return $index;
}

function getOrder($key){
  $key = preg_replace('/[^A-Za-z]/','',$key);
  $key = strtoupper($key);
  $arr = array_unique(str_split($key));
  sort($arr);
  $order = '';
  for ($i=0; $i < strlen($key) ; $i++) {
    $letter = $key[$i];
    for ($j=0; $j < count($arr); $j++) {
      if ($letter == $arr[$j]) {
        $order .= "$j ";
        break;
      }
    }
  }
  return $order;
}

function simple_sub($input, $key = null){
  $input = preg_replace('/[^A-Za-z]/','',$input);
  $input = strtoupper($input);
  $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $crypted = "";
  // If no key is provided then encrypt string using generated key
  if ($key == null){
    $key = genKey();
    for ($i=0; $i < strlen($input); $i++) {
      $pos = strpos($letters,$input[$i]);
      $crypted .= $key[$pos];
    }
    $count = 0;
    $length = strlen($crypted);
    // Add spaces after every 5 letters
    while($count < $length){
      if (($count+1) % 6 == 0) {
        $crypted = substr_replace($crypted,' ',$count,0);
      }
      $count++;
    }
    // Returns an array with encrypted string and key
    return array($crypted,$key);
  }
  // If key is provided then decrypt string using key
  else {
    for ($i=0; $i < strlen($input); $i++) {
      $pos = strpos($key,$input[$i]);
      $crypted .= $letters[$pos];
    }
    // Returns decrypted string
    return strtolower($crypted);
  }
}

function genKey(){
  $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $key = "";
  $i = strlen($letters)-1;
  while($i > -1){
    $index = rand(0,$i);
    $key .= $letters[$index];
    $letters = substr_replace($letters,"",$index,1);
    $i--;
  }
  return $key;
}
 ?>

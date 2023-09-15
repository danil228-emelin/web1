<?php
date_default_timezone_set('Europe/Moscow');
$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];
if (!is_numeric($x)||!is_numeric($y)||!is_numeric($r)){
    http_response_code( 400);
    return;
}
if (($x>=0 && $x<=$r/2 && $y<=0 && $y>=-$r/2)||
    ($x<=0 && $x>=-$r/2 && $y<=0 && $y>=-$r)||
    ($x<=0 && $x>=-$r && $y>=0 && $y<=$r)){

    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'True', 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];

} else {
    $now = DateTime::createFromFormat('U.u', microtime(true));
    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'False', 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];
}
echo json_encode($data);

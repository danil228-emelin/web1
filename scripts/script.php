<?php
$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];
$time = $_POST['currentTime'];

if (($x <= $r / 2 && $y <= -$r / 2 && $x >= 0 && $y <= 0) ||
    ($x <= -$r / 2 && $y <= -$r && $x <= 0 && $y <= 0) ||
    ($x <= -$r && $y <= $r && $x <= 0 && $y >= 0)) {

    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'True', 'request_time' => $time, 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];
    echo json_encode($data);

} else {
    $now = DateTime::createFromFormat('U.u', microtime(true));
    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'False', 'request_time' => $time, 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];
    echo json_encode($data);
}

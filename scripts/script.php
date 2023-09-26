<?php
date_default_timezone_set('Europe/Moscow');
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$x=$data['x'];
$y=$data['y'];
$r=$data['r'];
$pattern_xy = '/-?[1-5]/';
$pattern_r = '/[1-4](\.5)?/';
if (!is_numeric($x)||!is_numeric($y)||!is_numeric($r)){
    http_response_code( 400);
    return;
}
if (!preg_match($pattern_xy, $x)) {
    $arr = array('message' => 'x is invalid.Must be in range [-3,5]', 'x' => $x);
    http_response_code(400);
    echo json_encode($arr);
    return;
}
if (!preg_match($pattern_xy, $y)) {
    $arr = array('message' => 'Y is invalid.Must be in range [-5,3]', 'y' => $y);
    http_response_code(400);
    echo json_encode($arr);
    return;
}
if (!preg_match($pattern_r, $r)) {
    $arr = array('message' => 'R is invalid.Must be in range [1,4] with step 0.5', 'r' => $r);
    http_response_code(400);
    echo json_encode($arr);
    return;
}
if (($x >= 0 && $x <= $r / 2 && $y <= 0 && $y >= -$r / 2) ||
    ($x <= 0 && $x >= -$r / 2 && $y <= 0 && $y >= -$r) ||
    ($x <= 0 && $x >= -$r && $y >= 0 && $y <= $r)) {

    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'True', 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];

} else {
    $now = DateTime::createFromFormat('U.u', microtime(true));
    $data = ['x' => $x, 'y' => $y, 'r' => $r, 'boolean' => 'False', 'response_time' => date("H:i:s.") . gettimeofday()["usec"]];
}
echo json_encode($data);

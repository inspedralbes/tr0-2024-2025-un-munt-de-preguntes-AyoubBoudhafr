<?php
$servername = "localhost";
$database = "Ayoub";
$username = "Ayoub";
$password = "1234";

$conn = mysqli_connect($servername, $username, $password, $database);

$result = mysqli_query($conn,"SELECT pregunta FROM preguntes");

$array_preguntas = mysqli_fetch_array($result, MYSQL_BOTH);

shuffle($array_preguntas);
$preguntasDesordenadas = array_slice($array_preguntas, 0, 10);
$totRespostes = [];
foreach ($preguntasDesordenadas as $senseResposta) {
    $totRespostes[] = array(
        'id' => $senseResposta['id'],
        'pregunta' => $senseResposta['pregunta'],
        'respostes' => $senseResposta['respostes'],
        'imatge' => $senseResposta['imatge'],
    );
}

$totRespostes2 = json_encode(["preguntes" => $totRespostes]);
// echo $totRespostes2;
?>

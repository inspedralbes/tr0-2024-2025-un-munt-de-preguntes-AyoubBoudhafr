<?php
session_start();

header('Content-Type: application/json');

$json = file_get_contents("preguntas.json");
$array_preguntas = json_decode($json, true)['preguntes'];

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
echo $totRespostes2;
?>

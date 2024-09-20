<?php
 session_start();

$contPreg = 20;
    header('Content-Type: application/json');
    $json = file_get_contents("preguntas.json");
    $array_preguntas = json_decode($json, true)['preguntes'];


function desordenarPreguntas($preguntas, $contPreg){
    $preguntasDesordenadas = array();

    for ($i = 0; $i < 10; $i++) {
        $num = rand(0, count($preguntas) - 1);
        array_push($preguntasDesordenadas, $preguntas[$num]);
        array_shift($preguntas[$num]);
    }
    return $preguntasDesordenadas;
}

$totRespostes=[];
foreach ($array_preguntas as $senseResposta){
    $totRespostes[] = array(
        'id' => $senseResposta['id'],
        'pregunta' => $senseResposta['pregunta'],
        'respostes' => $senseResposta['respostes'],
        'imatge'=> $senseResposta['imatge'],
    );
}
$totRespostes2=json_encode(["preguntes"=>$totRespostes]);
echo $totRespostes2;
?>
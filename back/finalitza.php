<?php

header('Content-Type: application/json');

$jsonjs = file_get_contents('php://input');
$respostes = json_decode($jsonjs, true);

$json = file_get_contents("preguntas.json");
$correccion = json_decode($json, true);

$respostesrCorrectes = [];
foreach($correccion["preguntes"] as $rCorrectas) { 
    $respostesrCorrectes[] = $rCorrectas["resposta_correcta"]; 
}

$respuestasCliente = [];
foreach($respostes as $respostes2) {
    $respuestasCliente[] = $respostes2["resposta"];
}

    $verificacion = [];
for($i = 0; $i < count($respostes); $i++){
    if($respuestasCliente[$i] == $respostesrCorrectes[$i]){
        $verificacion[] = true;
    }else{
        $verificacion[] = false;
    }
}

$envioVerificacion = [];
foreach ($respostes as $i => $respostesCorr) {
    $envioVerificacion[] = array(
        'id' => $respostesCorr['id'],
        'correcte' => $verificacion[$i]
    );
}
    echo json_encode($envioVerificacion);
?>
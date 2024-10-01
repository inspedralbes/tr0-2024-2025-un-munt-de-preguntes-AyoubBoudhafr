<?php
session_start();

header('Content-Type: application/json');

$jsonjs = file_get_contents('php://input');
$respostes = json_decode($jsonjs, true);

if ($respostes === null) {
    die(json_encode(['error' => 'Error al decodificar el JSON.']));
}

if (!isset($_SESSION['info'])) {
    die(json_encode(['error' => 'No hay información en la sesión.']));
}

$info = $_SESSION['info'];

$respostesCorrectes = [];
$totesIds = [];

for ($i = 0; $i < count($respostes); $i++) {
    for ($j = 0; $j < count($info); $j++) {
        if (isset($info[$j]["id"]) && $info[$j]["id"] == $respostes[$i]["id"]) {
            $respostesCorrectes[] = $info[$j]["resposta_correcta"];
            $totesIds[] = $j; 
        }
    }
}

$respuestasCliente = [];
foreach ($respostes as $respostaCliente) {
    
    $respuestasCliente[] = $respostaCliente["resposta"];
}


$verificacion = [];
for($i = 0; $i < count($respuestasCliente); $i++) {
    if ($respuestasCliente[$i] == $respostesCorrectes[$i]) {
        $verificacion[] = true;
    } else {
        $verificacion[] = false;
    }
}

$debugObject = [];
foreach($respostes as $i => $respostes2) {
    $pregunta = '';
    if (isset($info[$totesIds[$i]])) {
        $pregunta = $info[$totesIds[$i]]['pregunta'];
    }

    $debugObject[] = [
        'id' => $respostes2["id"],
        'respuestaCliente' => $respostes2["resposta"],
        'respuestaCorrecta' => $respostesCorrectes[$i],
        'indice' => $i,
        'titulo' => $pregunta
    ];
}

$envioVerificacion = [];
foreach ($respostes as $i => $respostaCliente) {
    $envioVerificacion[] = [
        'id' => $respostaCliente['id'],
        'correcte' => $verificacion[$i],
        'debug' => $debugObject[$i]
    ];
}

$_SESSION['Respostes'] = $envioVerificacion;

echo json_encode($_SESSION['Respostes']);
?>

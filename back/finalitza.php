<?php
session_start();

header('Content-Type: application/json');

// Recibir y decodificar el JSON
$jsonjs = file_get_contents('php://input');
$respostes = json_decode($jsonjs, true);

// Verificación de que el JSON fue decodificado correctamente
if ($respostes === null) {
    die(json_encode(['error' => 'Error al decodificar el JSON.']));
}

// Verificar que la sesión contiene la variable 'info'
if (!isset($_SESSION['info'])) {
    die(json_encode(['error' => 'No hay información en la sesión.']));
}

$info = $_SESSION['info'];

$respostesCorrectes = [];
$totesIds = [];

// Buscar respuestas correctas en $info comparando con el ID de $respostes
for ($i = 0; $i < count($respostes); $i++) {
    for ($j = 0; $j < count($info); $j++) {
        if (isset($info[$j]["id"]) && $info[$j]["id"] == $respostes[$i]["id"]) {
            $respostesCorrectes[] = $info[$j]["resposta_correcta"];
            $totesIds[] = $j;  // Cambiar a $j para usar el índice real del array $info
        }
    }
}

$respuestasCliente = [];
foreach ($respostes as $respostaCliente) {
    // Versión más simple
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

// Almacenar el resultado en la sesión
$_SESSION['Respostes'] = $envioVerificacion;

// Enviar el resultado como respuesta JSON
echo json_encode($_SESSION['Respostes']);
?>

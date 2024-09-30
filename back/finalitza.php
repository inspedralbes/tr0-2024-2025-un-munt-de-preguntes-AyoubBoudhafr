<?php
session_start();
$servername = "localhost";
$database = "Ayoub";
$username = "Ayoub";
$password = "1234";

if (!isset($_SESSION['preguntes'])) {
    echo json_encode(['error' => 'No se encontraron preguntas en la sesión']);
    exit;
}

header('Content-Type: application/json');

$jsonjs = file_get_contents('php://input');
$respostes = json_decode($jsonjs, true);

$conn = mysqli_connect($servername, $username, $password, $database);
$resultRespostes = mysqli_query($conn, "SELECT * FROM preguntes");
$info = $resultRespostes->fetch_all(MYSQLI_ASSOC);

$respostesCorrectes = [];
$totesIds = [];
for ($i = 0; $i < count($respostes); $i++) {
    for ($j = 0; $j < count($info); $j++) {
        if ($info[$j]["id"] == $respostes[$i]["id"]) {
            $respostesCorrectes[] = $info[$j]["resposta_correcta"];
            $totesIds[] = $info[$j]["id"];
        }
    }
}

$respuestasCliente = [];
foreach($respostes as $respostaCliente) {
    $respuestasCliente[] = $respostaCliente["resposta"];
}

$verificacion = [];
for($i = 0; $i < count($respuestasCliente); $i++){
    if($respuestasCliente[$i] == $respostesCorrectes[$i]){
        $verificacion[] = true;
    } else {
        $verificacion[] = false;
    }
}

$debugObject = [];
foreach($respostes as $i => $respostes2){
    $debugObject[] = [
        'id' => $respostes2["id"],
        'respuestaCliente' => $respostes2["resposta"],
        'respuestaCorrecta' => $respostesCorrectes[$i],
        'indice' => $i,
        'titulo' => $info[$totesIds[$i]]['pregunta']
];
}
$envioVerificacion = [];
foreach ($respostes as $i => $respostaCliente) {
    $envioVerificacion[] = array(
        'id' => $respostaCliente['id'],
        'correcte' => $verificacion[$i],
        'debug' => $debugObject[$i]
    );
}
$_SESSION['Respostes']=$envioVerificacion;
echo json_encode($_SESSION['Respostes']);

mysqli_close($conn);
<?php
$servername = "localhost";
$database = "ayoub";
$username = "Ayoub";
$password = "1234";

header('Content-Type: application/json');

$jsonjs = file_get_contents('php://input');

$respostes = json_decode($jsonjs, true);


$conn = mysqli_connect($servername, $username, $password, $database);

$resultRespostes = mysqli_query($conn, "SELECT * FROM preguntes");

$info = $resultRespostes->fetch_all(MYSQLI_ASSOC);

$respostesCorrectes = [];

$debug_info = [];
for ($i = 0; $i < count($info); $i++) {
    for ($j = 0; $j < count($respostes); $j++) {
        if ($info[$i]["id"] == $respostes[$j]["id"]) {
            $respostesCorrectes[] = $info[$i]["resposta_correcta"];
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

$envioVerificacion = [];
foreach ($respostes as $i => $respostaCliente) {
    $envioVerificacion[] = array(
        'id' => $respostaCliente['id'],
        'correcte' => $verificacion[$i]
    );
}

echo json_encode($envioVerificacion);

mysqli_close($conn);
?>

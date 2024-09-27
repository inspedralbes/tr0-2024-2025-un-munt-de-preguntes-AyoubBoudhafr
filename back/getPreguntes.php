<?php
$servername = "localhost";
$database = "Ayoub";
$username = "Ayoub";
$password = "1234";

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$resultRespostes = mysqli_query($conn, "SELECT * FROM preguntes"); 
$info = $resultRespostes->fetch_all(MYSQLI_ASSOC);
shuffle($info);
$preguntasSeleccionadas = array_slice($info, 0, 10);
$arrayEnvio = [];

foreach ($preguntasSeleccionadas as $preguntes) {
    $arrayEnvio[] = [
        "pregunta" => $preguntes["pregunta"],
        "imatge" => $preguntes["imatge"],
        "opciones" => [
            $preguntes["pregunta_1"],
            $preguntes["pregunta_2"],
            $preguntes["pregunta_3"],
            $preguntes["pregunta_4"],
        ]
    ];
}

echo json_encode($arrayEnvio);
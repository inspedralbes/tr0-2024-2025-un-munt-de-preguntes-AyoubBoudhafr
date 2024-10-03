<?php
session_start();
require_once("migrate.php");

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$resultRespostes = mysqli_query($conn, "SELECT * FROM preguntes"); 
$info = $resultRespostes->fetch_all(MYSQLI_ASSOC);

$arrayEnvio = [];
foreach ($info as $preguntes) {
    $arrayEnvio[] = [
        "id" => $preguntes["id"],
        "pregunta" => $preguntes["pregunta"],
        "opciones" => [
            $preguntes["pregunta_1"],
            $preguntes["pregunta_2"],
            $preguntes["pregunta_3"],
            $preguntes["pregunta_4"],
        ],
        "correcta" => $preguntes["resposta_correcta"]
        ];
    }

$_SESSION['preguntes'] = $arrayEnvio;

echo json_encode($_SESSION['preguntes']);

mysqli_close($conn);
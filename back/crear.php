<?php
require_once('migrate.php');

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$pregunta = $data['pregunta'];
$opciones = $data['opciones'];
$respuesta_correcta = $data['respuesta_correcta'];

if ($pregunta && $opciones && count($opciones) === 4 && $respuesta_correcta >= 1 && $respuesta_correcta <= 4) {
    $stmt = $conn->prepare("INSERT INTO preguntes (pregunta, resposta_correcta, pregunta_1, pregunta_2, pregunta_3, pregunta_4) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sissss", $pregunta, $respuesta_correcta, $opciones[0], $opciones[1], $opciones[2], $opciones[3]);

    if ($stmt->execute()) {
        $last_id = $conn->insert_id;
        echo json_encode([
            "success" => true,
            "message" => "Pregunta guardada con éxito.",
            "id" => $last_id 
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar la pregunta: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Datos no válidos."]);
}

$conn->close();

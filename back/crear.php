<?php
require_once('migrate.php');

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['pregunta']) && isset($data['opciones']) && isset($data['respuesta_correcta'])) {
    $id = $data['id'];
    $pregunta = $data['pregunta'];
    $opciones = $data['opciones'];
    $respuesta_correcta = $data['respuesta_correcta'];

        $id = (int)($id);
        $pregunta = $conn->real_escape_string($pregunta);
        $opcion1 = $conn->real_escape_string($opciones[0]);
        $opcion2 = $conn->real_escape_string($opciones[1]);
        $opcion3 = $conn->real_escape_string($opciones[2]);
        $opcion4 = $conn->real_escape_string($opciones[3]);
        $respuesta_correcta = (int)$respuesta_correcta; 

        $sql = "INSERT INTO preguntes (id, pregunta, resposta_correcta, pregunta_1, pregunta_2, pregunta_3, pregunta_4) 
                VALUES ('$id', '$pregunta', '$respuesta_correcta', '$opcion1', '$opcion2', '$opcion3', '$opcion4')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Pregunta guardada correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al guardar la pregunta: " . $conn->error]);
        }
    }
    else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}

$conn->close();

<?php
require_once('migrate.php');

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['pregunta']) && isset($data['opciones']) && isset($data['respuesta_correcta'])) {
    $id = (int)$data['id'];
    $pregunta = $conn->real_escape_string($data['pregunta']);
    $opcion1 = $conn->real_escape_string($data['opciones'][0]);
    $opcion2 = $conn->real_escape_string($data['opciones'][1]);
    $opcion3 = $conn->real_escape_string($data['opciones'][2]);
    $opcion4 = $conn->real_escape_string($data['opciones'][3]);
    $respuesta_correcta = (int)$data['respuesta_correcta'];

    $stmt = $conn->prepare("DELETE FROM preguntes WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $sql = "INSERT INTO preguntes (id, pregunta, resposta_correcta, pregunta_1, pregunta_2, pregunta_3, pregunta_4) 
            VALUES ('$id', '$pregunta', '$respuesta_correcta', '$opcion1', '$opcion2', '$opcion3', '$opcion4')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Pregunta actualizada correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar la pregunta: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}

$conn->close();
?>

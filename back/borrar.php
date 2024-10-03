<?php
require_once('migrate.php');

$conn = mysqli_connect($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

if ($id) {
    $stmt = $conn->prepare("DELETE FROM preguntes WHERE id = ?");
    $stmt->bind_param("i", $id); 

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Pregunta borrada con éxito."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al borrar la pregunta: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID no válido."]);
}

$conn->close();
?>

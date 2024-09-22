<?php
session_start();

if (!isset($_SESSION['resultats'])) {
    header('Location: index.php');
    exit;
}
$puntuacio = $_SESSION['puntuacio'];
$totalPreguntes = count($_SESSION['preguntes']);
$resultats = $_SESSION['resultats'];

session_unset();
?>

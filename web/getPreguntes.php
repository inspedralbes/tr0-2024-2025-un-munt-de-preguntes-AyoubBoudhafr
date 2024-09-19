<?php
session_start();

$contPreg = 20;

function carregarPreguntes() {
    $json = file_get_contents("../back/preguntas.json");
    return json_decode($json, true)['preguntes'];
}

function desordenarPreguntas($preguntas, $contPreg){
    $preguntasDesordenadas = array();

    for ($i = 0; $i < 10; $i++) {
        $num = rand(0, count($preguntas) - 1);
        array_push($preguntasDesordenadas, $preguntas[$num]);
        array_shift($preguntas[$num]);
    }
    return $preguntasDesordenadas;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['reiniciar'])) {
        session_unset();
        header('Location: index.php');
        exit;
    }

    if (isset($_POST['resposta'])) {
        $preguntaActual = $_SESSION['preguntaActual'];
        $respostaSeleccionada = intval($_POST['resposta']);

        if ($respostaSeleccionada == $_SESSION['preguntes'][$preguntaActual]['resposta_correcta']) {
            $_SESSION['puntuacio']++;
            $_SESSION['resultats'][] = true;
        } else {
            $_SESSION['resultats'][] = false;
        }
    
        $_SESSION['preguntaActual']++;
        
        if ($_SESSION['preguntaActual'] >= count($_SESSION['preguntes'])) {
            header('Location: resultats.php');
            exit;
        } else {
            header('Location: index.php');
            exit;
        }
    }
} else {
    if (!isset($_SESSION['preguntes'])) {
        $_SESSION['preguntes'] = desordenarPreguntas(carregarPreguntes(), $contPreg);
        $_SESSION['preguntaActual'] = 0;
        $_SESSION['puntuacio'] = 0;
        $_SESSION['resultats'] = [];
    }

    $preguntaActual = $_SESSION['preguntaActual'];
    $pregunta = $_SESSION['preguntes'][$preguntaActual];
}
?>

<?php 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['resposta'])) {
    $respuestaCorrecta = $_SESSION['preguntes'][$_SESSION['preguntaActual'] - 1]['resposta_correcta'];
    
    if ($_POST['resposta'] == $respuestaCorrecta) {
        $mensaje = '¡Correcto!';
    } else {
        $mensaje = 'Incorrecto.';
    }
} 

if (isset($pregunta)) {
    ?>
    <h2><?php echo htmlspecialchars($pregunta['pregunta']); ?></h2>
    <img src="<?php echo htmlspecialchars($pregunta['imatge']); ?>" alt="Imagen de la pregunta" style="height: 200px;">
    <form method="post">
        <?php 
        foreach ($pregunta['respostes'] as $resposta) { ?>
            <p>
                <button name="resposta" value="<?php echo htmlspecialchars($resposta['id']); ?>">
                    <?php echo htmlspecialchars($resposta['etiqueta']); ?>
                </button>
            </p>
        <?php } ?>
    </form>
    <?php
} else {
    echo '<p>No hay preguntas disponibles.</p>';
}
?>

<form method="post">
    <button type="submit" name="reiniciar" style="background-color: red;">Reiniciar el juego</button>
</form>


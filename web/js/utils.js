let dataGlobal;

obtPreg();

function obtPreg(){
    let json = "../back/getPreguntes.php";
    fetch(json)
    .then(resp => resp.json())
    .then(data => {
        dataGlobal = data;
        let pregActual = 0;
        mostrarPregunta(dataGlobal, pregActual);
    });
}

function mostrarPregunta(data, pregActual) {
    let salida = '';
    let totPreguntas = data.preguntes;

    if (pregActual < totPreguntas.length) {
        let pregunta = totPreguntas[pregActual].pregunta;
        salida += '<h2>Pregunta número ' + (pregActual + 1) + '</h2>';
        salida += '<h3>' + pregunta + '</h3>';
        salida += '<img style="height: 200px" src="' + totPreguntas[pregActual].imatge + '">';

        let respuestas = totPreguntas[pregActual].respostes;

        for (let j = 0; j < respuestas.length; j++) {
            salida += '<br><button onclick="siguientePregunta(' + (pregActual + 1) + ', ' + (j + 1) + ')">' + respuestas[j].etiqueta + '</button>';
        }

        salida += '<br><button onclick="resetTest()">Restart</button>';
        document.getElementById("test").innerHTML = salida;
    } else {
        document.getElementById("test").innerHTML = "¡Se acabaron las preguntas!";
    }
}

function siguientePregunta(pregActual, respuesta) {
    console.log('Respuesta seleccionada: ' + respuesta);
    mostrarPregunta(dataGlobal, pregActual);
}

function resetTest() {
    mostrarPregunta(dataGlobal, 0);
}

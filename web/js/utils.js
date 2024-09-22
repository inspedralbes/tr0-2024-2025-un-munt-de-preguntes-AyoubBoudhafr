let dataGlobal;

fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/getPreguntes.php")
    .then(resp => resp.json())
    .then(data => {
        dataGlobal = data; 
        let pregActual = 0;
        mostrarPregunta(dataGlobal, pregActual);
    });

function mostrarPregunta(data, pregActual) {
    let salida = '';
    let totPreguntas = data.preguntes;

    if (pregActual < totPreguntas.length) {
        let pregunta = totPreguntas[pregActual].pregunta;
        salida += '<h3>' + pregunta + '</h3>';
        salida += '<img style="height: 200px" src="' + totPreguntas[pregActual].imatge + '">';
        let respuestas = totPreguntas[pregActual].respostes; 
        
        for (let j = 0; j < respuestas.length; j++) {
            salida += '<br><button onclick="siguientePregunta(' + (pregActual + 1) + ', \'' + (j+1) + '\')">' + respuestas[j].etiqueta + '</button>';
        }
        
        document.getElementById("test").innerHTML = salida;
    } else {
        document.write("Se acabaron las preguntas!!")
    }
}

function siguientePregunta(pregActual, respuesta) {
    alert('Respuesta seleccionada: ' + respuesta);
    mostrarPregunta(dataGlobal, pregActual); 
}

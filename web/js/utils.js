let dataGlobal;

obtPreg(dataGlobal);

function obtPreg(dataGlobal){
    let json = "../back/getPreguntes.php";
    fetch (json)
   .then(resp => resp.json())
   .then(data =>{
    dataGlobal = data;
        let pregActual = 0;
        mostrarPregunta(dataGlobal, pregActual);
   })
}


function mostrarPregunta(data, pregActual) {
    let salida = '';
    let totPreguntas = data.preguntes;

    if (pregActual < totPreguntas.length) {
        let pregunta = totPreguntas[pregActual].pregunta;
        salida += '<h2>Pregunta numero '+(pregActual+1)+'';
        salida += '<h3>' + pregunta + '</h3>';
        salida += '<img style="height: 200px" src="' + totPreguntas[pregActual].imatge + '">';
        let respuestas = totPreguntas[pregActual].respostes; 
        
        for (let j = 0; j < respuestas.length; j++) {
            salida += '<br><button onclick="siguientePregunta(' + (pregActual + 1) + ', \'' + (j+1) + '\'\''+data+'\')">' + respuestas[j].etiqueta + '</button>';
        }
        salida += '<br><button onclick="resetTest('+data+')">Restart</button>'
        document.getElementById("test").innerHTML = salida;
    } else {
        document.write("Se acabaron las preguntas!!")
    }
}

function siguientePregunta(pregActual, respuesta, dataGlobal) {
    console.log('Respuesta seleccionada: ' + respuesta);
    mostrarPregunta(dataGlobal, pregActual);
}
function resetTest(dataGlobal){
   obtPreg(dataGlobal);
}
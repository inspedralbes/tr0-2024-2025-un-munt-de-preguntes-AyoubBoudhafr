let dataGlobal;
let arrayRespostes = [];
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
            salida += '<br><button class="resp" onclick="siguientePregunta(' + (pregActual + 1) + ', ' + (j + 1) + ')">' + respuestas[j].etiqueta + '</button>';

        }
        salida += '<br><button onclick="anterior('+pregActual+')">Anterior</button>'
        salida += '<button class="reset" onclick="resetTest()">Restart</button>';
        salida += '<button onclick="siguiente('+pregActual+')">Siguiente</button>'
        document.getElementById("test").innerHTML = salida;
    } else {
        finalitza(arrayRespostes);
    }
}

function siguientePregunta(pregActual, respuesta) {
    arrayRespostes.push(respuesta);
    mostrarPregunta(dataGlobal, pregActual);
}

function resetTest() {
    obtPreg();
    mostrarPregunta(dataGlobal, 0);
}
function anterior(pregActual){
    pregActual--;
    mostrarPregunta(dataGlobal, pregActual);
}
function siguiente(pregActual){
    pregActual++;
    mostrarPregunta(dataGlobal, pregActual);
}
function finalitza(){
    fetch("../back/finalitzar.php",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({arrayRespostes})
    })
}


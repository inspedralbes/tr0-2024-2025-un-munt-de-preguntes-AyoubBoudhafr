
let dataGlobal;
let arrayRespostes = new Array(10); 
let arrayIds = [];
let pregActual;

obtPreg();

function obtPreg() {
    let json = '/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/getPreguntes.php';
    fetch(json)
        .then(resp => resp.json())
        .then(data => {
            dataGlobal = data;
            pregActual = 0;
            mostrarPregunta(dataGlobal, pregActual);
            data.preguntes.forEach(preg => {
                arrayIds.push(preg.id);
            });
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

        respuestas.forEach((resp, j) => {
            salida += '<br><button class="resp" onclick="siguientePregunta(' + pregActual + ', ' + (j + 1) + ')">' + resp.etiqueta + '</button>';
        });
        
        salida += '<br><button onclick="anterior(' + pregActual + ')">Anterior</button>';
        salida += '<button class="reset" onclick="resetTest()">Restart</button>';
        salida += '<button onclick="siguiente(' + pregActual + ')">Siguiente</button>';
        
        document.getElementById('test').innerHTML = salida;
    } else {
        finalitza(arrayRespostes);
    }
}

function siguientePregunta(pregActual, respuesta) {
    arrayRespostes[pregActual] = respuesta;     
    mostrarPregunta(dataGlobal, pregActual + 1); 
}

function resetTest() {
    arrayRespostes = new Array(10); 
    arrayIds = [];
    obtPreg(); 
}

function anterior(pregActual) {
    if (pregActual > 0) { 
        mostrarPregunta(dataGlobal, pregActual - 1);
    }
}

function siguiente(pregActual) {
    if (pregActual + 1 < dataGlobal.preguntes.length) { 
        mostrarPregunta(dataGlobal, pregActual + 1);
    }
}

function finalitza() {
    let results = [];
    arrayIds.forEach((id, i) => {
        results.push({id: id, resposta: arrayRespostes[i]})
    });
    
    fetch('/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/finalitza.php', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(results)
    })
    .then(response => response.json())
    .then(data => {
        imprimirResultados(data);
    });
}

function imprimirResultados(respostes) {
    let salida2 = '';
    let count = 0;
    for (let i = 0; i < respostes.length; i++) {
        if(respostes[i].correcte == true){
            count++;
        }
    }
    salida2 += '<h1>Has fet ' + count + ' respostes correctes!';
    for (let i = 0; i < respostes.length; i++) {
        if(respostes[i].correcte == true){
            salida2 += '<h4>Resposta ' + (i + 1) + ': Correcte</h4>';
        } else {
            salida2 += '<h4>Resposta ' + (i + 1) + ': Incorrecte</h4>';
        }
    }
    document.getElementById('test').innerHTML = '';
    document.getElementById('imprime').innerHTML = salida2;
}

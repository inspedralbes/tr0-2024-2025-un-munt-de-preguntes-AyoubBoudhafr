let dataGlobal;
let arrayRespostes = new Array(10); 
let arrayIds = [];
let respostesGlobal = [];
let comienzoCrono; 
const contenidoInicial = `
    <header>
        <button id="admin">Admin DB</button>
    </header>
    <div id="inicio" style="text-align: center; margin: 20px;">
        <h1>Benvingut al nostre Test!</h1>
        <p>Posa a prova els teus coneixements amb les nostres preguntes.</p>
        <img id="interrogante" src="./img/interrogante2.png">
        <button id="començar">Començar Test</button>
    </div>
`;

document.getElementById('app').innerHTML = contenidoInicial;
document.getElementById('admin').addEventListener('click', function() {
    window.location.href = 'admin.html';
});
document.getElementById('començar').addEventListener('click', function() {
    document.getElementById('inicio').innerHTML = '';
    obtPreg(); 
});
function obtPreg() {
    let json = "./../back/getPreguntes.php";
    fetch(json)
        .then(resp => resp.json())
        .then(data => {
            dataGlobal = data;
            let pregActual = 0;
            mostrarPregunta(dataGlobal, pregActual);
            data.forEach(preg => {
                arrayIds.push(preg.id);
            });
            comienzoCrono = new Date(); 
        });
}

function mostrarPregunta(data, pregActual) {
    let salida = '';
    let totPreguntas = data;

    if (pregActual < totPreguntas.length) {
        let pregunta = totPreguntas[pregActual].pregunta;
        salida += '<h2>Pregunta número ' + (pregActual + 1) + '</h2>';
        salida += '<h3>' + pregunta + '</h3>';
        salida += '<img style="height: 200px" src="' + totPreguntas[pregActual].imatge + '">';

        let respuestas = totPreguntas[pregActual].opciones;

        respuestas.forEach(function(resp, j) {
            salida += '<br><button class="resp" data-respuesta="' + (j + 1) + '">' + resp + '</button>';
        });
        salida += '<br><button id="anterior">Anterior</button>';
        salida += '<button class="reset" id="reset">Restart</button>';
        salida += '<button id="siguiente">Siguiente</button>';
        
        document.getElementById("test").innerHTML = salida;

        document.querySelectorAll('.resp').forEach(function(button, index) {
            button.addEventListener('click', function() {
                siguientePregunta(pregActual, index + 1);
            });
        });

        document.getElementById('anterior').addEventListener('click', function() {
            anterior(pregActual);
        });
        document.getElementById('reset').addEventListener('click', resetTest);
        document.getElementById('siguiente').addEventListener('click', function() {
            siguiente(pregActual);
        });
    } else {
        finalitza(arrayRespostes);
    }
}

function siguientePregunta(pregActual, respuesta) {
    arrayRespostes[pregActual] = respuesta;   
    pregActual++;  
    mostrarPregunta(dataGlobal, pregActual); 
}

function resetTest() {
    document.getElementById('imprime').innerHTML = '';
    arrayRespostes = new Array(10);
    arrayIds = [];
    obtPreg(); 
}

function anterior(pregActual) {
    if (pregActual > 0) {
        pregActual--;
        mostrarPregunta(dataGlobal, pregActual);
    }
}

function siguiente(pregActual) {
    if (pregActual + 1 < dataGlobal.length) { 
        pregActual++;
        mostrarPregunta(dataGlobal, pregActual);
    } else {
        finalitza();
    }
}

function finalitza() {
    let results = [];
    arrayIds.forEach(function(id, i) {
        results.push({id: id, resposta: arrayRespostes[i]});
    });
    
    fetch("./../back/finalitza.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(results)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        respostesGlobal = data;
        imprimirResultados();
    });
}

function imprimirResultados() {
    let salida2 = '';
    let count = 0;
    for (let i = 0; i < respostesGlobal.length; i++) {
        if (respostesGlobal[i].correcte == true) {
            count++;
        }
    }
    
    let finTemporizador = new Date();
    let tiempoSeg = Math.floor((finTemporizador - comienzoCrono) / 1000); 

    salida2 += '<h1>Has fet ' + count + ' respostes correctes!</h1>';
    if (tiempoSeg < 59) {
        salida2 += '<h2>Temps total: ' + tiempoSeg + ' segons</h2>'; 
    } else {
        let tiempo = parseInt(tiempoSeg / 60);
        let residuo = tiempoSeg % 60;
        salida2 += '<h2>Temps total: ' + tiempo + ' minuts i ' + residuo + ' segons</h2>'; 
    }
    
    for (let i = 0; i < respostesGlobal.length; i++) {
        salida2 += '<h4>Resposta ' + (i + 1) + ': ';
        
        if (respostesGlobal[i].correcte == true) {
            salida2 += 'Correcte';
        } else {
            salida2 += 'Incorrecte';
        }
        
        salida2 += '</h4>';
    }
    document.getElementById('test').innerHTML = '';
    salida2 += '<button class="resp" id="restart">Restart</button>';
    document.getElementById("imprime").innerHTML = salida2;
    document.getElementById('restart').addEventListener('click', resetTest);
}

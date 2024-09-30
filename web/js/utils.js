let dataGlobal;
let arrayRespostes = new Array(10); 
let arrayIds = [];
let respostesGlobal = [];
let comienzoCrono; 
obtPreg();

function obtPreg() {
    let json = "/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/getPreguntes.php";
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
        salida += `<h2>Pregunta número ${pregActual + 1}</h2>`;
        salida += `<h3>${pregunta}</h3>`;
        salida += `<img style="height: 200px" src="${totPreguntas[pregActual].imatge}">`;

        let respuestas = totPreguntas[pregActual].opciones;

        respuestas.forEach((resp, j) => {
            salida += '<br><button class="resp" data-respuesta="'+(j + 1)+'">'+resp+'</button>';
        });
        salida += '<br><button id="anterior">Anterior</button>';
        salida += '<button class="reset" id="reset">Restart</button>';
        salida += '<button id="siguiente">Siguiente</button>';
        
        document.getElementById("test").innerHTML = salida;

        document.querySelectorAll('.resp').forEach((button, index) => {
            button.addEventListener('click', () => siguientePregunta(pregActual, index + 1));
        });

        document.getElementById('anterior').addEventListener('click', () => anterior(pregActual));
        document.getElementById('reset').addEventListener('click', resetTest);
        document.getElementById('siguiente').addEventListener('click', () => siguiente(pregActual));
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
    arrayIds.forEach((id, i) => {
        results.push({id: id, resposta: arrayRespostes[i]});
    });
    
    fetch("/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/finalitza.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(results)
    })
    .then(response => response.json())
    .then(data => {
        respostesGlobal = data;
        imprimirResultados();
    });
}

function imprimirResultados() {
    let salida2 = '';
    let count = 0;
    for (let i = 0; i < respostesGlobal.length; i++) {
        if (respostesGlobal[i].correcte === true) {
            count++;
        }
    }
    
    let finTemporizador = new Date();
    let tiempoSeg = Math.floor((finTemporizador - comienzoCrono) / 1000); 

    salida2 += `<h1>Has fet ${count} respostes correctes!</h1>`;
    if(tiempoSeg < 59){
        salida2 += `<h2>Temps total: ${tiempoSeg}</h2>`; 
    } else {
        let tiempo = parseInt(tiempoSeg / 60);
        let residuo = tiempoSeg % 60;
        salida2 += `<h2>Temps total: ${tiempo} minuts i ${residuo} segons</h2>`; 
    }
    
    for (let i = 0; i < respostesGlobal.length; i++) {
        salida2 += `<h4>Resposta ${i + 1}: ${respostesGlobal[i].correcte ? 'Correcte' : 'Incorrecte'}</h4>`;
    }
    
    document.getElementById('test').innerHTML = '';
    salida2 += '<button class="resp" id="restart">Restart</button>';
    document.getElementById("imprime").innerHTML = salida2;

    document.getElementById('restart').addEventListener('click', resetTest);
}

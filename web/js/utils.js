fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/getPreguntes.php")
    .then(resp => resp.json())
    .then(data => {
        let pregActual = 0;
        mostrarPregunta(data,pregActual);
    })
    function mostrarPregunta(data,pregActual){
        let salida = ''
        let totPreguntas = data.preguntes;
        let pregunta = totPreguntas[pregActual].pregunta
        salida += '<h3>'+pregunta+'</h3>';
        salida += '<img style="height: 200px" src="'+totPreguntas[pregActual].imatge+'">'
        let respuestas = totPreguntas[pregActual].respostes; 
        for (let j = 0; j <respuestas.length; j++) {
            salida += '<br><button onclick="">'+respuestas[j].etiqueta+'</button>';
        }
        document.getElementById("test").innerHTML = salida;
    }
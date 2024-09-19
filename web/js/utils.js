function BuscarRespuesta(preguntaIndex, respostaIndex) {
    console.log(`Pregunta número: ${preguntaIndex + 1}, Resposta número: ${respostaIndex + 1}`);
}
fetch('../../back/preguntas.json')
    .then(response => response.json())
    .then(data => {
        
        data.preguntes.forEach((pregunta, indexPregunta) => {
            let preguntaHtml = `
                <h2>${pregunta.pregunta}</h2>
                <img src="${pregunta.imatge}" alt="Image" style="max-width: 100%; height: 200px;">
            `;

            preguntaHtml += pregunta.respostes.map((resposta, indexResposta) => `
                <p><button onclick="BuscarRespuesta(${indexPregunta}, ${indexResposta})">${resposta.etiqueta}</button></p>
            `).join('');

            preguntaHtml += '<hr>';

            document.body.innerHTML += preguntaHtml;
        });
    });
    
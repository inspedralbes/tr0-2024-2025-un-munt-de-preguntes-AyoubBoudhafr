
fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-AyoubBoudhafr/back/getPreguntes.php')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.preguntes.forEach((pregunta, indexPregunta) => {
        let preguntaHtml = `

        <h2>${pregunta.pregunta}</h2>
        <img src="${pregunta.imatge}" alt="Image" style="height: 200px;">`;
        
        preguntaHtml += pregunta.respostes.map((resposta, indexResposta) => `
        <p><button onclick="BuscarRespuesta(${indexPregunta}, ${indexResposta})">${resposta.etiqueta}</button></p>`).join('');
        preguntaHtml += '<hr>';

        document.body.innerHTML += preguntaHtml;
    });
});
function BuscarRespuesta(preguntaIndex, respostaIndex) {
    console.log(`Pregunta número: ${preguntaIndex + 1}, Resposta número: ${respostaIndex + 1}`);
}

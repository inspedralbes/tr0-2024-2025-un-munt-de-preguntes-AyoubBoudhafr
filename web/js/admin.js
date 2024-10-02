const ventanaAdmin = `
    <button id="irIndex">Volver al juego</button>
    <button id="crear">Crear pregunta</button>
`;
document.getElementById('volver').innerHTML = ventanaAdmin;
document.getElementById('irIndex').addEventListener('click', function() {
    window.location.href = 'index.html';
});

fetch("./../back/info.php")
    .then(resp => resp.json())
    .then(data => {
        mostrarTodo(data);
    });

function mostrarTodo(data) {
    let salida = '';
    for (let i = 0; i < data.length; i++) {
        salida += '<h4>Pregunta ' + data[i].id + '</h4>';
        salida += '<h4>' + data[i].pregunta + '</h4>';
        for (let j = 0; j < data[i].opciones.length; j++) {
            salida += '<p>' + data[i].opciones[j] + '</p>';
        }
        let json = { id: data[i].id };
        salida += '<button class="borrarPreg" data-id="' + data[i].id + '">Borrar pregunta</button>';
        salida += '<br>'
        salida += '<button class="actualizar" data-id="' + data[i].id + '">Actualizar</button>';
    }
    document.getElementById('crud').innerHTML = salida;

    let botonesBorrar = document.querySelectorAll('.borrarPreg');
    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', function() {
            let idPregunta = this.getAttribute('data-id');
            let json = { id: idPregunta };
            fetch("./../back/borrar.php", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(json)
            })
            .then(resp => resp.json()) 
            .then(info => {
                fetch("./../back/info.php")
                .then(resp => resp.json())
                .then(data => {
                mostrarTodo(data);
    });
            });
        });
    });
}



document.getElementById('adm').innerHTML = '<h1>Administracion del juego</h1>';

const ventanaAdmin = `
    <button id="irIndex">Volver al juego</button>
    <button id="crear">Crear pregunta</button>
    <div id="formularioPregunta" class="hidden">
        <h4>Agregar Nueva Pregunta</h4> 
        <input type="text" id="id" placeholder="Id de la pregunta" required>
        <input type="text" id="nuevaPregunta" placeholder="Escribe la pregunta" required>
        <input type="text" id="opcion1" placeholder="Opción 1" required>
        <input type="text" id="opcion2" placeholder="Opción 2" required>
        <input type="text" id="opcion3" placeholder="Opción 3" required>
        <input type="text" id="opcion4" placeholder="Opción 4" required>
        <input type="number" id="respuestaCorrecta" placeholder="Número de la respuesta correcta" required min="1" max="4">
        <button id="guardarPregunta">Guardar Pregunta</button>
    </div>
`;
document.getElementById('volver').innerHTML = ventanaAdmin;

document.getElementById('irIndex').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('crear').addEventListener('click', function() {
    const formulario = document.getElementById('formularioPregunta');
    formulario.classList.toggle('hidden');
    document.getElementById('crud').innerHTML = '';
    document.getElementById('adm').innerHTML = '';
});

document.getElementById('guardarPregunta').addEventListener('click', function() {
    const id = document.getElementById('id').value;
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const opcion1 = document.getElementById('opcion1').value;
    const opcion2 = document.getElementById('opcion2').value;
    const opcion3 = document.getElementById('opcion3').value;
    const opcion4 = document.getElementById('opcion4').value;
    const respuestaCorrecta = document.getElementById('respuestaCorrecta').value;

    const json = {
        id: id,
        pregunta: nuevaPregunta,
        opciones: [opcion1, opcion2, opcion3, opcion4],
        respuesta_correcta: respuestaCorrecta
    };

    fetch("./../back/crear.php", {
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
        salida += '<button class="borrarPreg" data-id="' + data[i].id + '">Borrar pregunta</button>';
        salida += '<br>';
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
                console.log(info);
                fetch("./../back/info.php")
                .then(resp => resp.json())
                .then(data => {
                    mostrarTodo(data);
                });
            });
        });
    });
    let actaulizarPregunta = document.querySelectorAll('.actualizar');
    actaulizarPregunta.forEach(boton => {
        boton.addEventListener('click', function() {
            let idPreguntaActalitza = this.getAttribute('data-id');
            let json2 = { id: idPreguntaActalitza};
            fetch("./../back/actualizar.php", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(json2)
            })
            .then(resp => resp.json())
            .then(infoActualitza => {
                console.log(infoActualitza);
                fetch("./../back/info.php")
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById('volver').innerHTML = '';
                    mostrarTodo(data);
                });
            });
        });
    });
}

document.getElementById('adm').innerHTML = '<h1>Administracion del juego</h1>';

const ventanaAdmin = `
    <button id="irIndex">Volver al juego</button>
    <button id="crear">Crear pregunta</button>
    <div id="formularioPregunta" class="hidden">
        <h4 id="tituloFormulario">Agregar Nueva Pregunta</h4> 
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

document.getElementById('adm').innerHTML += ventanaAdmin; 

let modoActualizar = false; 
let idPreguntaActualizar = null;

document.getElementById('irIndex').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('crear').addEventListener('click', function() {
    const formulario = document.getElementById('formularioPregunta');
    formulario.classList.remove('hidden');
    
    document.getElementById('irIndex').classList.add('hidden');
    document.getElementById('crear').classList.add('hidden'); 
    document.getElementById('crud').classList.add('hidden');
    
    document.getElementById('tituloFormulario').innerText = 'Agregar Nueva Pregunta';
    modoActualizar = false; 
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

    if (modoActualizar) {
        fetch("./../back/actualizar.php", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(json)
        })
        .then(resp => resp.json())
        .then(info => {
            document.getElementById('formularioPregunta').classList.add('hidden');
            document.getElementById('irIndex').classList.remove('hidden');
            document.getElementById('crear').classList.remove('hidden'); 
            document.getElementById('crud').classList.remove('hidden'); 

            fetch("./../back/info.php")
            .then(resp => resp.json())
            .then(data => {
                mostrarTodo(data); 
            });
        })
        .catch(error => {
            console.error('Error al actualizar la pregunta:', error);
        });
    } else {
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
            document.getElementById('formularioPregunta').classList.add('hidden');
            document.getElementById('irIndex').classList.remove('hidden');
            document.getElementById('crear').classList.remove('hidden');
            document.getElementById('crud').classList.remove('hidden');

            fetch("./../back/info.php")
            .then(resp => resp.json())
            .then(data => {
                mostrarTodo(data); 
            });
        })
        .catch(error => {
            console.error('Error al crear la pregunta:', error);
        });
    }
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
            })
            .catch(error => {
                console.error('Error al borrar la pregunta:', error);
            });
        });
    });

    let actualizarPregunta = document.querySelectorAll('.actualizar');
    actualizarPregunta.forEach(boton => {
        boton.addEventListener('click', function() {
            let idPregunta = this.getAttribute('data-id');
            const preguntaData = data.find(preg => preg.id === idPregunta); 
            document.getElementById('id').value = preguntaData.id;
            document.getElementById('nuevaPregunta').value = preguntaData.pregunta;
            document.getElementById('opcion1').value = preguntaData.opciones[0];
            document.getElementById('opcion2').value = preguntaData.opciones[1];
            document.getElementById('opcion3').value = preguntaData.opciones[2];
            document.getElementById('opcion4').value = preguntaData.opciones[3];
            document.getElementById('respuestaCorrecta').value = preguntaData.respuesta_correcta;
            
            modoActualizar = true; 
            idPreguntaActualizar = idPregunta; 
            document.getElementById('irIndex').classList.add('hidden');
            document.getElementById('crear').classList.add('hidden'); 
            document.getElementById('crud').classList.add('hidden'); 
            
            const formulario = document.getElementById('formularioPregunta');
            formulario.classList.remove('hidden');
            document.getElementById('tituloFormulario').innerText = 'Actualizar Pregunta';
        });
    });
}

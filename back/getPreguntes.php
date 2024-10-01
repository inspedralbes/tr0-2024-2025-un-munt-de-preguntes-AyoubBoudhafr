<?php
session_start();
// include("conexio.php");
// hace lo mismo que include pero es obligatorio, sino salta un error
// el once hace que solo se ejecute 1 vez
require_once("conexio.php");

// conecta con la base de datos
$conn = mysqli_connect($servername, $username, $password, $database);

// lanza error si no se conecta con una base de datos
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// saco lo que hay en la base de datos y lo transformo en array
$resultRespostes = mysqli_query($conn, "SELECT * FROM preguntes"); 
$info = $resultRespostes->fetch_all(MYSQLI_ASSOC);

// guardo la informacion en la session
$_SESSION['info']= $info;

// mezclo el array y saco los 10 primeros del array mezlado
shuffle($info);
$preguntasSeleccionadas = array_slice($info, 0, 10);

// creo un json para el front con todo menos las respuestas correctas
$arrayEnvio = [];
foreach ($preguntasSeleccionadas as $preguntes) {
    $arrayEnvio[] = [
        "id" => $preguntes["id"],
        "pregunta" => $preguntes["pregunta"],
        "imatge" => $preguntes["imatge"],
        "opciones" => [
            $preguntes["pregunta_1"],
            $preguntes["pregunta_2"],
            $preguntes["pregunta_3"],
            $preguntes["pregunta_4"],
            ]
        ];
    }

// guardo este json en la session
$_SESSION['preguntes'] = $arrayEnvio;

// envio el json sin respuestas correctas al front
echo json_encode($_SESSION['preguntes']);

// cierro conexion con base de datos
mysqli_close($conn);
// CREATE TABLE preguntes (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     pregunta TEXT NOT NULL,
//     imatge VARCHAR(255) NOT NULL,
//     resposta_correcta INT NOT NULL,
//     pregunta_1 VARCHAR(255) NOT NULL,
//     pregunta_2 VARCHAR(255) NOT NULL,
//     pregunta_3 VARCHAR(255) NOT NULL,
//     pregunta_4 VARCHAR(255) NOT NULL 
// );
// INSERT INTO preguntes (id, pregunta, imatge, resposta_correcta, pregunta_1, pregunta_2, pregunta_3, pregunta_4) VALUES
// (1, 'Quina és la velocitat màxima permesa en una autopista?', '../web/img/autopista.jpg', 3, '80 km/h', '100 km/h', '120 km/h', '140 km/h'),
// (2, 'Quin document has de portar sempre quan condueixes?', '../web/img/papeles.jpg', 1, 'Carnet de conduir', 'Passaport', 'Document d\'identitat', 'Assegurança de vida'),
// (3, 'Què has de fer quan et trobes amb un semàfor en vermell?', '../web/img/semaforo.jpg', 1, 'Parar', 'Continuar amb precaució', 'Accelerar', 'Reduir la velocitat'),
// (4, 'Quina és la norma general per avançar a altres vehicles?', '../web/img/adelantamiento.jpg', 1, 'Avançar pel costat esquerre', 'Avançar pel costat dret', 'Avançar pel mig de la carretera', 'No es pot avançar'),
// (5, 'Què significa una línia contínua al centre de la carretera?', '../web/img/linea-continua.jpg', 1, 'No es pot avançar', 'Es pot avançar amb precaució', 'Línia provisional', 'Zona de canvi de carril'),
// (6, 'Què indica un senyal de stop?', '../web/img/stop.jpg', 1, 'Parar completament i continuar amb precaució', 'Reduir la velocitat i continuar', 'Passar sense aturar-se', 'Canviar de direcció'),
// (7, 'Quina és la distància mínima que has de mantenir a altres vehicles?', '../web/img/distancia.jpg', 3, '1 metre', '2 metres', '4 metres', '5 metres'),
// (8, 'En quines condicions és obligatori utilitzar el casc?', '../web/img/casco.jpg', 1, 'Quan condueixes una moto o ciclomotor', 'Quan condueixes un cotxe', 'Quan condueixes una bicicleta només de nit', 'Quan condueixes un camió'),
// (9, 'Quina és la velocitat màxima en zones urbanes?', '../web/img/urbano.jpg', 2, '30 km/h', '50 km/h', '70 km/h', '90 km/h'),
// (10, 'Què has de fer si arribes a una rotonda amb senyal?', '../web/img/rotonda.jpg', 1, 'Cedir el pas als vehicles que circulen per la rotonda', 'Entrar sense aturar-se', 'Aturar-se completament abans de continuar', 'Canviar de direcció sense mirar'),
// (11, 'Què indica una línia d\'atenció al conductor a la carretera?', '../web/img/atencion.jpg', 1, 'Que estàs a punt de sortir de la carretera', 'Que és zona d\'estacionament', 'Que has de reduir la velocitat', 'Que la carretera és perillosa'),
// (12, 'Quina norma s\'ha de seguir en una intersecció sense senyalització?', '../web/img/interseccio.jpg', 1, 'Respectar la prioritat de la dreta', 'Sempre tenir prioritat', 'Prioritzar el trànsit del carrer principal', 'Aturar-se i comprovar els altres vehicles'),
// (13, 'Com ha de ser l\'ús dels llums en condicions de boira?', '../web/img/boira.jpg', 1, 'Utilitzar llums de boira', 'Utilitzar llums d\'ús diürn', 'Utilitzar només els llums de posició', 'No utilitzar cap llum'),
// (14, 'Què indica un senyal triangular amb fons blanc i vinyeta vermella?', '../web/img/ceda.jpg', 1, 'Advertència de perill', 'Obligació de detenció', 'Restricció de velocitat', 'Prohibició d\'entrada'),
// (15, 'Quan està permès estacionar davant d\'una entrada d\'un garatge?', '../web/img/estacionar.jpg', 1, 'Mai', 'Només si hi ha senyalització que ho permet', 'Quan el garatge no està en ús', 'Durant la nit'),
// (16, 'Què has de fer si et trobes amb una cruïlla sense senyalització?', '../web/img/derecha.jpg', 1, 'Cedir el pas', 'Continuar sense parar', 'Accelerar per passar primer', 'Aturar-te i esperar'),
// (17, 'Què has de fer quan un vehicle d\'emergència amb llums intermitents s\'acosta?', '../web/img/ambulancia.jpg', 1, 'Mantenir-te a la dreta i reduir la velocitat', 'Accelerar per no bloquejar el pas', 'Aturar-te al mig de la carretera', 'Seguir el vehicle d\'emergència'),
// (18, 'En quin cas és obligatori utilitzar el cinturó de seguretat?', '../web/img/cinturon.jpg', 1, 'Sempre, tant si vas com a conductor com a passatger', 'Només quan condueixes per autopistes', 'Només si viatges a la part del davant del vehicle', 'Només per a passatgers majors de 12 anys'),
// (19, 'Quin és l\'ús correcte dels llums de carretera en condicions de foscor?', '../web/img/carretera_noche.jpg', 1, 'Utilitzar els llums d\'altes', 'Utilitzar els llums de creuer', 'Utilitzar els llums de posició', 'Apagar els llums'),
// (20, 'Com ha de ser la separació entre els vehicles en condicions de pluja?', '../web/img/lluvia.jpg', 1, 'Més gran de l\'habitual', 'Menys gran de l\'habitual', 'Igual que en condicions normals', 'No cal preocupar-se per la separació');

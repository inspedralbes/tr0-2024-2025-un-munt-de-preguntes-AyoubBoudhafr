const ventanaAdmin =`
    <button id="irIndex">Volver al juego</button>
`;
document.getElementById('volver').innerHTML = ventanaAdmin;
document.getElementById('irIndex').addEventListener('click', function(){
    window.location.href = 'index.html';
});
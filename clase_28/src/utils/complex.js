// process nos permite activar "Listeners", que quedan atentos a escuchar distintos eventos.
// En este caso un evento de mensaje, es decir, un mensaje que llega desde otro proceso.
// Cuando llegue (cualquier mensaje), el proceso iniciará.
process.on('message', (message) => {
    let result = 0;
    for (let i = 0; i < 5e9; i++) { result += i; }
    // Ver que a diferencia de una rutina común, no utilizamos return sino process.send para devolver el resultado
    process.send(result);
});
import {sendPoints} from '../../api/scripts/index.js'
const FirstID = Math.floor(Math.random() * 1394124122352345);
const FinallyID = FirstID.valueOf();
var alias = null
console.info('[Game] ID del juego: ' + FinallyID)

window.onload=async function() { 
     //Aqui vamos a establecer las variables de la partida
     var clicks = 0
     var required = 1000;
     var IsEnd = false;
     var wins = 0;
     var contador=100000;
     var clicks_in_sconds = 0
     var seconds = 0
     var seconds_afk = 0
     var is_active = true;
    //Crea un script que calcule los clicks por segundo a lo largo de la partida
    const interval = setInterval(function(){
        seconds++;
        var clicks_per_second = clicks_in_sconds / 1
        if(clicks_per_second !== Infinity) {
        document.getElementById("clicks_per_second").innerHTML=clicks_per_second;
        } else {
            document.getElementById("clicks_per_second").innerHTML="0.0";
        }
        clicks_in_sconds = 0;
    },1000);
    //Crear un script que calcule cada 5 segundos si hay actividad en el juego
    const clear_active = setInterval(function(){
        is_active = false;
    },5000);

    const interval2 = setInterval(async function(){
        if(is_active == false) {
                if(clicks_in_sconds <= 0) {
                if(seconds_afk >= 120) {
                    alias = document.getElementById('alias').value;
                    console.warn('[Game] Se obtuvo el alias del jugador: ' + alias);
                    clearInterval(interval2);
                    console.warn('[Game] El jugador ha estado afk por mas de 120 segundos, cerrando la sesion');
                    console.warn('[Game] Se detecto una terminacion del juego, eliminando variables');
                        document.getElementById("boton").disabled=true;
                        document.getElementById("boton").innerHTML="Juego terminado";
                        document.getElementById("victorias").innerHTML=`${wins}`;
                        document.getElementById("required").innerHTML='null';
                        console.warn('[Game] Se detuvo la deteccion de afk');
                        clearInterval(interval);
                        console.warn('[Game] Se detuvo el calculo de clicks por segundo');
                        document.getElementById("clicks_per_second").innerHTML= clicks / seconds;
                        console.warn('[Game] Enviando datos al servidor...');
                        const request = await sendPoints(clicks, FinallyID, alias);
                        console.info('[API] Status: ' + request.response.status);
                        console.info('[API] Response: ' + request.response);
                        console.warn('[Game] Se enviaron los puntos al servidor');
                        console.warn('[Game] Se eliminaron los botones');
                        console.warn('[Game] Se eliminaron las variables');
                        console.warn('[Game] Reiniciando el juego en 10 segundos...');
                        var seconds_timeout = 10;
                        setInterval(() => {
                            seconds_timeout--;
                            console.warn(`[Game] Cerrando el juego en ${seconds_timeout} segundos...`);
                        }, 1000)
                        setTimeout(() => {
                            console.warn('[Game] Cerrando el juego...');
                            window.location.href = "/";
                        }, 10000)
                } else if(seconds_afk >= 60) {
                    console.warn('[Game] El jugador ha estado afk por mas de 60 segundos, preparando para cerra la sesion');
                    document.getElementById("boton").innerHTML="Estas AFK";
                } else if(seconds_afk >= 30) {
                    console.warn('[Game] Iniciando sistema anti afk, segundos afk: ' + seconds_afk);
                }
            } 
        } else {
                console.debug('[Game] El jugador aun tiene actividad');
                document.getElementById("boton").innerHTML="Click aca";
                seconds_afk = 0;
            }
        
    },2000);

    const interval3 = setInterval(function(){
            seconds_afk++;
            console.debug('[Game] Contador de segundos afk: ' + seconds_afk, 'Button is active in the ofther 5 seconds: ' + is_active);
    }, 1000)

    //Aqui vamos a establecer la version de la aplicacion
    var clicks = 0
    var required = 1000;
    var IsEnd = false;
    var wins = 0;
    var contador=100000;
    var clicks_in_sconds = 0
    var seconds = 0
    var seconds_afk = 1

    document.getElementById('victorias').innerHTML = wins;
    document.getElementById('required').innerHTML = required;
    document.getElementById('puntos').innerHTML = contador;
    document.getElementById('clicks').innerHTML = clicks;
    document.getElementById("boton").onclick=function(){
        is_active = true
        clicks_in_sconds++;
        clicks ++;
        contador ++;
        document.getElementById("puntos").innerHTML=contador;
        const points = document.getElementById("puntos").innerHTML;
        document.getElementById("clicks").innerHTML=clicks;
        //Si llega a 15 victorias termina el juego
        if(!IsEnd) {
            if(wins <= 14) {
                if (points >= required) {
                    required = required * 2;
                    wins++;
                    document.getElementById("victorias").innerHTML=wins;
                    contador=124314453^231231;
                    document.getElementById("puntos").innerHTML=contador;
                    document.getElementById('required').innerHTML=required;
                    console.log('[Game] Se detecto una victoria, TOTAL DE VICTORIAS: ' + wins);
                } else {
                    console.error('[Game] Error, no se detecto una victoria');
                }
            } else if(wins >= 15) {
                console.info('[Game] Se detectaron mas de 15 victorias: ' + wins);
                document.getElementById("victorias").innerHTML=wins;
                document.getElementById("required").innerHTML=required;
                document.getElementById("puntos").innerHTML=contador;
                document.getElementById("boton").disabled=true;
                document.getElementById("boton").innerHTML="Juego terminado";
                const end_game_text = document.createElement("span");
                const new_button = document.createElement("button");
                const new_button1 = document.createElement("button");
                end_game_text.innerHTML="Quieres continuar pero sin recompensas?";
                end_game_text.id="end_game_text";
                new_button.id="button1";
                new_button1.id="button2";
                new_button.innerHTML="Si";
                new_button1.innerHTML="No";
                document.getElementById("end_game").appendChild(end_game_text);
                document.getElementById("end_game").appendChild(new_button);
                document.getElementById("end_game").appendChild(new_button1);
                document.getElementById('button1').onclick=function(){
                    console.info('[Game] Se detecto un continuar sin recompensas');
                    document.getElementById("boton").disabled=false;
                    document.getElementById("boton").innerHTML="Clica aqui";
                    document.getElementById("end_game_text").remove();
                    document.getElementById("button1").remove();
                    document.getElementById("button2").remove();
                    IsEnd = true
                }   
                document.getElementById('button2').onclick= async function(){
                    alias = document.getElementById('alias').value;
                    console.warn('[Game] Se obtuvo el alias del jugador: ' + alias);
                    console.warn('[Game] Se detecto una terminacion del juego, eliminando variables');
                    document.getElementById("boton").disabled=true;
                    document.getElementById("boton").innerHTML="Juego terminado";
                    document.getElementById("victorias").innerHTML=`${wins}`;
                    document.getElementById("required").innerHTML='null';
                    clearInterval(interval3)
                    clearInterval(interval2);
                    console.warn('[Game] Se detuvo la deteccion de afk');
                    clearInterval(interval);
                    console.warn('[Game] Se detuvo el calculo de clicks por segundo');
                    document.getElementById("clicks_per_second").innerHTML= clicks / seconds;
                    document.getElementById("end_game_text").remove();
                    document.getElementById("button1").remove();
                    document.getElementById("button2").remove();
                    console.warn('[Game] Enviando datos al servidor...');
                    const request = await sendPoints(clicks, FinallyID, alias);
                    console.info('[API] Status: ' + request.response.status);
                    console.info('[API] Response: ' + request.response);
                    console.warn('[Game] Se enviaron los puntos al servidor');
                    console.warn('[Game] Se eliminaron los botones');
                    console.warn('[Game] Se eliminaron las variables');
                    console.warn('[Game] Reiniciando el juego en 10 segundos...');
                    var seconds_timeout = 10;
                    setInterval(() => {
                        seconds_timeout--;
                        console.warn(`[Game] Reiniciando el juego en ${seconds_timeout} segundos...`);
                    }, 1000)
                    setTimeout(() => {
                        console.warn('[Game] Reiniciando el juego...');
                        location.reload();
                    }, 10000)
                }

            } else {
                console.error('[Game] Error, no se detecto una victoria');
            }
        } else { //Esto va a ser en caso de que se haya decicido continuar sin recompensas
            if (points >= required) {
                required = required * 2;
                wins++;
                document.getElementById("victorias").innerHTML=wins;
                contador=124314453^231231;
                document.getElementById("puntos").innerHTML=contador;
                document.getElementById('required').innerHTML=required;
                console.log('[Game] Se detecto una victoria, TOTAL DE VICTORIAS: ' + wins);
            }  
        }
    }
    //Aqui voy a poner un interval para que se este guardando constantemente el juego mandando la informacion a la api por medio de la funcion sendPoints
    //Esto es para que se guarde constantemente la informacion del juego
    const auto_guardado = setInterval(async () => {
        alias = document.getElementById('alias').value;
        console.warn('[Game] Se obtuvo el alias del jugador: ' + alias);
        console.warn('[Game] Iniciando autoguardado del juego...');

        const request = await sendPoints(clicks, FinallyID, alias);

        console.info('[API] Status: ' + request.response.status);
        console.info('[API] Response: ' + request.response);
        console.warn('[Game] Se enviaron los puntos al servidor');

        setTimeout(() => {
            console.warn('[Game] Autoguardado en 30s...');
            setTimeout(() => {
                console.log('[Game] Autoguardado en 10s...');
                var seconds_AutoGuardado = 10;
                const aviso_AutoGuardado = setInterval(() => {
                    seconds_AutoGuardado--;
                    console.warn(`[Game] Autoguardado en ${seconds_AutoGuardado}s...`);
                }, 1000);
                setTimeout(() => {
                    console.warn('[Game] Autoguardado en 0s...');
                    clearInterval(aviso_AutoGuardado);
                }, 10 * 1000);
            }, 20 * 1000);
        }, 30 * 1000)
    }, 60* 1000);

    
    window.onerror = async function(err) {
        console.warn('[Game] Se detecto un error, obteniendo datos del error');
            console.error('[Game] Error: ' + err);
            console.warn('[Game] Eliminando variables...')
            clearInterval(auto_guardado);
            console.warn('[Game] Se detuvo el autoguardado');
            try {
                var wins = 'error, revisa consola para a ver el error';
                
                alias = document.getElementById('alias').value;
                console.warn('[Game] Se obtuvo el alias del jugador: ' + alias);
                document.getElementById("boton").disabled=true;
                document.getElementById("boton").innerHTML="Error detectado";
                document.getElementById("victorias").innerHTML=`${wins}`;
                document.getElementById("required").innerHTML='null';
                clearInterval(interval3);
                clearInterval(interval2);
                console.warn('[Game] Se detuvo la deteccion de afk');
                clearInterval(interval);
                console.warn('[Game] Se detuvo el calculo de clicks por segundo');
                document.getElementById("clicks_per_second").innerHTML= clicks / seconds;
                console.warn('[Game] Enviando datos al servidor...');
                const request = await sendPoints(clicks, FinallyID, alias);
                console.info('[API] Status: ' + request.response.status);
                console.info('[API] Response: ' + request.response);
                console.warn('[Game] Se enviaron los puntos al servidor');
                console.warn('[Game] Se eliminaron los botones');
                console.warn('[Game] Se eliminaron las variables');
                console.warn('[Game] Listo para un reinicio seguro');
                console.warn('[Game] Reiniciando el juego en 10 segundos...');
                var seconds_timeout = 10;
                setInterval(() => {
                    seconds_timeout--;
                    console.warn(`[Game] Reiniciando el juego en ${seconds_timeout} segundos...`);
                }, 1000)
                setTimeout(() => {
                    console.warn('[Game] Reiniciando el juego...');
                    location.reload();
                }, 10000)
            } catch (error) {
                
                alias = document.getElementById('alias').value;
                console.warn('[Game] Se obtuvo el alias del jugador: ' + alias);
                console.error(`[Game] No se pudo eliminar las variables ${error}, forzando reinicio del juego`);
                console.warn('[Game] Enviando datos al servidor...');
                const request = sendPoints({FinallyID, clicks, alias});
                console.info('[API] Status: ' + request.response.status);
                console.info('[API] Response: ' + request.response);
                console.warn('[Game] Se enviaron los puntos al servidor');
                console.warn('[Game] Reiniciando el juego en 10 segundos...');
                var seconds_timeout = 10;
                setInterval(() => {
                    seconds_timeout--;
                    console.warn(`[Game] Reiniciando el juego en ${seconds_timeout} segundos...`);
                }, 1000)
                setTimeout(() => {
                    console.warn('[Game] Reiniciando el juego...');
                    location.reload();
                }, 10000)
            }
    }
}
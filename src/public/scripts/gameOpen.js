import {sendPoints, existGame} from '../../api/scripts/index.js'
import NodeFetch from 'https://cdn.skypack.dev/node-fetch';
const FirstID = Math.floor(Math.random() * 1394124122352345);
const FinallyID = FirstID.valueOf();
var alias = null
console.info('[Game] ID del juego: ' + FinallyID)

window.onload=async function() { 

    const changeTextLoading = setInterval(() => {
        const text = document.getElementById('loading')
        text.innerHTML = 'Obteniendo partida...'
        setTimeout(() => {
            text.innerHTML = 'Obteniendo partida.'
        }, 500)
        setTimeout(() => {
            text.innerHTML = 'Obteniendo partida..'
        }, 1000)
        setTimeout(() => {
            text.innerHTML = 'Obteniendo partida...'
        }, 1500)
    }, 2000)

    const urlPath = window.location.pathname

    console.log(urlPath)
    const urlArray = urlPath.split('/')
    const url = urlArray[urlArray.length - 1]

    console.log(url)

    if(isNaN(url)) {
        clearInterval(changeTextLoading)
        console.error('[Game] El ID del juego no es un número')
        document.getElementById('loading').innerHTML = 'Error al obtener el ID del juego. Redirigiendo...'
        setTimeout(() => {
            window.location.href = '/game'
        }, 3000)
        return alert('No se puede abrir el juego')
    }
    if(!await existGame(url)) {
        clearInterval(changeTextLoading)
        console.error('[Game] El ID del juego no existe')
        document.getElementById('loading').innerHTML = 'Error al obtener el ID del juego. Redirigiendo...'
        setTimeout(() => {
            window.location.href = '/game'
        }, 3000)
        return alert('No se puede abrir el juego')
    }
}
import {sendPoints, existGame, getGame} from '../../api/scripts/index.js'
import NodeFetch from 'https://cdn.skypack.dev/node-fetch';
/**
 * 
 * @param {Response} dataResponse 
 */
async function loadGame (dataResponse) {

  if(!dataResponse) {
    console.error('[GAME] No se pudo obtener la partida')
    alert('Error al obtener la partida. Redirigiendo...')
    return location.replace('/game')
  }



  const dataGame = await dataResponse.json()
  console.log('[Game] Datos de la partida: ')
  console.log(dataGame)

  const game = document.getElementById('game')
  game.style.display = 'block'

  const loading = document.getElementById('loading')
  loading.style.display = 'none'

  var clicks = dataGame.points;
  var required = dataGame.required;
  var IsEnd = false;
  var wins = dataGame.wins;
  var contador = dataGame.level_points;
  var clicks_in_sconds = 0;
  var seconds = 0;
  var seconds_afk = 0;
  var is_active = true;

  const points_text = document.getElementById('clicks')
  const clicks_in_sconds_text = document.getElementById('clicks_per_second')
  const required_text = document.getElementById('required')
  const wins_text = document.getElementById('victorias')
  const contador_text = document.getElementById('puntos')

  contador_text.innerHTML = contador;
  required_text.innerHTML = required;
  wins_text.innerHTML = wins;
  points_text.innerHTML = clicks;
  clicks_in_sconds_text.innerHTML = clicks_in_sconds;

  if(wins <= 15) {
    
  } else {
    alert('Has ganado!')

  }

  window.onerror = function(error) {
    
  }

}

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
    const urlArray = urlPath.split('/')
    const url = urlArray[urlArray.length - 1]

    console.log(`[GAME] Obteniendo partida con la ID: ${url}`)

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
        return alert('No existe la partida')
    }

    
    const nose = await getGame(url)
    console.log(`[GAME] Partida obtenida`)
    console.log(nose)
    loadGame(nose)
    clearInterval(changeTextLoading)

}
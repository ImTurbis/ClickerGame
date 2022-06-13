

/**
 * 
 * @param {number} points Clicks totales del usuario
 * @param {number} id Identificador del usuario
 * @param {string} ip Dirección IP del usuario
 * @param {string} alias Alias del usuario
 * @param {string} wins Número de victorias del usuario
 * @param {string} level_points Numero de clicks en la victoria del usuario
 * @returns 
 */
export async function sendPoints(points, id, alias, wins, required, level_points, ip) {

    try {
    const response = await fetch(`http://localhost:1152/api/game/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            points,
            alias,
            wins,
            required,
            level_points,
            ip
        })
    })
    console.info(response)
    const data = await response.json()
    console.debug('[API MODULE index.js]' + data)
        return Promise.resolve({
            id: data.id,
            points: data.points,
            alias: alias,
            victorias: data.wins,
            lever_points: data.level_points,
            required: data.required,
            response: {
                error: false,
                status: 200,
                message: data.message
            }
        });
    } catch (err) {
        console.warn('[API] Error al enviar los puntos: ', err)
        return Promise.reject({
            id: data.id,
            points: data.points,
            alias: alias,
            victorias: data.wins,
            lever_points: data.level_points,
            required: data.required,
            response: {
                error: true,
                status: 500,
                message: err
            }
        });
    }
}

export async function existGame (id) {
    try {
        const response = await fetch(`http://localhost:1152/api/game/exist/${id}`)
        const data = await response.json()
        console.debug('[API MODULE index.js]' + data)
        if(data.response.status === 404) return false
        return true
    } catch (err) {
        alert(`[API] Error al verificar si existe el juego: ${err}`)
        return false
    }
}

export async function getGame (id) {
    try {
        const response = await fetch(`http://localhost:1152/api/game/${id}`)
        console.debug('[API MODULE index.js]' + response)
        return response 
    } catch (err) {
        console.warn(`[API] Error al obtener el juego: ${err}`)
        return false
    }
}

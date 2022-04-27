

/**
 * 
 * @param {number} points 
 * @param {number} id 
 * @param {string} alias    
 * @returns 
 */
export async function sendPoints(points, id, alias) {

    try {
    const response = await fetch(`http://localhost:1152/api/game/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            points,
            alias
        })
    })
    console.info(response)
    const data = await response.json()
    console.debug('[API MODULE index.js]' + data)
        return Promise.resolve({
            id: data.id,
            points: data.points,
            alias: alias,
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
            response: {
                error: true,
                status: 500,
                message: err
            }
        });
    }
}

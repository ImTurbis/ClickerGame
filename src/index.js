const express = require('express')
const app = express()
const path = require('path')
const megadb = require('megadb')
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.all('/', function (req, res) {
    res.redirect(301, '/game')
})

app.get('/public/styles/index.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/styles/index.css'))
})

app.get('/public/scripts/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/scripts/index.js'))
})

app.get('/private/styles/index.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/private/styles/index.css'))
})

app.get('/private/scripts/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/private/scripts/index.js'))
})

app.get('/private/view/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/private/view/index.html'))
})

//Necesito insertar todos los archivos de la carpeta public de estilos y scripts que se llamen game
app.get('/public/styles/game.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/styles/game.css'))
})

app.get('/public/scripts/game.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/scripts/game.js'))
})

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/view/game.html'))
})

app.get('/package.json', function (req, res) {
    res.sendFile(path.join(__dirname, '/../package.json'))
})

app.get('/api/game/:id', function (req, res) {
    res
    .status(200)
    .send('[API] Se conecto con la id: ' + req.params.id)
})

app.post('/api/game/:id', function (req, res) {
    const data = req.body;
        var alias
        if(!data.alias) {
            alias = `Player ${(Math.floor(Math.random() * 100) + 1).valueOf()}`
        }
    if(req.params.id === 'undefined') {
        res.status(404).send(JSON.stringify({ 
            id: req.params.id,
            points: data.points,
            response: {
                error: true,
                status: 404,
                message: 'Not Found'
            }
        }))
    } else {
    try {
        console.log(data)
        const db = new megadb.crearDB('players_data', 'api_data')
        db.establecer(req.params.id, {
            points: data.points,
            alias: data.alias
        })
    } catch (err) {
        res.status(500).send(JSON.stringify({ 
            id: req.params.id,
            points: data.points,
            response: {
                error: true,
                status: 500,
                message: err
            }
        }))
    }
    res
    .status(200)
    .send(JSON.stringify({
        id: req.params.id,
        points: data.points,
        response: {
            error: false,
            status: 200,
            message: 'Se actualizo correctamente el puntaje'
        }
    })
    )
}
})

app.get('/api/scripts/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/api/scripts/index.js'))
})

//oyp3hxs


app.listen(1114)
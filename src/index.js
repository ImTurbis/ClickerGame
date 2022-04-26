const express = require('express')
const app = express()
const path = require('path')
const megadb = require('megadb')
const bodyParser = require("body-parser");
const fs = require('fs')
const escape = require('escape-html');


const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(bodyParser.json());

app.all('/', function (req, res) {
    res.redirect(301, '/game')
})

//Aqui voy a tener que dar un aviso sobre el uso de la ip para guardar la partiva
app.get('/game/advertencia', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/advertencia.html'))
})

app.get('/private/:file', function (req, res) {
    fs.existsSync(path.join(__dirname + '/private/' + req.params.file)) ? res.sendFile(path.join(__dirname + '/private/' + req.params.file)) : res.sendFile(path.join(__dirname + '/public/404.html'))
})

//Necesito insertar todos los archivos de la carpeta public de estilos y scripts que se llamen game
app.get('/public/:file', function (req, res) {
    fs.existsSync(path.join(__dirname + '/public/' + req.params.file)) ? res.sendFile(path.join(__dirname + '/public/' + req.params.file)) : res.sendFile(path.join(__dirname + '/public/404.html'))
})

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/view/game.html'))
})

app.get('/package.json', function (req, res) {
    res.sendFile(path.join(__dirname, '/../package.json'))
})

app.get('/api/game/:id', async function (req, res) {
    const db = new megadb.crearDB('game')
    const game = db.obtener(req.params.id)
    if(!game) {
        res.json({ error: 'No existe el juego' +  escape(req.params.id) })
    } else {
        res.status(200).json(game)
    }
})

app.post('/api/game/:id', function (req, res, next) {
    
    const data = req.body;
        var alias = '';
        if(!data.alias) {
            alias = `Player ${(Math.floor(Math.random() * 100) + 1).valueOf()}`
        } else {
            alias = data.alias
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
            alias: alias
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



app.listen(1114)
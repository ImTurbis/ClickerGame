import express from 'express'
const app = express()
import megadb from 'megadb'
import bodyParser from "body-parser"
import fs from 'fs'
import escape from 'escape-html';
import dontev from 'dotenv'
import meow from 'meowdb'
const db = new meow({
    name: 'meowdb',
    dir: './db'
})
dontev.config()


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import rateLimit from 'express-rate-limit'

const filesRateLimit = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/private', filesRateLimit);
app.use('/public', filesRateLimit);
app.use(bodyParser.json());

app.all('/', function (req, res) {
    res.redirect(301, '/game/advertencia')
})

//Aqui voy a tener que dar un aviso sobre el uso de la ip para guardar la partiva
app.get('/game/advertencia', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/view/aviso.html'))
})


app.get('/private/:dir/:file', function (req, res) {
    const IpClient = req.socket.remoteAddress
    console.warn(IpClient)
    if(IpClient !== process.env.IP) return res.sendStatus(403)
    fs.existsSync(path.join(__dirname + `/private/${req.params.dir}/${req.params.file}`)) ? res.sendFile(path.join(__dirname + `/private/${req.params.dir}/${req.params.file}`)) : res.sendFile(path.join(__dirname + '/public/404.html'))
})

//Necesito insertar todos los archivos de la carpeta public de estilos y scripts que se llamen game
app.get('/public/:dir/:file', function (req, res) {
    fs.existsSync(path.join(__dirname + `/public/${req.params.dir}/${req.params.file}`)) ? res.sendFile(path.join(__dirname + `/public/${req.params.dir}/${req.params.file}`)) : res.sendFile(path.join(__dirname + '/public/404.html'))
})

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/view/game.html'))
})

app.get('/game/:id', function (req, res) { 
    res.sendFile(path.join(__dirname, '/public/view/gameOpen.html'))
 })

app.get('/package.json', function (req, res) {
    res.sendFile(path.join(__dirname, '/../package.json'))
})

app.get('/api/game/exist/:id', async function (req, res) {
    const game = db.obtener(req.params.id)
    if (game) {
        res.json({
            response: {
                error: false,
                status: 200,
                message: 'Existe el usuario'
            }
        })
    } else {
        res.json({
            response: {
                error: true,
                status: 404,
                message: 'No existe el usuario'
            }
        })
    }
})

app.get('/api/game/:id', async function (req, res) {
    const game = db.obtener(req.params.id)
    if(!game) {
        res.json({ error: 'No existe el juego' +  escape(req.params.id) })
    } else {
        res.status(200).json(game)
    }
})



app.get('/close', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/view/close.html'))
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
            points: data.points,
            alias: alias,
            wins: data.wins,
            level_points: data.level_points,
            response: {
                error: true,
                status: 404,
                message: 'Not Found'
            }
        }))
    } else {
    try {
        console.log(data)
        db.establecer(req.params.id, {
            points: data.points,
            alias: alias,
            wins: data.wins,
            level_points: data.level_points,
            ip: data.ip
        })
    } catch (err) {
        res.status(500).send(JSON.stringify({ 
            id: req.params.id,
            points: data.points,
            alias: alias,
            wins: data.wins,
            level_points: data.level_points,
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
        alias: alias,
        wins: data.wins,
        level_points: data.level_points,
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

app.get('*' , function (req, res) {
    res.sendFile(path.join(__dirname + '/public/view/404.html'))
})

app.listen(1152)
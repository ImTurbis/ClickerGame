import { Router } from 'express' ;
import { db } from '../..';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routerGame = Router();

routerGame.all('/', function(req, res) { 
        res.redirect(301, '/game/advertencia');
    }
);

routerGame.get('/advertencia', function(req, res) {
        res.sendFile(path.join(__dirname + "/../../public/view/aviso.html"));
    }
);

routerGame.get('/newGame', function(req, res) {
        res.sendFile(path.join(__dirname + "/../../public/view/game.html"));
    }
);

routerGame.get('/:id', function(req, res) {
        res.sendFile(path.join(__dirname + "/../../public/view/gameOpen.html"));
    }
);

export default routerGame;




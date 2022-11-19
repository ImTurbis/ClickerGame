import { Router } from 'express' ;
import { db } from '../..';
import path from "path";
import { fileURLToPath } from "url";
export const routesApi = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

routesApi.get('/game/exist/:id', async function (req, res) {
        const game = db.get(req.params.id);
        if (game) {
            res.json({
            response: {
                error: false,
                status: 200,
                message: "Existe el usuario",
            },
            });
        } else {
            res.json({
            response: {
                error: true,
                status: 404,
                message: "No existe el usuario",
            },
            });
        }
    }
);

routesApi.post('/game/:id', async function (req, res) {
        const data = req.body;
        var alias = "";
        if (!data.alias) {
            alias = `Player ${(Math.floor(Math.random() * 100) + 1).valueOf()}`;
        }
        else {
            alias = data.alias;
        }
        if (req.params.id === "undefined") {
            res.status(404).send(
                JSON.stringify({
                    id: req.params.id,
                    points: data.points,
                    alias: alias,
                    wins: data.wins,
                    level_points: data.level_points,
                    required: data.required,
                    response: {
                        error: true,
                        status: 404,
                        message: "Not Found",
                    },
                })
            );
        }
        else {
            try {
                console.log(data);
                db.create(req.params.id, {
                    points: data.points,
                    alias: alias,
                    wins: data.wins ?? 0,
                    level_points: data.level_points ?? 0,
                });
                res.status(200).send(
                    JSON.stringify({
                        id: req.params.id,
                        points: data.points,
                        alias: alias,
                        wins: data.wins,
                        level_points: data.level_points,
                        required: data.required ?? 1000,
                        response: {
                            error: false,
                            status: 200,
                            message: "Usuario creado",
                        },
                    })
                );
            }
            catch (err) {
                res.status(500).send(
                    JSON.stringify({
                        id: req.params.id,
                        points: data.points,
                        alias: alias,
                        wins: data.wins,
                        level_points: data.level_points,
                        required: data.required ?? 1000,
                        response: {
                            error: true,
                            status: 500,
                            message: err,
                        },
                    })
                );
            }
        }
    }
);
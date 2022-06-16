import express from "express";
const app = express();
import bodyParser from "body-parser";
import fs from "fs";
import escape from "escape-html";
import dontev from "dotenv";
import meow from "meowdb";
import morgan from "morgan";
import routerGame from "./routes/game/gameRoutes";
import routerData from "./routes/data/dataRoutes";
export const db = new meow({
  name: "GameData",
  dir: "src/db",
});
dontev.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import rateLimit from "express-rate-limit";

const filesRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/private", filesRateLimit);
app.use("/public", filesRateLimit);
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use('/game', routerGame);
app.use('/', routerData);

app.all("/", function (req, res) {
  res.redirect(301, "/game/");
});



app.get("/package.json", function (req, res) {
  res.sendFile(path.join(__dirname, "/../package.json"));
});

app.get("/api/game/exist/:id", async function (req, res) {
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
});

app.get("/api/game/:id", async function (req, res) {
  const game = db.exists(req.params.id);
  if (!game) {
    res.json({ error: "No existe el juego" + escape(req.params.id) });
  } else {
    const gameJson = db.get(req.params.id);
    res.status(200).json(gameJson);
    console.log(gameJson);
  }
});

app.get("/close", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/view/close.html"));
});

app.post("/api/game/:id", function (req, res, next) {
  const data = req.body;
  var alias = "";
  if (!data.alias) {
    alias = `Player ${(Math.floor(Math.random() * 100) + 1).valueOf()}`;
  } else {
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
  } else {
    try {
      console.log(data);
      db.create(req.params.id, {
        points: data.points,
        alias: alias,
        wins: data.wins ?? 0,
        level_points: data.level_points ?? 0,
        required: data.required ?? 1000,
        ip: data.ip ?? '0.0.0.0',
      });
    } catch (err) {
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
          message: "Se actualizo correctamente el puntaje",
        },
      })
    );
  }
});

app.get("/api/scripts/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/api/scripts/index.js"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/view/404.html"));
});

app.listen(1152);

import { Router } from 'express';
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routerData = Router();


routerData.get('/public/:dir/:file', function(req, res) {
    fs.existsSync(
        path.join(__dirname + `/../../public/${req.params.dir}/${req.params.file}`)
      )
        ? res.sendFile(
            path.join(__dirname + `/../../public/${req.params.dir}/${req.params.file}`)
          )
        : res.sendFile(path.join(__dirname + "/../../public/view/404.html"));
    }   
);

routerData.get('/private/:dir/:file', function(req, res) {
    const IpClient = req.socket.remoteAddress;
    console.warn(IpClient);
    if (IpClient !== process.env.IP) return res.sendStatus(403);
    fs.existsSync(
      path.join(__dirname + `/../../private/${req.params.dir}/${req.params.file}`)
    )
      ? res.sendFile(
          path.join(__dirname + `/../../private/${req.params.dir}/${req.params.file}`)
        )
      : res.sendFile(path.join(__dirname + "/../../public/view/404.html"));
    }
);

export default routerData
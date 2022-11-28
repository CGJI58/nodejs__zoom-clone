import express from "express";
import WebSocket from "ws";
import http from "http";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(PORT, handleListen);

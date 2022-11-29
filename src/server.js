import express from "express";
import WebSocket from "ws";
import http from "http";

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (message, isBinary) => {
    message = isBinary ? message : message.toString();
    console.log("New message from the browser:", message);
  });
  socket.send("Hello~~");
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

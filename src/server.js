import express from "express";
import WebSocket from "ws";
import http from "http";

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  socket.on("message", (message) => {
    const messageObj = JSON.parse(message.toString("utf8"));
    switch (messageObj.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${messageObj.payload}`)
        );
      case "nickname":
        socket["nickname"] = messageObj.payload;
    }
  });
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

import express from "express";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import http from "http";

const PORT = 4000;

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });

  socket.on("new_message", (message, room, done) => {
    socket.to(room).emit("new_message", message);
    done();
  });
});

// const wss = new WebSocket.Server({ server });
// const sockets = [];

// wss.on("connection", (socket) => {
//   console.log("Connected to Browser ✅");
//   socket.on("close", () => console.log("Disconnected from Browser ❌"));
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   socket.on("message", (message) => {
//     const messageObj = JSON.parse(message.toString("utf8"));
//     switch (messageObj.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${messageObj.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = messageObj.payload;
//     }
//   });
// });

httpServer.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);

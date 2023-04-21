const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*", // Allow any origin to access the server
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("userjoined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
  });

  socket.on("disconnect", () => {
    const userName = users[socket.id];
    if (userName) {
      socket.broadcast.emit("leave", userName);
      delete users[socket.id];
    }
  });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

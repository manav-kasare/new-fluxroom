const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const PORT = 3000;

io.on("connection", (socket) => {
  console.log("A User connected");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

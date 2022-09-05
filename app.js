const path = require("path");
const express = require("express");
const cors = require("cors");
const JSZip = require("jszip");

const app = express();
app.use(cors());
const http = require("http").createServer(app);

var latestData = "nill";

http.listen(process.env.PORT || 5500);

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("user connected");
  io.emit("file", latestData);
  socket.on("host", (data) => {
    io.emit("file", data);
    latestData = data;
  });
});

app.use(express.static(path.join(__dirname, "frontend")));

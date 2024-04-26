var net = require("net");

var tcpServer = net.createServer();

tcpServer.on("connection", function (socket) {
  // After client is connected to server
  console.log("A client just connected");
  socket.write("Welcome new client");

  // log the data sent by that client
  socket.on("data", (clientData) => {
    console.log(`Client Sent ${clientData}`);
  });
});

// Listen to any connection to the server
tcpServer.listen(5000, "127.0.0.1", () => {
  console.log("Server bound");
});

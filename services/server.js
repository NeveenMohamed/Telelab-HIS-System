const mongoose = require("mongoose");
var net = require("net");

// ###################################### TCP SERVER ################################## //

// Create a TCP server
const server = net.createServer();
// Keep track of all connected clients
const sockets = new Set();

server.on('connection', (socket) => {
  console.log('Client connected');
  sockets.add(socket);

  // Handle data from the client
  socket.on('data', async (data) => {
    console.log('Received from client:', data.toString());
    socket.write('Data Received');

  });


  socket.on('end', () => {
    console.log('Client disconnected');
    sockets.delete(socket);
  });
});

// Start the server
const PORT = 3838;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// Function to watch all collections for changes
async function watchAllCollections() {
  try {
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    // Get a list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();

    // Watch each collection for changes
    collections.forEach(async (collectionInfo) => {
      const collection = db.collection(collectionInfo.name);
      const changeStream = collection.watch();

      changeStream.on("change", (change) => {
        console.log("Change detected in ${collectionInfo.name} collection:, change");
        client.write(JSON.stringify(change));
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


module.exports={watchAllCollections};

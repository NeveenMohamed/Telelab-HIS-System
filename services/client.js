// const mongoose = require("mongoose");
// var net = require("net");

// // Create a TCP client
// const client_TCP = new net.Socket();

// // Connect to the server
// const PORT = 3838;
// const HOST = "41.46.96.67";

// client_TCP.connect(PORT, HOST, () => {
//   console.log("Connected to server from client file");
//   // No need to send initial message here
// });

// // Handle data from the server
// client_TCP.on("data", (data) => {
//   console.log("Received from server:", data.toString());
// });

// // Handle connection closure
// client_TCP.on("close", () => {
//   console.log("Connection closed");
// });

// // Function to watch all collections for changes
// async function watchAllCollections() {
//   try {
//       const db = mongoose.connection;

//       db.on("error", console.error.bind(console, "MongoDB connection error:"));

//       // Get a list of all collections in the database
//       const collections = await mongoose.connection.db.listCollections().toArray();

//       // Watch each collection for changes
//       collections.forEach(async (collectionInfo) => {
//           const collection = db.collection(collectionInfo.name);
//           const changeStream = collection.watch();

//           changeStream.on("change", (change) => {
//               console.log(`Change detected in ${collectionInfo.name} collection:, change`);

//               // Send the change data to all connected clients
//               for (const socket of sockets) {
//                   socket.write(JSON.stringify(change));
//               }

//               // socket.write(JSON.stringify(change));
//           });
//       });
//   } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//   }
// }


// module.exports={watchAllCollections};

// // finally {
// //   // Close the client
// //   await client.close();
// // }
const MongoClient = require("mongodb").MongoClient;

var net = require("net");

// Create a TCP client
const client = new net.Socket();

// Connect to the server
const PORT = 3838;
const HOST = "41.46.96.67";

client.connect(PORT, HOST, () => {
  console.log("Connected to server from client file");
  // No need to send initial message here
});

// Handle data from the server
client.on("data", (data) => {
  console.log("Received from server:", data.toString());
});

// Handle connection closure
client.on("close", () => {
  console.log("Connection closed");
});

// Function to watch all collections for changes
async function watchAllCollections(url) {
  // Use connect method to connect to the server
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server from client file");

    // Get the database
    const db = client.db();

    // Get a list of all collections in the database
    const collections = await db.listCollections().toArray();

    // Watch each collection for changes
    collections.forEach((collectionInfo) => {
      const changeStream = db.collection(collectionInfo.name).watch();

      changeStream.on("change", (change) => {
        console.log(
          `Change detected in ${collectionInfo.name} collection:`,
          change
        );
        client.write(JSON.stringify(change));
      });
    });
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

module.exports={watchAllCollections};

// finally {
//   // Close the client
//   await client.close();
// }
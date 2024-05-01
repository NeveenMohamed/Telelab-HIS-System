const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "your_database_name";

var net = require("net");

// Create a TCP client
const client = new net.Socket();

// Connect to the server
const PORT = 3838;
const HOST = "154.177.209.54";

client.connect(PORT, HOST, () => {
  console.log("Connected to server");
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
async function watchAllCollections() {
  // Use connect method to connect to the server
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server");

    // Get the database
    const db = client.db(dbName);

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
  } finally {
    // Close the client
    await client.close();
  }
}

export default watchAllCollections;

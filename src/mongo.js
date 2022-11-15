import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
await client.connect();

const db = client.db("images");

process.on("exit", () => {
  client.close();
});

export { db };

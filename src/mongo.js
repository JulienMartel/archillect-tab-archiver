import { MongoClient } from "mongodb";
import "dotenv/config.js";

const client = new MongoClient(process.env.MONGODB_URI || "");
await client.connect();

const db = client.db("images");

process.on("exit", async () => {
  await client.close();
  process.exit();
});

export { db };

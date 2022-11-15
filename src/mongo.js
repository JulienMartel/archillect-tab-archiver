import { MongoClient } from "mongodb";
import "dotenv/config.js";

const client = new MongoClient(process.env.MONGODB_URI || "");
await client.connect();

const db = client.db("images");

export { db };

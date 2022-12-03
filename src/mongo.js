import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

console.log("mongo url: " + process.env.MONGODB_URI);

const client = new MongoClient(process.env.MONGODB_URI || "");
await client.connect();

const collection = client.db("images").collection("archive");

export { collection };

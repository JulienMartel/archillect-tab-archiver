import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const client = new MongoClient(process.env.MONGODB_URI || "");
await client.connect();

const collection = client.db("images").collection("archive");

export { collection };

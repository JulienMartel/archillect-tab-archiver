// used to get all the archillect posts that are missing in db

import { db } from "../src/mongo.js";
import fs from "node:fs/promises";
import ora from "ora";

const spinner = ora("starting").start();

const collection = db.collection("data");

const lastOneChecked = 0;
const amountToCheck = 50000; // go until u do them all, breka it up if u need

const max = lastOneChecked + amountToCheck;

let c = lastOneChecked;
while (c <= max) {
  spinner.text = `checking ${c} / ${max}`;
  const [post] = await collection.find({ _id: c }).toArray();

  if (!post) {
    spinner.fail(`POST ${c} NOT FOUND`);

    await fs.appendFile("missing.txt", c.toString() + "\n");

    spinner.start();
  }

  c++;
}

spinner.succeed("done");
process.exit();

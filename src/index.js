import ora from "ora";
import { db } from "./mongo.js";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";
import fs from "fs/promises";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrape = async (max) => {
  const spinner = ora("loading browser").start();

  const { browser, page } = await usePuppeteer();

  const [lastEntry] = await db
    .collection("data")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  const from = Number(lastEntry._id) + 1;
  const end = max + from;

  let c = from;
  while (c <= end) {
    try {
      spinner.text = `scraping #${c}/${end}`;
      await sleep(1400);

      await getArchillectImage(page, c);
    } catch (error) {
      spinner.fail(`failed to get #${c}: ${error.message || error}`);
      spinner.start();

      await fs
        .appendFile("./../missing.txt", c.toString() + "\n")
        .catch(console.error);
    } finally {
      c++;
    }
  }

  spinner.succeed("done");
  return await browser.close();
};

await scrape(50000);
process.exit();

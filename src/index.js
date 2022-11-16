import ora from "ora";
import { db } from "./mongo.js";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrape = async (max) => {
  const spinner = ora("loading browser").start(); // `scraping #${id}/${end}`

  const { browser, page } = await usePuppeteer();

  const [lastEntry] = await db
    .collection("data")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  const from = Number(lastEntry._id);
  const end = max + from;

  let c = from;
  while (c <= end) {
    try {
      spinner.text = `scraping #${c}/${end}`;
      await sleep(1000);

      await getArchillectImage(page, c);
    } catch (error) {
      spinner.fail("failed to get #" + c);
      console.error(error);
      spinner.start();
    } finally {
      c++;
    }
  }

  spinner.succeed("done");
  return await browser.close();
};

await scrape(1000);
process.exit();

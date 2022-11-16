import ora from "ora";
import { db } from "./mongo.js";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const scrape = async (from, max) => {
  const spinner = ora("loading browser").start(); // `scraping #${id}/${end}`

  const { browser, page } = await usePuppeteer();

  const x = db.collection("data").find().sort({ _id: -1 }).limit(1);
  console.log(x);

  // const end = max + from;

  // let c = from;
  // while (c <= end) {
  //   try {
  //     spinner.text = `scraping #${c}/${end}`;
  //     await getArchillectImage(page, c);
  //   } catch (error) {
  //     spinner.fail("failed to get #" + c);
  //     console.error(error);
  //     spinner.start();
  //   } finally {
  //     c++;
  //   }
  // }

  // return await browser.close();
};

// make it so that i read where to start it from
await scrape(301, 99);

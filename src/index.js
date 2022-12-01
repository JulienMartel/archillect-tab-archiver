import ora from "ora";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";
import fs from "node:fs/promises";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrape = async (list) => {
  const spinner = ora("loading browser").start();

  const { browser, page } = await usePuppeteer();

  let c = 0;
  let max = list.length;

  while (c < max) {
    try {
      spinner.text = `scraping #${list[c]}`;
      await sleep(1400);

      await getArchillectImage(page, list[c]);
    } catch (error) {
      spinner.fail(`failed to get #${list[c]}: ${error.message || error}`);
      spinner.start();
    } finally {
      c++;
    }
  }

  spinner.succeed("done");
  return await browser.close();
};

const readFileLines = async (filename) =>
  (await fs.readFile(filename)).toString().split("\n");

const list = await readFileLines("log.txt");
// console.log(list);

await scrape(50000);
process.exit();

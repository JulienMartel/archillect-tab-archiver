import ora from "ora";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage, sleep } from "./utils.js";
import fs from "node:fs/promises";

const spinner = ora("loading browser").start();

const { browser, page } = await usePuppeteer();

// 1. find most recent post id
// 2. check if its in db
// 3. if not, scrape it and add it to db
//  3a. repeat with post id - 1
// 4. if so, stop

await page.goto("https://archillect.com/", {
  waitUntil: "load",
});

await page.waitForSelector("section#posts", { timeout: 10000 });

const recentPostId = await page.$eval("section#posts > div:first-child", (el) =>
  el.href.split("/").pop()
);

console.log(recentPostId);

// while (c < max) {
//   try {
//     spinner.text = `scraping #${list[c]}`;
//     await sleep(1400);

//     await getArchillectImage(page, list[c]);
//   } catch (error) {
//     spinner.fail(`failed to get #${list[c]}: ${error.message || error}`);
//     spinner.start();
//   } finally {
//     c++;
//   }
// }

spinner.succeed("done");
await browser.close();

process.exit();

import { usePuppeteer } from "./use-puppeteer.js";

const { browser, page } = await usePuppeteer();

await page.goto("https://archillect.com/1", { waitUntil: "domcontentloaded" });

await page.waitForSelector("img#ii");
const src = await page.$eval("img#ii", (el) => el.src);

console.log(src);

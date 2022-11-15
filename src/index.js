import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const { browser, page } = await usePuppeteer();

const max_count = 100;

let c = 1;
while (c <= max_count) {
  await getArchillectImage(page, c);

  c++;
}

await browser.close();

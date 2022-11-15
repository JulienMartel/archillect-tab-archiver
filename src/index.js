import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const { browser, page } = await usePuppeteer();

const max_count = 10;

let c = 1;
while (c <= max_count) {
  const src = await getArchillectImage(page, c);
  // console.log({ id: c, src });
  c++;
}

await browser.close();

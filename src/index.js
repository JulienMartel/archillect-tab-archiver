import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const scrape = async (from, max) => {
  const { browser, page } = await usePuppeteer();

  let c = from;
  while (c <= from + max) {
    await getArchillectImage(page, c, max);
    c++;
  }

  await browser.close();
};

await scrape(101, 100);

import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage } from "./utils.js";

const scrape = async (from, max) => {
  const { browser, page } = await usePuppeteer();

  const end = max + from;

  let c = from;
  while (c <= end) {
    await getArchillectImage(page, c, end);
    c++;
  }

  await browser.close();
};

await scrape(202, 98);

import { collection } from "./mongo.js";
import { usePuppeteer } from "./use-puppeteer.js";
import { getArchillectImage, sleep } from "./utils.js";

console.log("⚙ starting");

const { browser, page } = await usePuppeteer();

await page.goto("https://archillect.com/", {
  waitUntil: "load",
});

await page.waitForSelector("section#posts", { timeout: 10000 });

const recentPostId = await page.$eval("section#posts > a:first-child", (el) =>
  // @ts-ignore
  el.href.split("/").pop()
);

let c = 0;
while (true) {
  const id = recentPostId - c;
  console.log(`checking ${id}`);

  const [post] = await collection.find({ postId: id }).toArray();
  if (post) break;

  await getArchillectImage(page, id);
  await sleep(1400);

  c++;
}

console.log("✔ done\n");
await browser.close();

process.exit();

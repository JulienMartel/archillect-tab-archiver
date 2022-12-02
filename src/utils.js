import { db } from "./mongo.js";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getArchillectImage = async (page, id) => {
  await page.goto("https://archillect.com/" + id, {
    waitUntil: "load",
  });

  await page.waitForSelector("img#ii", { timeout: 10000 });
  const { src, w, h } = await page.$eval("img#ii", (el) => ({
    src: el.src,
    w: el.naturalWidth,
    h: el.naturalHeight,
  }));

  const sources = await page.$$eval("#sources > :not(:last-child)", (els) =>
    els.map((a) => a.href)
  );

  await db.collection("data").insertOne({ _id: id, src, w, h, sources });

  return null;
};

import ora from "ora";

export const getArchillectImage = async (page, id) => {
  const spinner = ora("scraping #" + id).start();

  try {
    await page.goto("https://archillect.com/" + id, {
      waitUntil: "load",
    });

    await page.waitForSelector("img#ii");
    const { src, w, h } = await page.$eval("img#ii", (el) => ({
      src: el.src,
      w: el.naturalWidth,
      h: el.naturalHeight,
    }));

    const sources = await page.$$eval("#sources > :not(:last-child)", (els) =>
      els.map((a) => a.href)
    );

    console.log({ id, src, w, h, sources });

    spinner.succeed("#" + id);
    return src;
  } catch (e) {
    spinner.fail("failed to scrape #" + id);
  }
};

import ora from "ora";

export const getArchillectImage = async (page, id) => {
  const spinner = ora("scraping #" + id).start();

  try {
    spinner.color = "yellow";
    await page.goto("https://archillect.com/" + id, {
      waitUntil: "load",
    });

    spinner.color = "green";

    await page.waitForSelector("img#ii");
    const { src, w, h } = await page.$eval("img#ii", (el) => ({
      src: el.src,
      w: el.naturalWidth,
      h: el.naturalHeight,
    }));

    const sources = await page.$$eval("#sources > :not(:last-child)", (els) =>
      els.map((a) => a.href)
    );

    spinner.succeed("#" + id);

    // save to db
    console.log({ id, src, w, h, sources });

    return src;
  } catch (e) {
    spinner.fail("failed to scrape #" + id);
  }
};

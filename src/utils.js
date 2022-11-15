import ora from "ora";

export const getArchillectImage = async (page, id) => {
  const spinner = ora("scraping #" + id).start();

  try {
    await page.goto("https://archillect.com/" + id, {
      waitUntil: "load",
    });

    await page.waitForSelector("img#ii");
    const src = await page.$eval("img#ii", (el) => el.src);

    spinner.succeed("#" + id);
    return src;
  } catch (e) {
    spinner.fail("failed to scrape #" + id);
  }
};

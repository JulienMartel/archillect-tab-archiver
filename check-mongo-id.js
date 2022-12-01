const { client } = require("./lib/mongodb");
const fs = require("fs");

client.connect().then(async (client) => {
  const ora = (await import("ora")).default;
  const spinner = ora().start();

  const collection = client.db("images").collection("data");

  const total = await collection.countDocuments();

  const lastOneChecked = 30000;
  const amountToCheck = 10000;

  const max = lastOneChecked + amountToCheck;

  let c = lastOneChecked;
  while (c <= max) {
    spinner.text = `checking ${c} / ${max} (total: ${total})`;
    const [post] = await collection.find({ _id: c }).toArray();

    if (!post) {
      spinner.fail(`POST ${c} NOT FOUND`);
      spinner.start();

      fs.appendFile("log.txt", c.toString() + "\n", (err) => {
        if (err) throw err;
      });
    }

    c++;
  }

  spinner.stop();
  return client.close();
});

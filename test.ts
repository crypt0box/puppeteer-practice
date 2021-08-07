import puppeteer from "puppeteer";

const options = {
  headless: false, // ヘッドレスをオフに
};

(async () => {
  const url = 'https://books.rakuten.co.jp/event/book/literature/hontai/';

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: "domcontentloaded"});
  const elems = await page.$x('//*[@id="bodyClump"]/div[2]/div[9]/ul[2]/li[3]/div[1]/a');
  console.log("elems", JSON.stringify(elems[0]) )

  await browser.close();
})();


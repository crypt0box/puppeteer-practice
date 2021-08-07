import puppeteer from "puppeteer";

const options = {
  headless: false, // ヘッドレスをオフに
  slowMo: 100  // 動作を遅く
};

(async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
//*[@id="bodyClump"]/div[1]/div[1]/ul/li/div[2]
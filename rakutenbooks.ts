import puppeteer from "puppeteer";

type BookProps = {
  [id: string]: {
    title?: string;
    author?: string;
    imageUrl?: string;
    reward: "本屋大賞";
    link: string | null;
  };
};

const books: BookProps[] = [];

const options = {
  headless: false, // ヘッドレスをオフに
  // slowMo: 100
};

const getRandomId = (N = 20) => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(N))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join("");
};

(async () => {
  const fetchBookThumbnail = async (url: string) => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const elems = await page.$x('//*[@id="productExtra"]/dl/dt/a');
    const jsHandle = await elems[0].getProperty("href");
    const thumbnailUrl: string | undefined = await jsHandle?.jsonValue();
    return thumbnailUrl;
  };

  const url = "https://books.rakuten.co.jp/event/book/literature/hontai/";

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  for (let i = 0; i < 3; i++) {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const noteElems = await page.$x("//div[contains(@class, 'note')]");
    const bookDetailPageElems = await page.$x(
      "//div[contains(@class, 'image')]/a"
    );

    const innerText = await noteElems[i].getProperty("innerText");
    const text: string | undefined = await innerText?.jsonValue();
    const title = text?.split(/\r\n|\n/)[0];
    const author = text?.split(/\r\n|\n/)[1];

    const href = await bookDetailPageElems[i].getProperty("href");
    const bookUrl: string | undefined = await href?.jsonValue();
    if (!bookUrl) continue;
    const thumbnail = await fetchBookThumbnail(bookUrl);

    const id = getRandomId();

    books.push({
      [`${id}`]: {
        title: title,
        author: author,
        imageUrl: thumbnail,
        reward: "本屋大賞",
        link: null,
      },
    });
  }

  console.log(JSON.stringify(books));

  await browser.close();
})();

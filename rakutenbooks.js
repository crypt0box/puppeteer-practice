"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const books = [];
const options = {
    headless: false,
};
const getRandomId = (N = 20) => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(Array(N))
        .map(() => S[Math.floor(Math.random() * S.length)])
        .join("");
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    const fetchBookThumbnail = (url) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto(url, { waitUntil: "domcontentloaded" });
        const elems = yield page.$x('//*[@id="productExtra"]/dl/dt/a');
        const jsHandle = yield elems[0].getProperty("href");
        const thumbnailUrl = yield (jsHandle === null || jsHandle === void 0 ? void 0 : jsHandle.jsonValue());
        return thumbnailUrl;
    });
    const url = "https://books.rakuten.co.jp/event/book/literature/hontai/";
    const browser = yield puppeteer_1.default.launch(options);
    const page = yield browser.newPage();
    for (let i = 0; i < 3; i++) {
        yield page.goto(url, { waitUntil: "domcontentloaded" });
        const noteElems = yield page.$x("//div[contains(@class, 'note')]");
        const bookDetailPageElems = yield page.$x("//div[contains(@class, 'image')]/a");
        const innerText = yield noteElems[i].getProperty("innerText");
        const text = yield (innerText === null || innerText === void 0 ? void 0 : innerText.jsonValue());
        const title = text === null || text === void 0 ? void 0 : text.split(/\r\n|\n/)[0];
        const author = text === null || text === void 0 ? void 0 : text.split(/\r\n|\n/)[1];
        const href = yield bookDetailPageElems[i].getProperty("href");
        const bookUrl = yield (href === null || href === void 0 ? void 0 : href.jsonValue());
        if (!bookUrl)
            continue;
        const thumbnail = yield fetchBookThumbnail(bookUrl);
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
    fs_1.default.writeFile("books.json", JSON.stringify(books), (err) => {
        if (err)
            throw err;
        console.log('正常に書き込みが完了しました');
    });
    yield browser.close();
}))();

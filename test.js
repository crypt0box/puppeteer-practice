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
const options = {
    headless: false,
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://books.rakuten.co.jp/event/book/literature/hontai/';
    const browser = yield puppeteer_1.default.launch(options);
    const page = yield browser.newPage();
    yield page.goto(url, { waitUntil: "domcontentloaded" });
    const elems = yield page.$x('//*[@id="bodyClump"]/div[2]/div[9]/ul[2]/li[3]/div[1]/a');
    console.log("elems", JSON.stringify(elems[0]));
    yield browser.close();
}))();

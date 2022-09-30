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
const https_1 = __importDefault(require("https"));
const cheerio_1 = __importDefault(require("cheerio"));
const getHtml = (hostname, path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        https_1.default
            .get({
            hostname,
            path,
            method: "GET",
        }, (res) => {
            let html = "";
            res.on("data", function (chunk) {
                html += chunk;
            });
            res.on("end", function () {
                resolve(html);
            });
        })
            .on("error", (error) => {
            console.error(error);
            reject(error);
        });
    });
});
getHtml("asura.gg", "/")
    .then((html) => {
    const $ = cheerio_1.default.load(html);
    const series = $(".utao.styletwo > .uta > .luf > a").toArray().map((e) => $(e).attr('title'));
    const chapters = $(".utao.styletwo > .uta > .luf > ul ").toArray().map((e) => {
        return $(e).children("li").first().children("a").text();
    });
    console.log(series.length, chapters.length);
    console.log('what tf is i');
})
    .catch((error) => console.log(error));

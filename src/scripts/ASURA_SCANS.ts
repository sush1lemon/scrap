import cheerio from "cheerio";
import useGetHtml from "../helper/useGetHtml";

const HOST = "asura.gg";
const PATH = "/"
const getHtml = useGetHtml

export default async function () {
    const html = await getHtml(HOST, PATH).catch((error) => console.log(error));

    let data: { name: string | undefined; chapter: string; }[] = [];
    if (html) {
        const $ = cheerio.load(html);
        const series = $(".utao.styletwo > .uta > .luf > a").toArray().map((e) => $(e).attr('title'))
        const chapters = $(".utao.styletwo > .uta > .luf > ul ").toArray().map((e) => {
            return $(e).children("li").first().children("a").text().split(" ")[1]
        })

        data = series.map((v, i) => {
            return { name : v, chapter: chapters[i] };
        })
        console.log('here', data)
    }
    return data;
}
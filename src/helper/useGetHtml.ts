import https from "https";

export default function (hostname: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https
            .get(
                {
                    hostname,
                    path,
                    method: "GET",
                },
                (res) => {
                    let html = "";
                    res.on("data", function (chunk) {
                        html += chunk;
                    });
                    res.on("end", function () {
                        resolve(html);
                    });
                }
            )
            .on("error", (error) => {
                console.error(error);
                reject(error);
            });
    });
}

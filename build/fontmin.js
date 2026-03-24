import fs from "fs";
import path from "path";
import Fontmin from "fontmin";

function getFiles(dir) {
    const results = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results.push(...getFiles(filePath));
        } else {
            results.push(filePath);
        }
    }

    return results;
}

function scanDirectory(dir) {
    let set = new Set();
    const files = getFiles(dir);

    for (const file of files) {
        const ignoredExtensions = [
            ".ttf",
            ".otf",
            ".woff",
            ".woff2",
            ".eot",
            ".png",
            ".jpg",
            ".jpeg",
            ".webp",
            ".gif",
            ".ico",
            ".pdf",
        ];

        if (ignoredExtensions.some((ext) => file.endsWith(ext))) continue;

        try {
            const content = fs.readFileSync(file, "utf8");
            const currentSet = new Set(content);
            set = new Set([...set, ...currentSet]);
        } catch {
            // 跳过二进制等不可读文件
        }
    }

    return set;
}

function subsetFont(src, text) {
    return new Promise((resolve, reject) => {
        const fontmin = new Fontmin()
            .src(src)
            .use(
                Fontmin.glyph({
                    text,
                    hinting: false,
                })
            )
            .use(Fontmin.ttf2woff2())
            .dest("public/fonts/subset");

        fontmin.run((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

async function main() {
    const baseChars =
        "首页文章标签关于作者评论发布于切换主题，。！？：“”‘’（）《》【】、—…·-_/\\'\"()[]{}<>:;.!? ";
    const scanned = Array.from(scanDirectory("src")).join("");
    const chars = Array.from(new Set((scanned + baseChars).split(""))).join("");

    await Promise.all([
        subsetFont("public/fonts/MapleMono-CN-Regular.ttf", chars),
        subsetFont("public/fonts/MapleMono-CN-Bold.ttf", chars),
        subsetFont("public/fonts/MapleMono-CN-Italic.ttf", chars),
    ]);

    console.log(`中文子集字体生成完成，共收集 ${chars.length} 个字符`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BangList_1 = require("./BangList");
const main = (input_bang = "", keyword = "") => {
    const bang = new BangList_1.BangList(input_bang, keyword);
    const need_update = process.argv.findIndex(arg => arg.startsWith("--update"));
    if (need_update) {
        bang.update();
    }
    bang.set_data();
    // import("open").then((open) => {
    //     open( bang.url, { wait: true });; // true
    // });
};
const get_keywords = (args) => {
    const bang = args[0];
    const keywords = args.slice(1);
    const flags = keywords.findIndex(s => /^--/.test(s));
    const new_keywords = args.slice(1, flags);
    return { bang, keywords: new_keywords.join(" ") };
};
const the = get_keywords(process.argv.slice(2));
main(the.bang, the.keywords);

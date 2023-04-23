import { BangList } from "./BangList";
const main = (input_bang = "", keyword = "") => {
    const bang = new BangList(input_bang, keyword);
    const need_update = process.argv.findIndex(arg => arg.startsWith("--update"));
    if (need_update) {
        bang.update();
    }
    bang.set_data();
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

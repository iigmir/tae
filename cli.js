import tae from "./index.js";

/**
 * Get the keyword.
 * @param {String[]} args 
 * @returns 
 */
const get_keywords = (args =[]) => {
    const bang = args[0];
    const keywords = args.slice(1);
    const flags = keywords.findIndex( s => /^--/.test(s) );
    const new_keywords = flags > -1 ? args.slice( 1, flags ) : args.slice(1);
    return { bang, keywords: new_keywords.join(" ") };
};

/**
 * The main script.
 * @param {String} input_bang 
 * @param {String} keyword 
 */
const main = (input_bang = "", keyword = "") => {
    const need_update = process.argv.findIndex( arg => arg.startsWith("--update") ) > -1;
    tae( input_bang, keyword, need_update ).then( (url) => {
        console.log(url);
    });
};

const the = get_keywords( process.argv.slice(2) );
main( the.bang, the.keywords );

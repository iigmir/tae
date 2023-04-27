import { BangList } from "./lib/BangList.js";

/**
 * The main script.
 * @param {String} input_bang 
 * @param {String} keyword 
 */
const main = (input_bang = "", keyword = "", force_update = false) => {
    return new Promise( (resolve, reject) => {
        const bang = new BangList(input_bang, keyword);
        const get_url = () => {
            try {
                resolve(bang.url);
            } catch (error) {
                reject(error);
            }
        };
        if( force_update ) {
            bang.update().then( get_url );
        } else {
            bang.main().then( get_url );
        }
    });
};

export default main;

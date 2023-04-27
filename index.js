import { BangList } from "./lib/BangList.js";

/**
 * The main script.
 * @param {*} input_bang The Bang.
 * @param {*} keyword The keyword you want to input.
 * @param {*} force_update Force tae update bang
 * @returns The BangList should returns URL.
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
            bang.update().then( get_url ).catch( up => { console.error( up ); throw up } );
        } else {
            bang.main().then( get_url ).catch( up => { console.error( up ); throw up } );
        }
    });
};

export default main;

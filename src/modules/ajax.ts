export interface BangItemInterface {
    /**
     * Category
     */
    c: string,
    /**
     * Domain
     */
    d: string,
    /**
     * Resource ID?
     */
    r: number,
    /**
     * Standard Name?
     */
    s: string,
    /**
     * ?
     */
    sc: string,
    /**
     * Bang
     */
    t: string,
    /**
     * URL
     */
    u: string,
}

export const get_list = () => {
    const source_url = "https://duckduckgo.com/bang.js";
    return new Promise( (resolve, reject) => {
        fetch( source_url ).then( r => r.json() ).then( r => resolve(JSON.stringify(r)) ).catch( r => reject(r) );
    });
};
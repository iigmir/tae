export const get_list = () => {
    const source_url = "https://duckduckgo.com/bang.js";
    return new Promise( (resolve, reject) => {
        fetch( source_url ).then( r => r.json() ).then( r => resolve(JSON.stringify(r)) ).catch( r => reject(r) );
    });
};
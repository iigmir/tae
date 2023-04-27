/**
 * Get JSON format content.
 * @param {String} c 
 * @returns 
 */
export const get_json = (c = "") => {
    if( typeof(c) === "object" ) {
        return c;
    } else {
        try {
            return get_json( JSON.parse(c) );
        } catch (error) {
            console.error( error );
            return {};
        }
    }
};
import { create_file, read_file } from "./modules/fs.js";
import { get_list } from "./modules/ajax.js";
import { get_json } from "./modules/utils.js";

export class BangList {
    list = []
    force_update = false
    constructor(force_update = false) {
        this.force_update = force_update;
    }
    get result() {
        if( this.list.length > 0 ) {
            return this.list;
        }
        throw new Error("The list is empty!");
    }
    /**
     * The method.
     * @returns Now you can get bangs.
     */
    main() {
        if( this == undefined ) {
            throw new TypeError("This is not fine: main");
        }
        return new Promise( (resolve, reject) => {
            /**
             * @param {String} c JSON format text
             */
            const from_file = (c) => {
                this.list = get_json( c );
                resolve( this.result );
            };
            /**
             * From AJAX request
             */
            const from_request = () => {
                get_list().then( (c) => {
                    this.list = JSON.parse( c );
                    create_file( c );
                    resolve( this.result );
                }).catch( c => reject(c) );
            }
            if( this.force_update ) {
                console.log("Force request mode used");
                from_request();
                return;
            }
            // From file
            read_file().then( from_file ).catch( from_request );
        });
    }
}

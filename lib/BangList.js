import { create_file, read_file } from "./modules/fs.js";
import { get_list } from "./modules/ajax.js";

export class BangDataList {
    list = []
    get result() {
        if( this.list.length > 0 ) {
            return this.list;
        }
        throw new Error("The list iis empty!");
    }
    /**
     * The method.
     * @returns Now you can get bangs.
     */
    main(force_update = false) {
        if( this == undefined ) {
            throw new TypeError("This is not fine: main");
        }
        return new Promise( (resolve, reject) => {
            /**
             * @param {String} c JSON format text
             */
            const from_file = (c) => {
                const get_json = (c) => {
                    if( typeof(c) === "object" ) {
                        return c;
                    } else {
                        return get_json( JSON.parse(c) );
                    }
                };
                this.list = get_json( c );
                console.log( this.list[2] );
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
            if( force_update ) {
                console.log("Force request used");
                from_request();
                return;
            }
            // From file
            read_file().then( from_file ).catch( from_request );
        });
    }
}

export class BangList {
    bang = ""
    keyword = ""
    list = []
    /**
     * Init bang.
     * @param {*} bang The Bang.
     * @param {*} keyword The keyword you want to input.
     */
    constructor(bang = "!bang", keyword = "") {
        this.init( bang, keyword );
        if( this.is_bang === false ) {
            throw Error("Not a vaild bang");
        }
    }
    // Getters
    get is_bang() {
        return /^!/g.test(this.bang);
    }
    /**
     * The Bang item.
     */
    get current_item() {
        const find_bang = its => its.t === this.bang.slice( 1 );
        const result = this.list.filter( find_bang );
        if( result.length > 0 ) {
            return result[0];
        }
        console.error( this.list );
        throw Error("No bangs here");
    }
    /**
     * The URL.
     */
    get url() {
        const item = this.current_item;
        const keyword = this.keyword;
        const query = "{{{s}}}";
        return item.u.replace( query, keyword );
    }
    // Actions
    init(bang = "", keyword = "") {
        this.bang = bang;
        this.keyword = keyword;
    }
    /**
     * The method.
     * @returns Now you can get bangs.
     */
    main(force_update = false) {
        if( this == undefined ) {
            throw new TypeError("This is not fine: main");
        }
        // const bang = this;
        return new Promise( (resolve, reject) => {
            const list_object = new BangDataList();
            list_object.main(force_update).then( (list) => {
                this.list = list;
                resolve( this.url );
            }).catch( e => reject(e) );
        });
    }
}

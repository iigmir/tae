import { create_file, read_file } from "./modules/fs.js";
import { get_list } from "./modules/ajax.js";

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
    parse_json(content) {
        try {
            this.list = JSON.parse( content );
        } catch (error) {
            console.error(error);
            this.list = [];
        } finally {
            return this.list;
        }
    }
    // AJAXes
    update() {
        if( this == undefined ) {
            throw new TypeError("This is not fine: update");
        }
        const parse_json = this.parse_json;
        return new Promise( (resolve, reject) => {
            get_list().then( (c) => {
                parse_json(c);
                resolve(c);
            }).catch( c => reject(c) );
        })
    }
    /**
     * The method.
     * @returns Now you can get bangs.
     */
    main() {
        if( this == undefined ) {
            throw new TypeError("This is not fine: main");
        }
        const bang = this;
        return new Promise( (resolve, reject) => {
            const do_update = () => {
                const updated_action = (c) => {
                    create_file(c);
                    resolve(c);
                };
                bang.update().then( updated_action ).catch( (e) => reject(e) );
            };
            read_file().then( (c) => {
                this.parse_json(c);
                resolve(c);
            }).catch( () => { do_update(); });
        });
    }
}

export function createBangList(bang = "!bang", keyword = "") {
    return new BangList();
}

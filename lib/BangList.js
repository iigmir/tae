import { create_file, read_file } from "./modules/fs.js";
import { get_list } from "./modules/ajax.js";

export class BangList {
    bang = ""
    keyword = ""
    list = []
    index = 0
    constructor(bang = "", keyword = "") {
        const is_bang = /^!/g.test(bang);
        if( is_bang === false ) {
            throw Error("Not a vaild bang");
        }
        this.init( bang, keyword );
    }
    // Getters
    get current_item() {
        return this.list[this.index];
    }
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
            this.list = JSON.parse( String(content) );
        } catch (error) {
            console.error(error);
            this.list = [];
        }
    }
    // AJAXes
    get_list() {
        read_file()
            .then( (c) => this.parse_json(c) )
            .catch( () => this.update() );
    }
    update() {
        return new Promise( (resolve, reject) => {
            get_list().then( (c) => {
                create_file(String(c));
                this.parse_json(c);
                resolve(c);
            }).catch( c => reject(c) );
        })
    }
    main() {
        return new Promise( (resolve, reject) => {
            read_file().then( (c) => {
                this.parse_json(c);
                resolve();
            }).catch( () => {
                this.update()
                    .then( () => resolve() )
                    .catch( () => reject() );
            });
        });
    }
}

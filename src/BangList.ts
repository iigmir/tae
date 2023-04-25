import { create_file, read_file } from "./modules/fs";
import { get_list } from "./modules/ajax";
// Type
import type { BangItemInterface } from "./modules/ajax";

export class BangList {
    bang = ""
    keyword = ""
    list: BangItemInterface[] = []
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
        const item: BangItemInterface = this.current_item;
        const keyword = this.keyword;
        const query = "{{{s}}}";
        return item.u.replace( query, keyword );
    }
    // Actions
    init(bang = "", keyword = "") {
        this.bang = bang;
        this.keyword = keyword;
    }
    parse_json(content: unknown) {
        try {
            this.list = JSON.parse( String(content) );
        } catch (error) {
            console.error(error);
            this.list = [];
        }
    }
    set_data() {
        const keyword = this.bang.slice(1);
        const id = this.list.findIndex( its => its.t === keyword );
        if( id < 0 ) {
            const action = () => {
                const new_id = this.list.findIndex( its => its.t === keyword );
                if( new_id < 0 ) {
                    throw new Error("Not found");
                } else {
                    this.index = new_id;
                }
            };
            this.update().then( action );
            return;
        } else {
            this.index = id;
            return;
        }
    }
    // AJAXes
    get_list() {
        read_file().then( (c) => this.parse_json(c) ).catch( () => {
            this.update();
        });
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
}

import { create_file, read_file } from "./modules/fs";
import { get_list } from "./modules/ajax";
import type { BangItemInterface } from "./modules/ajax";

export class BangList {
    bang = ""
    keyword = ""
    list: BangItemInterface[] = []
    index = 0
    get current_item() {
        return this.list[this.index];
    }
    constructor(bang = "", keyword = "") {
        const is_bang = /^!/g.test(bang);
        if( is_bang === false ) {
            throw Error("Not a vaild bang");
        }
        this.init( bang, keyword );
    }
    init(bang = "", keyword = "") {
        this.bang = bang;
        this.keyword = keyword;
    }
    get_list() {
        read_file().then( (c) => this.parse_json(c) ).catch( () => {
            this.update();
        });
    }
    parse_json(content: unknown) {
        try {
            this.list = JSON.parse( String(content) );
        } catch (error) {
            console.error(error);
            this.list = [];
        }
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
    get url() {
        const item: BangItemInterface = this.current_item;
        const keyword = this.keyword;
        const query = "{{{s}}}";
        return item.u.replace( query, keyword );
    }
}

import { BangList } from "./BangList.js";

export class BangData {
    bang = ""
    keyword = ""
    list = []
    /**
     * Init bang.
     * @param {*} bang The Bang.
     * @param {*} keyword The keyword you want to input.
     */
    constructor(bang = "!bang", keyword = "") {
        this.bang = bang;
        this.keyword = keyword;
        if( this.is_bang === false ) {
            throw Error("Not a vaild bang");
        }
    }
    /**
     * Is `this.bang` a bang?
     */
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
    /**
     * The method.
     * @returns Now you can get bangs.
     */
    main(force_update = false) {
        if( this == undefined ) {
            throw new TypeError("This is not fine: main");
        }
        return new Promise( (resolve, reject) => {
            const list_object = new BangList();
            list_object.main(force_update).then( (list) => {
                this.list = list;
                resolve( this.url );
            }).catch( e => reject(e) );
        });
    }
}

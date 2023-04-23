"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BangList = void 0;
const fs_1 = require("./modules/fs");
const ajax_1 = require("./modules/ajax");
class BangList {
    get current_item() {
        return this.list[this.index];
    }
    constructor(bang = "", keyword = "") {
        this.bang = "";
        this.keyword = "";
        this.list = [];
        this.index = 0;
        const is_bang = /^!/g.test(bang);
        if (is_bang === false) {
            throw Error("Not a vaild bang");
        }
        this.init(bang, keyword);
    }
    init(bang = "", keyword = "") {
        this.bang = bang;
        this.keyword = keyword;
    }
    get_list() {
        (0, fs_1.read_file)().then((c) => this.parse_json(c)).catch(() => {
            this.update();
        });
    }
    parse_json(content) {
        try {
            this.list = JSON.parse(String(content));
        }
        catch (error) {
            console.error(error);
            this.list = [];
        }
    }
    update() {
        return new Promise((resolve, reject) => {
            (0, ajax_1.get_list)().then((c) => {
                (0, fs_1.create_file)(String(c));
                this.parse_json(c);
                resolve(c);
            }).catch(c => reject(c));
        });
    }
    set_index(input) {
        this.index = input;
    }
    set_data() {
        const keyword = this.bang.slice(1);
        const id = this.list.findIndex(its => its.t === keyword);
        const go = (id = this.index) => {
            this.index = id;
            this.jump(this.current_item, this.keyword);
        };
        if (id < 0) {
            const action = () => {
                const new_id = this.list.findIndex(its => its.t === keyword);
                if (new_id < 0) {
                    throw new Error("Not found");
                }
                else {
                    go(new_id);
                }
            };
            this.update().then(action);
            return;
        }
        else {
            go(id);
            return;
        }
    }
    jump(item, keyword = this.keyword) {
        const query = "{{{s}}}";
        console.log(item.u.replace(query, keyword));
    }
}
exports.BangList = BangList;

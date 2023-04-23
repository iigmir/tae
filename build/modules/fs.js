"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_file = exports.create_file = void 0;
const fs_1 = require("fs");
const name = "./build/bang.json";
const create_file = (content = "") => {
    /**
     * ha ha
     * @see https://stackoverflow.com/a/549611/7162445
     * @param up Something is really wrong
     */
    const error_handling = (up) => {
        if (up)
            throw up;
    };
    (0, fs_1.writeFile)(name, JSON.stringify(content), error_handling);
};
exports.create_file = create_file;
const read_file = () => {
    return new Promise((resolve, reject) => {
        (0, fs_1.readFile)(name, (up, content) => {
            if (up) {
                reject(up);
            }
            resolve(JSON.stringify(content));
        });
    });
};
exports.read_file = read_file;

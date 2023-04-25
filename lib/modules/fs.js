import { readFile, writeFile } from "fs";

const name = "./build/bang.json";

export const create_file = (content = "") => {
    /**
     * ha ha
     * @see https://stackoverflow.com/a/549611/7162445
     * @param up Something is really wrong
     */
    const error_handling = (up = null) => {
        if (up) throw up;
    };
    writeFile(name, JSON.stringify(content), error_handling);
};

export const read_file = () => {
    return new Promise( (resolve, reject) => {
        readFile(name, (up, content) => {
            if( up ) {
                reject(up);
            }
            resolve( JSON.stringify(content) );
        })
    });
};

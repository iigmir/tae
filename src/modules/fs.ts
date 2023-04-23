import { readFile, writeFile } from "fs";

export const create_file = (content = "") => {
    /**
     * ha ha
     * @see https://stackoverflow.com/a/549611/7162445
     * @param up Something is really wrong
     */
    const error_handling = (up: NodeJS.ErrnoException | null): void => {
        if (up) throw up;
    };
    const name = "./bang.json";
    writeFile(name, JSON.stringify(content), error_handling);
};

export const read_file = () => {
    const name = "./bang.json";    
    return new Promise( (resolve, reject) => {
        readFile(name, (up, content) => {
            if( up ) {
                reject(up);
            }
            resolve( JSON.stringify(content) );
        })
    });
};

import tae from "./index.js";

tae("!g", "Hello World", true).then( (url) => {
    console.log( url );
    console.assert( /google/g.test( url ) );
});

const {readFileSync, promises: fsPromises} = require('fs');


let a = readFileSync('TOKEN.json', 'utf-8');
a = JSON.parse(a.toString());
console.log(a.token);
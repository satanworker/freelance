var fs = require('fs');
fs.readFile('./hs.json', 'utf-8', function(err, data) {
    if(err) throw err;
    //console.log(data);
});
fs.writeFile('./hs.json', '{"hui": "hui"}', '', function(err, data) {
    if(err) throw err;
    //console.log(2)
});
fs.writeFile('./hs.json', '{"zalupa": "zss"}', '', function(err, data) {
    if(err) throw err;
    //console.log(3)
});

var module = require('./mymodule.js');
console.log(module('sdsd'));
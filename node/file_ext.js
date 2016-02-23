/**
 * Created by dmitry on 21.02.16.
 */
var fs = require('fs');
var path = require('path');
module.exports = function (directiory) {
    fs.readdir(directiory,  function(err,list) {
        if(err) throw err;
        list.forEach( function(element) {
            if(path.extname(element) == '.' + process.argv[3]) {
                console.log(element);
            }
        });

    });
}
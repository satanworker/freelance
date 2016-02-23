var fs = require('fs');
var buf = fs.readFile(process.argv[2], 'utf-8' , function (err, data) {
    if(err) {
        throw  err;
    }
    else {
        console.log(data.split('\n').length - 1);
    }
});
//buf = buf.toString().split('\n').length - 1;
//console.log(buf);


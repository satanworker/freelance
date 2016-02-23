/**
 * Created by dmitry on 21.02.16.
 */
var http = require('http');
http.get(process.argv[2], function(response) {
    response.setEncoding('utf-8');
   response.on('data', function (data) {
       console.log(data);
   });
});
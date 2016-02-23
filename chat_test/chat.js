var clients = [];
exports.subscribe = function(req, res) {
    console.log('subscibre');
    clients.push(res);
};
exports.publish = function(message) {
    console.log('PUBLISHH');
    clients.forEach(function (res){
        res.end(message);
    });
    clients = [];
};

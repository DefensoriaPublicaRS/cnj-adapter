var soap = require('soap');
var express = require('express');
var router = express.Router();

var wsdl = 'sgt_ws.wsdl';

soap.createClient(wsdl, function(err, client) {

    router.get('/getArrayDetalhesItemPublicoWS', function(req,res) {
        var args = req.query;//{seqItem: 1385,tipoItem:'C'};
        client.getArrayDetalhesItemPublicoWS(args, function(err, result) {
            var items = {};
            if (result.return && result.return.item) {
                    result.return.item.forEach(item => {
                    items[item.key] = item.value;
                });
            }
            res.json(items);
        });
    });
});

module.exports = router;
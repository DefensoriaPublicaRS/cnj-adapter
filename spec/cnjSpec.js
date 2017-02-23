var soap = require('soap');

describe('cnj', function() {
    it ("deve retornar os dados do cnj ", function(done) {
        spyOn(soap, 'createClient').and.callFake(function(wsdl, callback) {
            var client = {
                getArrayDetalhesItemPublicoWS : function(args, callback) {
                    var result = {
                        return:{
                           item:[{key:'chave', value:'valor'}]
                        }
                    };
                    var error = null;
                    callback(error,result);
                }
            };
            callback(null,client);

         });
        var router = require('../cnj');
        var req = {query:{}};
        var res = {json: function(val){
            expect(val).toEqual({chave:'valor'});
            done();
        } };
        router.stack[0].route.stack[0].handle(req,res);
    });
});
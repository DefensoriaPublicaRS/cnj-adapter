describe("configuration", function() {

    var config = require('../configuration');


    it ("deve retornar um objeto de configuracao padrao", function() {
        var configuration = config.get();

        expect(configuration).not.toBeFalsy();
        expect(configuration.endpoint).not.toBeFalsy();
        expect(configuration.profiles).not.toBeFalsy();
        expect(configuration.application).not.toBeFalsy();
        expect(configuration.serverPort).not.toBeFalsy();
    });

    it ("deve utilizar o profile e server port da linha de comando", function() {
        process.env.PROFILES = 'banana,morango';
        process.env.SERVER_PORT = '123456';
        var configuration = config.get();
        expect(configuration.profiles).toEqual(['banana', 'morango']);
        expect(configuration.serverPort).toEqual('123456');
    });

    it ("deve utilizar o profile e server port da linha de comando", function() {
        process.argv.push('--server.port=654987');
        process.argv.push('--profiles=laranja,maca');
        var configuration = config.get();
        expect(configuration.profiles).toEqual(['laranja', 'maca']);
        expect(configuration.serverPort).toEqual(654987);
    });

});
var instanceInformation = require('../instanceInformation');

describe('instanceInformation', function() {
    it ('deve retornar as informacoes da instancia para serem passadas ao servidor eureka sem publicIp', function() {

        var instance = instanceInformation(
            {
                application:'applicationName',
                serverPort:12345
            }
        );
        expect(instance.app).toBe('applicationName');
        expect(instance.vipAddress).toBe('applicationName');
        expect(instance.hostName).not.toBeNull();
        expect(instance.ip).not.toBeNull();
        expect(instance.status).toBe('UP');
        expect(instance.port.$).toBe(12345);
        expect(instance.port['@enabled']).toBe(true);
    });

    it ('deve retornar o publicIp', function() {
        var instance = instanceInformation(
            {
                publicIp:'123.45.67.89'
            }
        );
        expect(instance.hostName).toBe('123.45.67.89');
        expect(instance.ipAddr).toBe('123.45.67.89');
        expect(instance.vipAddress).not.toBe('123.45.67.89');
    });
});
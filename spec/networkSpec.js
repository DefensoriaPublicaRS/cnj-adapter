var network = require('../network');

describe("network", function() {
    it('deve retornar ips', function() {
        var ips = network.getIpv4s();
        expect(ips.length).toBeGreaterThan(0);
    });
});
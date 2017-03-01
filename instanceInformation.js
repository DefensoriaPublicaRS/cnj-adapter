var network = require('./network');

module.exports = function(bootstrap) {
    var  ip = bootstrap.publicIp || network.getIpv4s()[0];
    return {
        app: bootstrap.application,
        port: {
            '$': bootstrap.serverPort,
            '@enabled': true,
        },
        hostName: ip,
        statusPageUrl: 'http://'+ip+':'+bootstrap.serverPort+'/info',
        ipAddr: ip,
        dataCenterInfo: {
            '@class': "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: 'MyOwn',
        },
        vipAddress: bootstrap.application,
        status:"UP"
    };
};
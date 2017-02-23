
const client = require("cloud-config-client");
const Eureka = require('eureka-js-client').Eureka;
var express = require('express');
var router = express.Router();

var network = require('./network');

var springCloud = {
    init: function(bootstrap){
        console.log("Loading configuration for '" + bootstrap.application + "' from: " + bootstrap.endpoint);
        console.log("Using profiles: " + bootstrap.profiles);

        client.load(bootstrap)
            .then((config) => {
                console.log("Found configuration:");
                config.forEach((key, value) => console.log(key + ": " + value));
                var loadedConfiguration = JSON.parse(config.toString());
                loadedConfiguration.bootstrap = bootstrap;

                router.get('/env', function(req,res){
                    res.json(loadedConfiguration);
                });

                var defaultZone = config.get('eureka.client.serviceUrl.defaultZone');

                var hostname = network.hostname();
                var  ip = network.getIpv4s()[0];

                console.log("registering in eureka: " + defaultZone);
                var instanceInformation = {
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

                const client = new Eureka({
                  instance: instanceInformation,
                  eureka: {
                    serviceUrls:{
                        default: [defaultZone+'apps']
                    }

                  }
                });

                console.log("starting eureka client");
                client.start();

                process.on('exit', function() {
                    console.log("Unregistering from eureka");
                    client.stop();
                });

            });

        router.get('/info', function(req,res){
            res.send('cnj-adapter');
        });
        return router;
    }
};

module.exports = springCloud;
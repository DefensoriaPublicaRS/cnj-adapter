var minimist = require('minimist');

module.exports = {
    get: function(){
        var argv = minimist(process.argv.slice(2));
        var profiles = (argv.profiles || process.env.PROFILES || 'development').split(',');
        var serverPort = argv.server && argv.server.port || process.env.SERVER_PORT || 8080;

        return {
            endpoint:'http://config.defensoria.defpub.local',
            application: "cnj-adapter",
            profiles:profiles,
            serverPort:serverPort,
        };
    }
};
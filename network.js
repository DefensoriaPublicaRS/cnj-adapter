var os = require('os');

var network = {
    getIpv4s: function(){
        var ifaces = os.networkInterfaces();

        var ips = [];

        Object.keys(ifaces).forEach(function (ifname) {
          var alias = 0;

          ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              return;
            }

            if (alias >= 1) {
              // this single interface has multiple ipv4 addresses
              //console.log(ifname + ':' + alias, iface.address);
              ips.push(iface.address);
              return iface.address;
            } else {
              // this interface has only one ipv4 adress
              //console.log(ifname, iface.address);
              ips.push(iface.address);
              return iface.address;
            }
            ++alias;
          });
        });
        return ips;
    },
    hostname:os.hostname
};
module.exports = network;
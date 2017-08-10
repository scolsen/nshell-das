const http = require('http');
const ui = require('../../../../lib/UI');

function hrequest(data, callback){
    let r = http.request(data, (res) => {
        res.setEncoding('utf8');
        let body = "";
        res.on('data', function(data){
            body += data;
        });
        res.on('end', function(){
            callback(body);
        });
    });
    r.on('error', function(err){
        ui.controller.messageAppend(err.ERROR);
    });
    r.end();
}

function logData (data){
    console.log(data);
}

let def = {
    name: "request",
    source: __dirname,
    validoptions: {
        protocol: false,
        host: false,
        hostname: false,
        family: false,
        port: false,
        localAddress: false,
        socketPath: false,
        method: false,
        path: true,
        headers: false,
        auth: false,
        agent: false,
        createConnection: false,
        timeout: false,
        callback: false
    },
    linkable: true,
    sync: true,
    prompt: false,
    errors: {
        errorName: {
            name: "",
            message: "",
            cause: "",
            resolution: ""
        }
    },
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        hrequest(opts, logData);
    },
    sub: function (opts) {
        console.log(opts);
        return hrequest(opts, opts.callback);
    }
};

exports.def = def;
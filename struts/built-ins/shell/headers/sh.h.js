const CP = require('child_process');
const os = require('os');
const ui = require('../../../../lib/UI');
const logger = require('../../../../lib/logger');

function checkPlatform(opts){
    if(os.platform() == "linux" || os.platform() == "darwin"){
        opts.shell = "/bin/" + opts.shell;
    } else {
        opts.shell = "cmd.exe"
    }
}

function runShell(opts){
    checkPlatform(opts);
    let shellprop = {
        shell: "/bin/bash"
    };
    if(opts.mode == "sync"){
        try {
            CP.execSync(opts.command, shellprop).toString();
        }
        catch (e) {
            ui.controller.messageAppend(e.stderr.toString());
        }
    } else {
        console.log(opts.command);
        CP.exec(opts.command, shellprop, function(error, stdout, stderr){
            if(error){
                console.log(error.toString());
                logger.logWrite(error.toString());
            }
            console.log(stdout);
            console.log(stderr);
            if(opts.callback){
                let payload = new bigshell.core.ShellInterface(error, stdout, stderr);
                opts.callback(payload);
            } else if (opts.con){
                opts.con();
            };
        });
    }
}

let def = {
    name: "sh",
    source: __dirname,
    validoptions: {
        shell: true,
        command: false,
        callback: false,
        con: false,
        mode: true
    },
    linkable: true,
    sync: true,
    prompt: false,
    errors: {
        errorName:{
            name: "",
            message: "",
            cause: "",
            resolution: ""
        }
    },
    help: bigshell.core.help.renderhelp,
    exitOnError: true,
    main: function (opts){
        runShell(opts);
    },
    sub: function(opts){
        runShell(opts);
    }
};

exports.def = def;